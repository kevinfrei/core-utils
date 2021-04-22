import { MakeMultiMap } from '../index';

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
});
