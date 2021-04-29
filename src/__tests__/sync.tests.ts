// TODO: Add a bunch of tests for the synchronization things

import { DebouncedDelay, DebouncedEvery, Sleep } from '../Sync';

test('DebouncedEvery testing', async () => {
  let timer = Date.now();
  let callCount = 0;
  let lastDelta = 0;
  function updateTimeDelta() {
    callCount++;
    const newTime = Date.now();
    lastDelta = newTime - timer;
    timer = newTime;
  }
  const everyHundred = DebouncedEvery(updateTimeDelta, 250);
  everyHundred();
  await Sleep(10);
  everyHundred();
  await Sleep(10);
  everyHundred();
  await Sleep(10);
  everyHundred();
  await Sleep(10);
  everyHundred();
  await Sleep(300);
  expect(callCount).toBe(1);
  expect(lastDelta).toBeGreaterThan(249);
  expect(lastDelta).toBeLessThan(275);
  timer = Date.now();
  everyHundred();
  await Sleep(10);
  everyHundred();
  await Sleep(10);
  everyHundred();
  await Sleep(10);
  everyHundred();
  await Sleep(10);
  everyHundred();
  await Sleep(300);
  expect(callCount).toBe(2);
  expect(lastDelta).toBeGreaterThan(249);
  expect(lastDelta).toBeLessThan(275);
});

test('DebouncedDelay testing', async () => {
  let timer = Date.now();
  let callCount = 0;
  let lastDelta = 0;
  function updateTimeDelta() {
    callCount++;
    const newTime = Date.now();
    lastDelta = newTime - timer;
    timer = newTime;
  }
  const everyHundred = DebouncedDelay(updateTimeDelta, 250);
  everyHundred();
  await Sleep(200);
  everyHundred();
  await Sleep(200);
  everyHundred();
  await Sleep(200);
  everyHundred();
  await Sleep(200);
  everyHundred();
  await Sleep(350);
  expect(lastDelta).toBeGreaterThan(1050);
  expect(lastDelta).toBeLessThan(1150);
  expect(callCount).toBe(1);
  timer = Date.now();
  everyHundred();
  await Sleep(200);
  everyHundred();
  await Sleep(100);
  everyHundred();
  await Sleep(100);
  everyHundred();
  await Sleep(100);
  everyHundred();
  await Sleep(300);
  expect(lastDelta).toBeGreaterThan(750);
  expect(lastDelta).toBeLessThan(800);
  expect(callCount).toBe(2);
});
