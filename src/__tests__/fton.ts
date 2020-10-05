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
  expect((newMap as any).a).toBeInstanceOf(Map);
  const next = FTON.stringify(newMap);
  expect(next).toEqual(mapString);
});
