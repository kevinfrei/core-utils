import { MakeQueue } from './Containers.js';
import { Container, ReaderWriter, SyncFunc, Waiter } from './public-defs.js';
import { SeqNum } from './SeqNum.js';
import * as Type from './types.js';

type MaybePromise<T> = T | Promise<T>;
type MaybeAsyncFunc<T> = () => MaybePromise<T>;

export function Sleep(milliseconds: number): Promise<void> {
  return new Promise((resolve) =>
    setTimeout(resolve, Math.max(0, milliseconds)),
  );
}

// Overall, I think I'd rather pass in a function to be invoked, rather than
// expect the caller gets the cleanup right

// This is a non-prioritized "maybe you'll eventually get the token" waiter
export function MakeWaiter(delay = 10): Waiter {
  let busy = false;
  async function wait(): Promise<boolean> {
    while (!block()) {
      await Sleep(delay);
    }
    return true;
  }
  function leave() {
    busy = false;
  }
  function blocked() {
    return busy;
  }
  function block() {
    if (busy) {
      return false;
    }
    busy = true;
    return true;
  }
  return { wait, leave, blocked, block };
}

// This is just a linear queue of waiters
export function MakeWaitingQueue(delay = 10): Waiter {
  const getNextID = SeqNum();
  const queue: Container<string> = MakeQueue<string>();
  let active = '';
  async function wait(): Promise<boolean> {
    const myID = getNextID();
    queue.push(myID);
    while (active !== '' && queue.peek() !== myID) {
      await Sleep(delay);
    }
    active = myID;
    const theID = queue.pop();
    if (theID !== myID) {
      throw new Error("This situation shouldn't ever occur");
    }
    return true;
  }
  function leave() {
    active = '';
  }
  function blocked() {
    return active !== '';
  }
  function block() {
    if (blocked()) {
      return false;
    }
    active = getNextID();
    return true;
  }
  return { wait, leave, blocked, block };
}

// This will keep one caller "in the queue" and everyone else drops out
export function MakeSingleWaiter(delay = 10): Waiter {
  let busy = false;
  let someoneWaiting = false;
  async function wait(): Promise<boolean> {
    // Hurray for simple non-atomic synchronization :)
    if (busy) {
      if (someoneWaiting) {
        return false;
      }
      someoneWaiting = true;
      while (busy) {
        await Sleep(delay);
      }
    }
    busy = true;
    someoneWaiting = false;
    return true;
  }
  function leave() {
    busy = false;
  }
  function blocked() {
    return busy || someoneWaiting;
  }
  function block() {
    if (!blocked()) {
      busy = true;
      return true;
    }
    return false;
  }
  return { wait, leave, blocked, block };
}

type RWEntry = { id: string; count: number };
export function MakeReaderWriter(delay = 1): ReaderWriter {
  const getNextId = SeqNum();
  const getReadId = () => 'r' + getNextId();
  const getWriteId = () => 'w' + getNextId();
  const rwQueue: RWEntry[] = [];
  let activeCount = 0;
  let activeId = '';
  function isWriterActive() {
    return activeCount === -1;
  }
  function isQueueEmpty() {
    return rwQueue.length === 0;
  }
  function nextQueue() {
    if (activeCount !== 0) {
      throw Error('ReaderWriterLock count inconsistency');
    }
    if (isQueueEmpty()) {
      activeId = '';
    } else {
      const val = rwQueue.shift();
      if (val === undefined) {
        throw Error('ReaderWriter lock queue inconsistency');
      }
      ({ id: activeId, count: activeCount } = val);
    }
  }
  async function read(): Promise<void> {
    // Is there a queue or an active Writer?
    //  For a queue or an activeWriter,
    //    Check the tail:
    //      Writer, add to the queue
    //      Reader, increment the tail count
    //    then wait until we're up
    //  For an empty queue, nothing to do
    // add to the 'activeReaders' count and continue
    if (isWriterActive() || !isQueueEmpty()) {
      let myId: string;
      if (isQueueEmpty() || rwQueue[rwQueue.length - 1].count === -1) {
        // Writer!
        myId = getReadId();
        rwQueue.push({ id: myId, count: 1 });
      } else {
        // Reader at the end of the queue!
        const tail = rwQueue[rwQueue.length - 1];
        myId = tail.id;
        tail.count++;
      }
      do {
        await Sleep(delay);
      } while (activeId !== myId);
      // activeCount is set to all the active readers, so no incrementing is necessary
    } else {
      activeCount++;
    }
  }
  function leaveRead() {
    // Decrease the activeReaders count
    // If it's zero, slide the queue
    activeCount--;
    if (activeCount < 0) {
      throw Error('ReaderWriterLock read inconsistency');
    }
    if (activeCount === 0) {
      nextQueue();
    }
  }
  async function write(): Promise<void> {
    // Is there a queue?
    //  Yes: add to the queue and wait
    //  No: Are there active readers?
    //    Yes: add to the queue and wait
    //    No:  don't do anything
    // Now, set the active writer
    if (!isQueueEmpty() || activeCount !== 0) {
      const id = getWriteId();
      rwQueue.push({ id, count: -1 });
      do {
        await Sleep(delay);
      } while (activeId !== id);
    } else {
      activeCount = -1;
    }
  }
  function leaveWrite() {
    // Clear the active writer and slide the queue
    activeCount++;
    if (activeCount !== 0) {
      throw Error('ReaderWriterLock write inconsistency');
    }
    nextQueue();
  }
  return { read, leaveRead, write, leaveWrite };
}

