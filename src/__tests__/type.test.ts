import { MakeMultiMap } from '../multimap';
import { SpecificCheckPair } from '../public-defs';
import {
  asArrayOfString,
  asNumber,
  asNumberOrString,
  asSimpleObject,
  asString,
  cleanseKeys,
  enumKeys,
  hasFn,
  hasStrFn,
  hasSymbolFn,
  hasSymbolTypeFn,
  hasTypeFn,
  is2TupleOf,
  is2TypeOfFn,
  is3TupleOf,
  is3TupleOfFn,
  isArray,
  isArrayOf,
  isArrayOfFn,
  isDate,
  isFunction,
  isMapOf,
  isMapOfFn,
  isMapOfStrings,
  isMultiMapOf,
  isMultiMapOfFn,
  isNull,
  isNumber,
  isNumberOrString,
  isObject,
  isObjectOf,
  isObjectOfFn,
  isObjectOfFullType,
  isObjectOfFullTypeFn,
  isObjectOfString,
  isObjectOfType,
  isObjectOfTypeFn,
  isRegex,
  isSetOfFn,
  isSetOfString,
  isSimpleObject,
  isSpecificType,
  isSpecificTypeFn,
  isString,
  toArrayOfString,
  toString,
} from '../types';

test('isString', () => {
  expect(isString('')).toBe(true);
  expect(isString('s')).toBe(true);
  expect(isString(0)).toBe(false);
});
test('isRegex', () => {
  expect(isRegex({ source: 'abc', flags: 'i' })).toBeFalsy();
  expect(isRegex(/abc/i)).toBeTruthy();
  expect(isRegex(new RegExp('abc', 'i'))).toBeTruthy();
});
test('isDate', () => {
  expect(isDate(Date())).toBeFalsy();
  expect(isDate(new Date())).toBeTruthy();
});
test('isSpecificType & stragglers', () => {
  const theType = { a: 1, b: () => 0, c: new Set<string>(['a']) };
  const fieldTypes: SpecificCheckPair<typeof theType>[] = [
    ['a', isNumber],
    ['b', isFunction],
    ['c', isSetOfString],
  ];
  const required = ['a', 'b'];
  const arrOf = [theType, theType];
  expect(isArrayOf(required, isString)).toBeTruthy();
  expect(isArrayOfFn(isString)(required)).toBeTruthy();
  expect(isSpecificType(theType, fieldTypes, required)).toBeTruthy();
  expect(isSpecificType(theType, fieldTypes)).toBeTruthy();
  expect(isSpecificType(theType, new Map(fieldTypes), required)).toBeTruthy();
  expect(isArrayOf(arrOf, isSpecificTypeFn(fieldTypes, required))).toBeTruthy();
  expect(
    isSpecificType({ a: 2, b: () => '' }, fieldTypes, required),
  ).toBeTruthy();
  expect(isSpecificType({ a: 2, b: 1 }, fieldTypes, required)).toBeFalsy();
  expect(
    isSpecificType({ a: 2, c: new Set(['a', 'b']) }, fieldTypes, required),
  ).toBeFalsy();
  expect(isSetOfString(new Set<number>([1, 2]))).toBeFalsy();
  expect(isObjectOfString('asdf')).toBeFalsy();
  expect(isObjectOfString({ a: 'asdf', b: 1 })).toBeFalsy();
  expect(isSpecificType({ a: 2, c: 1 }, fieldTypes, required)).toBeFalsy();
  expect(isSpecificType(null, fieldTypes, required)).toBeFalsy();
  expect(
    isSpecificType({ a: 2, b: () => '', d: null }, fieldTypes, required),
  ).toBeTruthy();
  expect(
    isSpecificType(
      { a: 2, b: () => '', d: 'nope' },
      fieldTypes,
      new Set(required),
    ),
  ).toBeFalsy();
  expect(hasStrFn('a')({ a: 'a' })).toBeTruthy();
  expect(hasStrFn('b')({ a: 'a' })).toBeFalsy();
  expect(hasTypeFn('a', isString)({ a: 'b' })).toBeTruthy();
  expect(hasFn('a')({ b: 1 })).toBeFalsy();
});
test('isObjectOfType', () => {
  const theType = { a: 1, b: () => 0, c: new Set<string>(['a']) };
  const theOptionalType = { a: 2, b: () => 1 };
  const required = { a: isNumber, b: isFunction };
  const optional = { c: isSetOfString };
  const allOf = { ...required, ...optional };
  const arrOf = [theType, theType];
  const isType = isObjectOfFullTypeFn<Partial<typeof theType>>(required);
  expect(isObjectOfType(theType, required, optional)).toBeTruthy();
  expect(isObjectOfType(theType, optional, required)).toBeTruthy();
  expect(isObjectOfFullType(theType, allOf)).toBeTruthy();
  expect(isType(theOptionalType)).toBeTruthy();
  expect(isObjectOfFullType(theOptionalType, allOf)).toBeFalsy();
  expect(isObjectOfFullType(theOptionalType, allOf)).toBeFalsy();
  expect(isArrayOf(arrOf, isObjectOfTypeFn(required, optional))).toBeTruthy();
  expect(
    isObjectOfType({ a: 2, b: () => '' }, required, optional),
  ).toBeTruthy();
  expect(isObjectOfType({ a: 2, b: 1 }, required, optional)).toBeFalsy();
  expect(
    isObjectOfType({ a: 2, c: new Set(['a', 'b']) }, required, optional),
  ).toBeFalsy();
  expect(
    isObjectOfType(
      { a: 2, b: () => 0, c: new Set([1, 2]) },
      required,
      optional,
    ),
  ).toBeFalsy();
  expect(isObjectOfType(null, required, optional)).toBeFalsy();
  expect(
    isObjectOfType({ a: 2, b: () => '', d: null }, required, optional),
  ).toBeTruthy();
  expect(
    isObjectOfType({ a: 2, b: () => '', d: '' }, required, optional),
  ).toBeFalsy();
});
test('The simple is/as tests', () => {
  expect(asNumber({}, 1)).toEqual(1);
  expect(asNumber(1 / 0, 1)).toEqual(Number.POSITIVE_INFINITY);
  expect(asNumberOrString('a', 0)).toEqual('a');
  expect(asNumberOrString({}, 'b')).toEqual('b');
  expect(asNumberOrString(null, 3)).toEqual(3);
  expect(asString(1, 'b')).toEqual('b');
  expect(toString(1, 'b')).toEqual('1');
  expect(toString('s')).toEqual('s');
  expect(toString(undefined)).toEqual('');
  const myThing = { toString: () => 'myThing' };
  expect(toString(myThing)).toEqual('myThing');
  expect(toString({ a: 1 })).toEqual('');
  expect(asString(myThing)).toEqual('');
  expect(isObject({})).toBeTruthy();
  expect(isObject(1)).toBeFalsy();
  expect(isObject(null)).toBeTruthy();
  expect(isObject(undefined)).toBeFalsy();
  expect(isNull(null)).toBeTruthy();
  expect(isNull(undefined)).toBeFalsy();
  expect(isNull('')).toBeFalsy();
  expect(isNull({})).toBeFalsy();
  expect(isNull(0)).toBeFalsy();
  expect(isNull([])).toBeFalsy();
  const val = () => {};
  val.tester = 'foo';
  expect(isFunction(val)).toBeTruthy();
});
test('as/toArrayOfString tests', () => {
  expect(asArrayOfString([0, 'a'])).toEqual(['a']);
  expect(asArrayOfString({ a: 1 })).toEqual([]);
  expect(asArrayOfString(() => [], ['bcd'])).toEqual(['bcd']);
  expect(asArrayOfString([1, 'a'], 'b')).toEqual(['b', 'a']);
  expect(asArrayOfString([{}, 'a'], 'b')).toEqual(['b', 'a']);
  expect(asArrayOfString(['1', 1], ['nope'])).toEqual(['nope']);
  expect(asArrayOfString(['1', '1'], ['nope'])).toEqual(['1', '1']);
  expect(toArrayOfString([1, 2, 'a'])).toEqual(['1', '2', 'a']);
  expect(toArrayOfString({}, ['hello'])).toEqual(['hello']);
  expect(toArrayOfString({})).toEqual([]);
  expect(toArrayOfString([{}, {}], 'a')).toEqual(['a', 'a']);
  expect(toArrayOfString([{}, 'A'])).toEqual(['A']);
  expect(toArrayOfString([{}, 'A'], 'B')).toEqual(['B', 'A']);
  expect(toArrayOfString([{}, 'A'], ['hola'])).toEqual(['hola']);
  expect(toArrayOfString(['B', 'A'], ['hola'])).toEqual(['B', 'A']);
});
test('Miscellaneous type checks', () => {
  expect(isObjectOfString({ a: 'b' })).toBeTruthy();
  expect(isObjectOfString({ b: 1 })).toBeFalsy();
  expect(isObjectOfString({ [Symbol.iterator]: 'a' })).toBeFalsy();
  expect(isObjectOf({ [Symbol.iterator]: 1 }, isString)).toBeFalsy();
  expect(isObjectOf({ [Symbol.iterator]: 'b' }, isString)).toBeTruthy();
  const mapOfStr = new Map([
    ['a', 'b'],
    ['c', 'd'],
  ]);
  const mapOfStrNum = new Map<string, string | number>([
    ['a', 'b'],
    ['c', 1],
  ]);
  const mapOfNumStr = new Map<string | number, string>([
    [1, 'b'],
    ['c', 'd'],
  ]);
  expect(isMapOfStrings(mapOfStr)).toBeTruthy();
  expect(isMapOfStrings(mapOfNumStr)).toBeFalsy();
  expect(isMapOfStrings(mapOfStrNum)).toBeFalsy();
  expect(isMapOfFn(isString, isNumberOrString)(mapOfStrNum)).toBeTruthy();
  expect(isMapOfFn(isString, isNumberOrString)(mapOfNumStr)).toBeFalsy();
  expect(isMapOf(1, isString, isNull)).toBeFalsy();
  expect(is2TupleOf([1, 'a'], isNumber, isString)).toBeTruthy();
  expect(is2TypeOfFn(isNumber, isString)([1, 'a'])).toBeTruthy();
  expect(is2TupleOf([1, 2], isNumber, isString)).toBeFalsy();
  expect(is3TupleOf([1, 2, 'a'], isNumber, isNumber, isString)).toBeTruthy();
  expect(is3TupleOf([1, 2, 'a'], isNumber, isString, isString)).toBeFalsy();
  expect(is3TupleOfFn(isNumber, isString, isString)([1, 2, 'a'])).toBeFalsy();
  expect(
    is3TupleOf(
      [1, new Set([2, 3, '4']), 5],
      isNumber,
      isSetOfFn(isNumberOrString),
      isNumber,
    ),
  ).toBeTruthy();
  expect(
    isObjectOfFn(isArrayOfFn(isNumberOrString))({
      a: [1],
      b: [2, '3', 4],
      c: ['five'],
    }),
  ).toBeTruthy();
  const obj = { [Symbol.iterator]: [1, 'two'] };
  expect(
    isArrayOf(
      [obj],
      hasSymbolTypeFn(Symbol.iterator, isArrayOfFn(isNumberOrString)),
    ),
  ).toBeTruthy();
  expect(isArrayOf([obj], hasSymbolFn(Symbol.iterator))).toBeTruthy();
});

