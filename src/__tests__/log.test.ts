import { MakeLogger } from '../index';

test('New Logging API', () => {
  const log = MakeLogger('id', true);
  expect(log.isEnabled()).toBeTruthy();
  log('You should *only* see this line');
  log.disable();
  log('test');
  expect(log.isEnabled()).toBeFalsy();
  expect(log.getId()).toEqual('id');
  MakeLogger.enable('id');
  expect(log.isEnabled()).toBeTruthy();
  MakeLogger.disable('id');
  expect(log.isEnabled()).toBeFalsy();
});

test('multi-logger configuration', () => {
  const l1 = MakeLogger('a', true);
  const l2 = MakeLogger('b', false);
  const l3 = MakeLogger();
  expect(l1.isEnabled()).toBeTruthy();
  expect(l2.isEnabled()).toBeFalsy();
  expect(l3.isEnabled()).toBeFalsy();
  MakeLogger.disable(l1.getId());
  expect(l1.isEnabled()).toBeFalsy();
  expect(l2.isEnabled()).toBeFalsy();
  expect(l3.isEnabled()).toBeFalsy();
  l2.enable();
  l3.enable();
  expect(l1.isEnabled()).toBeFalsy();
  expect(l2.isEnabled()).toBeTruthy();
  expect(l3.isEnabled()).toBeTruthy();
  MakeLogger.all();
  expect(l1.isEnabled()).toBeTruthy();
  expect(l2.isEnabled()).toBeTruthy();
  expect(l3.isEnabled()).toBeTruthy();
  MakeLogger.none();
  expect(l1.isEnabled()).toBeFalsy();
  expect(l2.isEnabled()).toBeFalsy();
  expect(l3.isEnabled()).toBeFalsy();
  MakeLogger.restore();
  expect(l1.isEnabled()).toBeTruthy();
  expect(l2.isEnabled()).toBeFalsy();
  expect(l3.isEnabled()).toBeFalsy();
  MakeLogger.enable(l3.getId());
  expect(l1.isEnabled()).toBeTruthy();
  expect(l2.isEnabled()).toBeFalsy();
  expect(l3.isEnabled()).toBeTruthy();
});
