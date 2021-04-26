import {
  FreikTypeTag,
  FTON,
  FTONData,
  MakeMultiMap,
  MultiMap,
  ObjUtil,
  Pickle,
  RegisterForPickling,
  Type,
  UnsafelyUnpickle,
} from '../index';

const TestSymbol = Symbol.for('pickler.Test');
function MakeType() {
  return {
    value1: 'a',
    value2: /a/gi,
    [FreikTypeTag]: TestSymbol,
    toJSON: () => 'My Test Thingy',
  };
}

test('Vinegar', () => {
  RegisterForPickling<unknown>(TestSymbol, (data) => MakeType());
});

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

test('Pickling sanity', () => {
  expect(Pickle([])).toBeDefined();
});

test('Pickling set roundtrip', () => {
  const set = [new Set<string>(['a', 'b'])];
  const setString = Pickle(set);
  const newSet = UnsafelyUnpickle(setString);
  expect(Type.isArray(newSet)).toBe(true);
  expect(((newSet as any) as Set<unknown>[])[0]).toBeInstanceOf(Set);
  const next = Pickle(newSet);
  expect(next).toEqual(setString);
});

test('Pickling map roundtrip', () => {
  const map = {
    a: new Map<string, string>([
      ['a', 'b'],
      ['c', 'd'],
    ]),
  };
  const mapString = Pickle(map);
  const newMap = UnsafelyUnpickle(mapString);
  expect(ObjUtil.has('a', newMap)).toBe(true);
  expect(Type.has(newMap, 'a')).toBe(true);
  expect((newMap as any).a).toBeInstanceOf(Map);
  const next = Pickle(newMap);
  expect(next).toEqual(mapString);
  expect(FTON.valEqual(newMap as FTONData, map)).toBe(true);
  map.a.set('e', 'f');
  expect(FTON.valEqual(newMap as FTONData, map)).toBe(false);
});

test('MultiMap Pickling roundtrip', () => {
  const input = MakeMultiMap<string, string>([
    ['First2', ['a', 'b']],
    ['Next2', ['c', 'd']],
  ]);
  const mmstr = Pickle(input);
  const newmm = UnsafelyUnpickle(mmstr);
  expect(input.valueEqual(newmm as MultiMap<string, string>)).toBeTruthy();
});
