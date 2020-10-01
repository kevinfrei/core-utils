import * as FTON from '../FTON';

test('FTON sanity', () => {
  FTON.stringify([]);
});

test('FTON set roundtrip', () => {
  const set = [new Set<string>(['a', 'b'])];
  const setString = FTON.stringify(set);
  const newSet = FTON.parse(setString);
  const next = FTON.stringify(newSet);
  console.log(next);
  console.log(setString);
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
  const next = FTON.stringify(newMap);
  console.log(next);
  console.log(mapString);
  expect(next).toEqual(mapString);
});
