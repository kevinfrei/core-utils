import * as FTON from '../FTON';

test('FTON sanity', () => {
  FTON.stringify([]);
});

test('FTON set roundtrip', () => {
  const set = new Set<string>(['a', 'b']);
  const setString = FTON.stringify(set);
  const newSet = FTON.parse(setString);
  const next = FTON.stringify(newSet);
  expect(next).toEqual(setString);
});

test('FTON map roundtrip', () => {
  const map = new Map<string, string>([
    ['a', 'b'],
    ['c', 'd'],
  ]);
  const mapString = FTON.stringify(map);
  const newMap = FTON.parse(mapString);
  const next = FTON.stringify(newMap);
  expect(next).toEqual(mapString);
});
