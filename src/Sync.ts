import { SyncFunc, Waiter } from './public-defs.js';
import { SeqNum } from './SeqNum.js';
import * as Type from './types.js';

export function Sleep(milliseconds: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
}

// Overall, I think I'd rather pass in a function to be invoked, rather than
// expect the caller gets the cleanup right

// This is a non-prioritized "maybe you'll eventually get the token" waiter
export function MakeWaiter(delay = 10): Waiter {
  let busy = false;
  async function wait(): Promise<boolean> {
    while (busy) {
      await Sleep(delay);
    }
    busy = true;
    return true;
  }
  function leave() {
    busy = false;
  }
  return { wait, leave };
}

// This is just a linear queue of waiters
export function MakeWaitingQueue(delay = 10): Waiter {
  const getNextID = SeqNum();
  const queue: string[] = [];
  let active = '';
  async function wait(): Promise<boolean> {
    const myID = getNextID();
    queue.push(myID);
    while (active !== '' && queue[0] !== myID) {
      await Sleep(delay);
    }
    active = myID;
    const theID = queue.shift();
    if (theID !== myID) {
      throw new Error("This situation shouldn't ever occur");
    }
    return true;
  }
  function leave() {
    active = '';
  }
  return { wait, leave };
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
  return { wait, leave };
}

export function OnlyOneActive(
  func: () => void | Promise<void>,
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
  func: () => void | Promise<void>,
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
  func: () => void | Promise<void>,
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
export async function MaybeWait<T>(func: () => Promise<T> | T): Promise<T> {
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
 * @param  {()=>void|Promise<void>} func
 * @param  {number} timeout
 */
export function DebouncedDelay(
  func: () => Promise<void> | void,
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
 * @param  {()=>void} func
 * @param  {number} timeout
 */
export function DebouncedEvery(
  func: () => Promise<void> | void,
  timeout: number,
): () => void {
  let debounceTimer: number | NodeJS.Timer | null = null;
  function ping() {
    if (debounceTimer !== null) {
      return;
    }
    debounceTimer = setTimeout(() => {
      debounceTimer = null;
      MaybeWait(func).catch(() => {
        /* */
      });
    }, timeout);
  }
  return ping;
}
