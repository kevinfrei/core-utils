import { Type } from '../index';

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
