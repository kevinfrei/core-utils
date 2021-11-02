import {
  NoArticlesNormalizedStringCompare,
  NoArticlesStringCompare,
  NormalizedStringCompare,
  NormalizeText,
  StringCompare,
  StripInitialArticles,
} from '../Helpers';

test('Text Helpers', () => {
  expect(StripInitialArticles('The rain')).toEqual('rain');
  expect(NormalizeText('’“”‐')).toEqual('\'""-');
  expect(StringCompare('A', 'B')).toEqual(-1);
  expect(
    NormalizedStringCompare('BLUE ÖYSTER CULT', 'BLUE ÖYSTER CULT'),
  ).toEqual(0);
  expect(
    NoArticlesNormalizedStringCompare(
      'The BLUE ÖYSTER CULT',
      'A BLUE ÖYSTER CULT',
    ),
  ).toEqual(0);
  expect(NoArticlesStringCompare('The test', 'a test')).toEqual(0);
});
