import { FTON, ObjUtil, Type } from '../index';

test('FTON sanity', () => {
  FTON.stringify([]);
});

test('FTON set roundtrip', () => {
  const set = [new Set<string>(['a', 'b'])];
  const setString = FTON.stringify(set);
  const newSet = FTON.parse(setString);
  expect(Type.isArray(newSet)).toBe(true);
  expect(((newSet as any) as Set<unknown>[])[0]).toBeInstanceOf(Set);
  const next = FTON.stringify(newSet);
  expect(next).toEqual(setString);
});

test('FTON map roundtrip', () => {
  const map = {
    a: new Map<string, string>([
      ['a', 'b'],
      ['c', 'd'],
    ]),
  };
  const mapString = FTON.stringify(map);
  const newMap = FTON.parse(mapString);
  expect(ObjUtil.has('a', newMap)).toBe(true);
  expect(Type.has(newMap, 'a')).toBe(true);
  expect((newMap as any).a).toBeInstanceOf(Map);
  const next = FTON.stringify(newMap);
  expect(next).toEqual(mapString);
  expect(FTON.valEqual(newMap, map)).toBe(true);
  map.a.set('e', 'f');
  expect(FTON.valEqual(newMap, map)).toBe(false);
});

test('FTON filtering', () => {
  expect(FTON.isFTON(new Date())).toBeFalsy();
  expect(FTON.isFTON(/abcd/)).toBe(false);
  expect(FTON.filter('a')).toBe('a');
  const otherObj = { a: 1, b: 2, c: /1.2/ };
  expect(FTON.filter(otherObj)).toEqual({ a: 1, b: 2, c: null });
  const buf = { b: Buffer.from('as;lkasdfkjadl;sf') };
  expect(FTON.filter(buf)).toEqual({ b: null });
});
