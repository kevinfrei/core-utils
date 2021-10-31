import type { Container } from './public-defs';

export function MakeQueue<T>(...items: T[]): Container<T> {
  const q: T[] = [...items];
  function push(item: T) {
    q.push(item);
  }
  function pop(): T | undefined {
    return q.shift();
  }
  function size(): number {
    return q.length;
  }
  function empty(): boolean {
    return q.length === 0;
  }
  function peek(): T | undefined {
    if (!empty()) {
      return q[0];
    }
  }
  function* iterator(): Generator<T> {
    while (!empty()) yield pop()!;
  }
  return { push, pop, size, peek, empty, [Symbol.iterator]: iterator };
}

export function MakeStack<T>(...items: T[]): Container<T> {
  const s: T[] = [...items];
  function push(item: T) {
    s.push(item);
  }
  function pop(): T | undefined {
    return s.pop();
  }
  function size(): number {
    return s.length;
  }
  function empty(): boolean {
    return s.length === 0;
  }
  function peek(): T | undefined {
    if (!empty()) {
      return s[s.length - 1];
    }
  }
  function* iterator(): Generator<T> {
    while (!empty()) yield pop()!;
  }
  return { push, pop, size, peek, empty, [Symbol.iterator]: iterator };
}

type Elem<T> = { item: T; priority: number; innerPriority: number };
export function MakePriorityQueue<T>(defaultPriority?: number): Container<T> {
  // This is just a min-heap
  const heap: Elem<T>[] = [];
  let innerPri = -0x7ffffff;
  function isGt(a: number, b: number): boolean {
    const ha = heap[a];
    const hb = heap[b];
    return (
      (ha && hb && ha.priority > hb.priority) ||
      (ha &&
        hb &&
        ha.priority === hb.priority &&
        ha.innerPriority > hb.innerPriority)
    );
  }
  function isLt(a: number, b: number): boolean {
    const ha = heap[a];
    const hb = heap[b];
    return (
      hb === undefined ||
      ha.priority < hb.priority ||
      (ha.priority === hb.priority && ha.innerPriority < hb.innerPriority)
    );
  }

  function upPos(pos: number): number {
    return Math.floor((pos - 1) / 2);
  }
  // This is slightly tricky when they're equal
  function downPos(pos: number): number {
    const p1 = pos * 2 + 1;
    const p2 = pos * 2 + 2;
    return pos * 2 + (isLt(p1, p2) ? 1 : 2);
  }
  // Swap between two elements
  function swap(oPos: number, nPos: number): number {
    const tmp = heap[oPos];
    heap[oPos] = heap[nPos];
    heap[nPos] = tmp;
    return nPos;
  }
  // Is the element correctly heap'ed with the parent?
  function upOrdered(pos: number): boolean {
    return pos === 0 || isGt(pos, upPos(pos));
  }
  // Is the element correctly heap'ed with it's two children
  function downOrdered(pos: number): boolean {
    const l = pos * 2 + 1;
    const r = l + 1;
    return (
      (l >= heap.length || isLt(pos, l)) && (r >= heap.length || isLt(pos, r))
    );
  }
  function push(item: T, priority?: number) {
    priority =
      priority !== undefined
        ? priority
        : defaultPriority !== undefined
        ? defaultPriority
        : 1;
    // this *could* cause problems with innerPri if it loops around at 53 bits...
    heap.push({ item, priority, innerPriority: innerPri++ });
    // Now 'up-heap'
    for (
      let pos = heap.length - 1;
      !upOrdered(pos);
      pos = swap(pos, upPos(pos)) // eslint-disable-next-line no-empty
    ) {}
  }
  function pop(): T | undefined {
    if (empty()) {
      return;
    }
    const tail = heap.pop()!;
    if (empty()) {
      return tail.item;
    }
    const res = heap[0].item;
    if (!empty()) {
      heap[0] = tail;
      // now 'down-heap'
      // eslint-disable-next-line no-empty
      for (let pos = 0; !downOrdered(pos); pos = swap(pos, downPos(pos))) {}
    }
    return res;
  }
  function size(): number {
    return heap.length;
  }
  function empty(): boolean {
    return heap.length === 0;
  }
  function peek(): T | undefined {
    if (!empty() && heap[0] !== undefined) {
      return heap[0].item;
    }
  }
  function* iterator(): Generator<T> {
    while (!empty()) yield pop()!;
  }
  return { push, pop, size, peek, empty, [Symbol.iterator]: iterator };
}
