import { Type } from '../index';
import { TypeCheckPair } from '../public-defs';

test('Object.isString empty', () => {
  expect(Type.isString('')).toBe(true);
});
test('Object.isString something', () => {
  expect(Type.isString('s')).toBe(true);
});
test('Object.isString notStr', () => {
  expect(Type.isString(0)).toBe(false);
});
test('isRegex', () => {
  expect(Type.isRegex({ source: 'abc', flags: 'i' })).toBeFalsy();
  expect(Type.isRegex(/abc/i)).toBeTruthy();
  expect(Type.isRegex(new RegExp('abc', 'i'))).toBeTruthy();
});
test('isDate', () => {
  expect(Type.isDate(Date())).toBeFalsy();
  expect(Type.isDate(new Date())).toBeTruthy();
});
// TODO: moar tests
test('isSpecificType', () => {
  const theType = { a: 1, b: () => 0, c: new Set<string>() };
  const fieldTypes: TypeCheckPair[] = [
    ['a', Type.isNumber],
    ['b', Type.isFunction],
    ['c', Type.isSetOfString],
  ];
  const required = ['a', 'b'];
  expect(Type.isSpecificType(theType, fieldTypes, required)).toBeTruthy();
  expect(
    Type.isSpecificType(theType, new Map(fieldTypes), new Set(required)),
  ).toBeTruthy();
  expect(
    Type.isSpecificType({ a: 2, b: () => '' }, fieldTypes, new Set(required)),
  ).toBeTruthy();
  expect(
    Type.isSpecificType({ a: 2, b: 1 }, fieldTypes, new Set(required)),
  ).toBeFalsy();
  expect(
    Type.isSpecificType(
      { a: 2, c: new Set(['a', 'b']) },
      fieldTypes,
      new Set(required),
    ),
  ).toBeFalsy();
  expect(
    Type.isSpecificType({ a: 2, c: 1 }, fieldTypes, new Set(required)),
  ).toBeFalsy();
});
