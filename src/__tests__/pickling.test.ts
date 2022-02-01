import {
  FreikTypeTag,
  MakeMultiMap,
  MultiMap,
  Operations,
  Pickle,
  RegisterForPickling,
  Type,
  UnsafelyUnpickle,
} from '../index';
import { Unpickle } from '../Pickle';

const TestSymbol = Symbol.for('pickler.Test');
const Test2Symbol = Symbol.for('pickler.Test2');
function MakeType() {
  return {
    value1: 'a',
    value2: /a/gi,
    [FreikTypeTag]: TestSymbol,
    toJSON: () => 'My Test Thingy',
  };
}
function MakeType2() {
  return {
    value1: 'a',
    value2: /a/gi,
    [FreikTypeTag]: Test2Symbol,
  };
}

beforeAll(() => {
  RegisterForPickling<unknown>(TestSymbol, (data) => MakeType());
  RegisterForPickling(
    Test2Symbol,
    (data) => MakeType2(),
    (data) => 'My Test2 Thingy',
  );
});

test('Pickling sanity', () => {
  expect(Pickle([])).toBeDefined();
});

test('Pickling set roundtrip', () => {
  const set = [new Set<string>(['a', 'b'])];
  const setString = Pickle(set);
  const newSet = UnsafelyUnpickle(setString);
  expect(Type.isArray(newSet)).toBe(true);
  expect((newSet as any as Set<unknown>[])[0]).toBeInstanceOf(Set);
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
  expect(Type.has(newMap, 'a')).toBe(true);
  expect((newMap as any).a).toBeInstanceOf(Map);
  const next = Pickle(newMap);
  expect(next).toEqual(mapString);
  expect(Operations.ValEqual(newMap, map)).toBe(true);
  map.a.set('e', 'f');
  expect(Operations.ValEqual(newMap, map)).toBe(false);
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

test('Other random pickling stuff', () => {
  const sp = Pickle({ value: TestSymbol });
  const rs = Unpickle(sp);
  const has = Type.hasType(rs, 'value', Type.isSymbol);
  expect(has).toBeTruthy();
  if (!has) throw Error('oops');
  expect(rs.value).toBe(TestSymbol);
  const obj = {
    regex: /a/i,
    date: new Date(),
    bi: BigInt('132341293874129387412'),
  };
  const other = Pickle(obj);
  const ro = Unpickle(other);
  expect(ro).toEqual(obj);
});

test('Custom pickling tests', () => {
  const t1 = MakeType();
  const t2 = MakeType2();
  const str = Pickle({ a: t1, b: t2 });
  const val = Unpickle(str);
  const str2 = Pickle(val);
  expect(str).toEqual(str2);
});
