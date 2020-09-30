import * as typ from '../types';

test('Object.isString empty', () => {
  expect(typ.isString('')).toBe(true);
});
test('Object.isString something', () => {
  expect(typ.isString('s')).toBe(true);
});
test('Object.isString notStr', () => {
  expect(typ.isString(0)).toBe(false);
});

// TODO: moar tests
