import * as Comp from '../Comparisons';

test('Comparisons String Case Insensitive Equality', () => {
  expect(Comp.StringCaseInsensitiveEqual('a', 'A')).toBe(true);
});
