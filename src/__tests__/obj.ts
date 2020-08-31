import * as obj from '../object';

test('Object.isString empty', () => {
  expect(obj.isString('')).toBe(true);
});
test('Object.isString something', () => {
  expect(obj.isString('s')).toBe(true);
});
test('Object.isString notStr', () => {
  expect(obj.isString(0)).toBe(false);
});

// TODO: moar tests