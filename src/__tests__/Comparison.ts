import { Operations } from '../index';

test('Comparisons String Case Insensitive Equality', () => {
  expect(Operations.StringCaseInsensitiveEqual('a', 'A')).toBe(true);
});
