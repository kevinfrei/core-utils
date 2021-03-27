import { FromPathSafeName, ToPathSafeName } from '../translation';

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
