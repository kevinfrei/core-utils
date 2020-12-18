import { toSafeName, fromSafeName } from '../index';

test('Simplistic name encoding', () => {
  expect(toSafeName('TEST')).toBe('TEST');
  expect(fromSafeName('TEST')).toBe('TEST');
});

test('Simple name round-tripping', () => {
  expect(fromSafeName(toSafeName('TesT'))).toBe('TesT');
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
    const safe = toSafeName(name);
    expect(allSafe(safe)).toBeTruthy();
    expect(fromSafeName(safe)).toBe(name);
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
    const safe = toSafeName(name);
    expect(allSafe(safe)).toBeTruthy();
    expect(fromSafeName(safe)).toBe(name);
  }
});
