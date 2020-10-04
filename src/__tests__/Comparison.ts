import { Comparisons as Comp } from '../index';

test('Comparisons String Case Insensitive Equality', () => {
  expect(Comp.StringCaseInsensitiveEqual('a', 'A')).toBe(true);
});
