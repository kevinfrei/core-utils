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

// TODO: moar tests
