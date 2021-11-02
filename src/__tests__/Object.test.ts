import { ObjUtil } from '../index';

test('ObjUtil.has', () => {
  expect(ObjUtil.has('a', { a: 1 })).toBeTruthy();
  expect(ObjUtil.has('b', { a: 1 })).toBeFalsy();
  expect(ObjUtil.hasStr('a', { a: '1' })).toBeTruthy();
  expect(ObjUtil.hasStr('a', { a: 1 })).toBeFalsy();
  expect(ObjUtil.hasStr('b', { a: 1 })).toBeFalsy();
});

// This is not doing anything I can quite follow
/*
test('ObjUtil quoting', () => {
  const expr = { greeting: '"Hi," said ~Hank!~' };
  const requoted = ObjUtil.reQuote(JSON.stringify(expr));
  expect(requoted.indexOf('"')).toEqual(-1);
  expect(ObjUtil.reQuote(dequoted)).toEqual(JSON.stringify(expr));
});
*/

test('Object Prefixing', () => {
  const obj1 = { a: 'b', c: 'd' };
  const pobj1 = ObjUtil.prefixObj('yup', obj1);
  const exp = ['yupa', 'b', 'yupc', 'd'];
  expect(pobj1).toEqual(exp);
});

test('Object to Map', () => {
  const obj1 = { a: 'b', c: 'd', e: 1 };
  const map1 = new Map<string, string>([
    ['a', 'b'],
    ['c', 'd'],
    ['e', '1'],
  ]);
  expect(ObjUtil.objToMap(obj1)).toEqual(map1);
});