test('is/asSimpleObject tests', () => {
  const arr = [null, undefined, 'a', 12, true];
  const arrr = [...arr, () => {}];
  const sarr = asSimpleObject(arr);
  if (!isArray(sarr)) throw 'oops';
  expect(arr).toEqual(sarr);
  const sarrr = asSimpleObject(arrr);
  if (!isArray(sarrr)) throw 'oops';
  // The function should be removed
  expect(arr.length).toEqual(sarrr.length);
  expect(isSimpleObject(arr)).toBeTruthy();
  expect(isSimpleObject(arrr)).toBeFalsy();
  expect(isSimpleObject(sarr)).toBeTruthy();
  const obj = { a: arr, b: 1, c: null, d: true, e: 'a' };
  const sobj = asSimpleObject(obj);
  expect(sobj).toStrictEqual(obj);
  expect(asSimpleObject(() => {})).toBeUndefined();
  expect(isSimpleObject(() => {})).toBeFalsy();
});

test('MultiMap type tests', () => {
  const mmns = MakeMultiMap([
    [1, 'a'],
    [2, 'b'],
  ]);
  expect(isMultiMapOf(mmns, isNumber, isString)).toBeTruthy();
  expect(isMultiMapOf(mmns, isNumber, isNumber)).toBeFalsy();
  expect(isMultiMapOfFn(isNumber, isNumber)(mmns)).toBeFalsy();
  expect(isMultiMapOf(mmns, isString, isNumber)).toBeFalsy();
  expect(isMultiMapOf({}, isNumber, isNumber)).toBeFalsy();
});
test('cleansing', () => {
  const foo = { a: 1, b: 0, c: undefined, d: null };
  const bar = { ...foo };
  cleanseKeys(bar);
  expect(Object.keys(bar).length).toEqual(2);
  cleanseKeys(foo, true);
  expect(Object.keys(foo).length).toEqual(3);
  cleanseKeys(null);
});
enum StringEnum {
  North,
  South,
  East,
  West,
}
enum NumEnum {
  One = 1,
  Two,
  Three,
}
test('basic enum stupidity', () => {
  const val = StringEnum.East;
  expect(val).toEqual(StringEnum.East);
  expect(val in StringEnum).toBeTruthy();
  let count = 0;
  let strResult = '';
  for (const k of enumKeys(StringEnum)) {
    count++;
    strResult += k;
  }
  expect(count).toEqual(4);
  expect(strResult).toEqual('NorthSouthEastWest');
  let numResult = 0;
  for (const k of enumKeys(NumEnum)) {
    count++;
    numResult += NumEnum[k];
  }
  expect(count).toEqual(7);
  expect(numResult).toEqual(6);
});
