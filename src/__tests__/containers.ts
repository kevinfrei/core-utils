import {
  MakeMultiMap,
  MakePriorityQueue,
  MakeQueue,
  MakeStack,
} from '../index';

test('Basic MultiMap tests', () => {
  const mmap = MakeMultiMap<number, string>();
  expect(mmap).toBeDefined();
  expect(mmap.size()).toEqual(0);
  mmap.set(0, 'zero');
  expect(mmap.size()).toEqual(1);
  const item0 = mmap.get(0);
  expect(mmap.get(0)).toBeDefined();
  if (!item0) throw Error('failed');
  expect(item0.size).toEqual(1);
  mmap.set(0, 'zilch');
  expect(mmap.size()).toEqual(1);
  expect(item0.size).toEqual(2);
  mmap.add(1, ['one', 'uno', 'un']);
  expect(mmap.size()).toEqual(2);
  const item1 = mmap.get(1);
  expect(item1).toBeDefined();
  if (!item1) throw Error('failed');
  expect(item1.size).toEqual(3);
  for (const [key, values] of mmap) {
    const s = new Set(values);
    if (key === 0) {
      expect(s.size).toBe(2);
    } else if (key === 1) {
      expect(s.size).toBe(3);
    } else {
      expect(null).toBeTruthy();
    }
  }
});

test('Queue tests', () => {
  const q = MakeQueue(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);
  expect(q.size()).toEqual(10);
  expect(q.peek()).toEqual(1);
  expect(q.pop()).toEqual(1);
  expect(q.size()).toEqual(9);
  q.push(11);
  while (!q.empty()) {
    expect(q.peek()).toEqual(q.pop());
  }
  for (let i = 0; i < 10; i++) {
    q.push(i);
  }
  let j = 0;
  for (const v of q) {
    expect(v).toEqual(j++);
  }
});

test('Stack tests', () => {
  const s = MakeStack(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);
  expect(s.size()).toEqual(10);
  expect(s.peek()).toEqual(10);
  expect(s.pop()).toEqual(10);
  expect(s.size()).toEqual(9);
  let val = 9;
  while (!s.empty()) {
    const f = Math.floor(Math.random() * 1000);
    const cur = s.peek();
    s.push(f);
    expect(s.peek()).toEqual(f);
    expect(s.pop()).toEqual(f);
    expect(s.pop()).toEqual(val--);
  }
  for (let i = 0; i < 10; i++) {
    s.push(i);
  }
  let j = 9;
  for (const v of s) {
    expect(v).toEqual(j--);
  }
});

test('Priority Queue tests', () => {
  const pq = MakePriorityQueue<number>(0);
  let max = -1;
  // First, in order
  for (let i = 0; i < 100; i++) {
    pq.push(i, i);
  }
  while (!pq.empty()) {
    const val = pq.peek();
    expect(val).toBeDefined();
    if (val === undefined) throw 'oops';
    expect(val).toBeGreaterThan(max);
    expect(pq.pop()).toEqual(val);
    max = val;
  }
  max = -1;
  // Next, in reverse order
  for (let i = 100; i > 0; i--) {
    //const val = Math.floor(Math.random() * 1000) + 1;
    pq.push(i, i); //val, val);
  }
  while (!pq.empty()) {
    const val = pq.peek();
    expect(val).toBeDefined();
    if (val === undefined) throw 'oops';
    expect(val).toBeGreaterThan(max);
    expect(pq.pop()).toEqual(val);
    max = val;
  }
  max = -1;
  // Finally, mix it up
  for (let i = 0; i < 10000; i++) {
    const val = Math.floor(Math.random() * 100) + 1;
    pq.push(val, val);
  }
  expect(pq.size()).toEqual(10000);
  for (const val of pq) {
    expect(val).toBeGreaterThanOrEqual(max);
    max = val;
  }
  expect(pq.pop()).toBeUndefined();
});
