import { FromPathSafeName, FromU8, ToPathSafeName, ToU8 } from '../translation';

test('Simplistic name encoding', () => {
  expect(ToPathSafeName('TEST')).toBe('TEST');
  expect(FromPathSafeName('TEST')).toBe('TEST');
});

test('Simple name round-tripping', () => {
  expect(FromPathSafeName(ToPathSafeName('TesT'))).toBe('TesT');
});

function allSafe(str: string): boolean {
  return /^[A-Z0-9_.-]*$/.exec(str) !== null;
}

test('Slightly complex round-tripping with basic validation', () => {
  const messyNames: string[] = [
    'c:/Tester.thing',
    `\\Volume\d$`,
    '/Users/data',
    '*?: __',
    '',
  ];
  for (const name of messyNames) {
    const safe = ToPathSafeName(name);
    expect(allSafe(safe)).toBeTruthy();
    expect(FromPathSafeName(safe)).toBe(name);
  }
});

test('Truly messy stuff round-tripping with basic validation', () => {
  const messyNames: string[] = [
    'ƒœ∂ƒ∆˚ƒø',
    "'øπˆ¨¥",
    '测试',
    'Yeş',
    'Ğğ',
    'ギ囲ダヾ',
    '한국어 키보드',
    'И цаньт wрите ин цыриллиц',
    'من فارسی صحبت نمی کنم',
    'बहुत से अन्य लोग शायद इसे पढ़ सकते हैं। पर मैं नहीं।',
    'אני לא מדבר שום עברית. אני גם לא מדבר יידיש.',
  ];
  for (const name of messyNames) {
    const safe = ToPathSafeName(name);
    expect(allSafe(safe)).toBeTruthy();
    expect(FromPathSafeName(safe)).toBe(name);
  }
});

test('Some U8 roundtripping with simple checks', () => {
  for (const value of [
    0,
    255,
    1234,
    16384,
    16384 * 8192,
    4294967294,
    4294967295,
  ]) {
    const after = ToU8(value);
    const before = FromU8(after);
    expect(after.length).toBeGreaterThan(0);
    expect(after.length).toBeLessThan(5);
    expect(before).toEqual(value);
  }
});
