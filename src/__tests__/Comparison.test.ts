import { Operations } from '../index';

test('Comparisons String Case Insensitive Equality', () => {
  expect(Operations.StringCaseInsensitiveEqual('a', 'A')).toBeTruthy();
  expect(Operations.StringCaseInsensitiveEqual('BBb', 'Bbba')).toBeFalsy();
  expect(Operations.StringCaseInsensitiveEqual()).toBeTruthy();
  expect(Operations.StringCaseInsensitiveEqual(undefined, '')).toBeFalsy();
  expect(
    Operations.StringCaseInsensitiveEqual(undefined, undefined),
  ).toBeTruthy();
  expect(Operations.StringCaseInsensitiveEqual('', undefined)).toBeFalsy();
  expect(Operations.StringCaseInsensitiveEqual('')).toBeFalsy();
  expect(Operations.StringCaseInsensitiveEqual('', '')).toBeTruthy();
  expect(Operations.StringCaseInsensitiveEqual(undefined, 'a')).toBeFalsy();
  expect(Operations.StringCaseInsensitiveEqual('undefined', '')).toBeFalsy();
});

test('Set/Array operations', () => {
  const a1 = ['a', 'b', 'c'];
  const a2 = ['a', 'b', 'd', 'e'];
  const a3 = ['a', 'b', 'e'];
  const s1 = new Set<string>(a1);
  const s2 = new Set<string>(a2);
  expect(Operations.SetEqual(s1, s1)).toBeTruthy();
  expect(Operations.SetEqual(s1, s2)).toBeFalsy();
  expect(Operations.SetEqual(s2, s1)).toBeFalsy();
  const s1is2 = Operations.SetIntersection(s1, s2);
  const a1ia2 = Operations.ArrayIntersection(a1, a2);
  const a2ia1 = Operations.ArrayIntersection(a2, a1);
  expect(s1is2.size).toEqual(2);
  expect(s1is2).toEqual(a1ia2);
  expect(Operations.ArraySetEqual([...a1ia2], [...a2ia1])).toBeTruthy();
  expect(Operations.ArraySetEqual(a1, a2)).toBeFalsy();
  expect(Operations.ArraySetEqual(a1, a3)).toBeFalsy();
  const s1ms2 = Operations.SetDifference(s1, s2);
  expect(s1ms2.size).toEqual(1);
  const s2ms1 = Operations.SetDifference(s2, s1);
  expect(s2ms1.size).toEqual(2);
  expect(Operations.SetIntersection(s1ms2, s2ms1).size).toEqual(0);
});
