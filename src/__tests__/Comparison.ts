import { Comparisons } from '@freik/core-utils';

test('Comparisons String Case Insensitive Equality', () => {
  expect(Comparisons.StringCaseInsensitiveEqual('a', 'A')).toBe(true);
});
