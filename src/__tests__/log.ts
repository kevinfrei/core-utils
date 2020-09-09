import { Logger as logger } from '../index';

test('sanity', () => {
  const log = logger.bind('test');
  log('hello');
  expect(logger.isEnabled('test')).toBe(false);
  expect(logger.isDisabled('test')).toBe(true);
});
