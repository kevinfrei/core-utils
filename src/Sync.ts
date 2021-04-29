import { Waiter } from './definitions';
import * as Type from './types';

export function Sleep(milliseconds: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
}

// Only allow 1 rescan at a time
// Single thread execution makes this *super* easy :D
export function MakeSingleWaiter(timeout?: number): Waiter {
  let busy = false;
  let someoneWaiting = false;
  const timer = timeout ? timeout : 100;
  async function wait(): Promise<boolean> {
    // Hurray for simple non-atomic synchronization :)
    if (busy) {
      if (someoneWaiting) {
        return false;
      }
      someoneWaiting = true;
      while (busy) {
        await Sleep(timer);
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
 * @param  {()=>void} func
 * @param  {number} timeout
 */
export function DebouncedDelay(func: () => void, timeout: number): () => void {
  let debounceTimer: number | NodeJS.Timer | null = null;
  function ping() {
    if (debounceTimer !== null) {
      clearTimeout(debounceTimer as any);
    }
    debounceTimer = setTimeout(() => {
      debounceTimer = null;
      func();
    }, timeout);
  }
  return ping;
}

/**
 * This invokes func every `timeout` milliseconds in the future, so if you call
 * it before the timer has completed, it does nothing. Logically, it "buffers"
 * invocations, flushing the buffer every X ms.
 * @param  {()=>void} func
 * @param  {number} timeout
 */
export function DebouncedEvery(func: () => void, timeout: number): () => void {
  let debounceTimer: number | NodeJS.Timer | null = null;
  function ping() {
    if (debounceTimer !== null) {
      return;
    }
    debounceTimer = setTimeout(() => {
      debounceTimer = null;
      func();
    }, timeout);
  }
  return ping;
}