export function OnlyOneActive(
  func: MaybeAsyncFunc<void>,
  delay = 10,
): SyncFunc<void> {
  const waiter = MakeWaiter(delay);
  async function invoke() {
    if (await waiter.wait()) {
      try {
        await MaybeWait(func);
      } finally {
        waiter.leave();
      }
    }
  }
  invoke.trigger = async () => {
    await MaybeWait(func);
  };
  return invoke;
}

export function OnlyOneActiveQueue(
  func: MaybeAsyncFunc<void>,
  delay = 10,
): SyncFunc<void> {
  const waiter = MakeWaitingQueue(delay);
  async function invoke() {
    if (await waiter.wait()) {
      try {
        await MaybeWait(func);
      } finally {
        waiter.leave();
      }
    }
  }
  invoke.trigger = async () => {
    await MaybeWait(func);
  };
  return invoke;
}

export function OnlyOneWaiting(
  func: MaybeAsyncFunc<void>,
  delay = 10,
): SyncFunc<boolean> {
  const waiter = MakeSingleWaiter(delay);
  async function invoke() {
    if (await waiter.wait()) {
      try {
        await MaybeWait(func);
      } finally {
        waiter.leave();
      }
      return true;
    } else {
      return false;
    }
  }
  invoke.trigger = async () => {
    await MaybeWait(func);
  };
  return invoke;
}

// If the result is a promise, await it, otherwise don't
export async function MaybeWait<T>(func: MaybeAsyncFunc<T>): Promise<T> {
  const res = func();
  if (Type.isPromise(res)) {
    return await res;
  } else {
    return res;
  }
}

/**
 * This invokes func no *sooner* than `timeout` milliseconds in the future, but
 * will restarts the timer every time the function is invoked, so if you call it
 * every timeout-1 milliseconds, it will never invoke the function
 * @param  {MaybeAsyncFunc<void>} func
 * @param  {number} timeout
 */
export function DebouncedDelay(
  func: MaybeAsyncFunc<void>,
  timeout: number,
): () => void {
  let debounceTimer: number | NodeJS.Timer | null = null;
  const doWork = OnlyOneActiveQueue(func);
  function ping() {
    if (debounceTimer !== null) {
      clearTimeout(debounceTimer as number);
    }
    debounceTimer = setTimeout(() => {
      debounceTimer = null;
      doWork().finally(() => '');
    }, timeout);
  }
  return ping;
}

/**
 * This invokes func every `timeout` milliseconds in the future, so if you call
 * it before the timer has completed, it does nothing. Logically, it "buffers"
 * invocations, flushing the buffer every X ms.
 *
 * WARNING: func must be re-entrant-safe!
 * @param  {MaybeAsyncFunc<void>} func
 * @param  {number} timeout
 */
export function DebouncedEvery(
  func: MaybeAsyncFunc<void>,
  timeout: number,
): () => void {
  let debounceTimer: number | NodeJS.Timer | null = null;
  function ping() {
    if (debounceTimer !== null) {
      return;
    }
    debounceTimer = setTimeout(() => {
      debounceTimer = null;
      MaybeWait(func).catch(() => {});
    }, timeout);
  }
  return ping;
}
