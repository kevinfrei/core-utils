const cleaners: [RegExp, string][] = [
  [/[`’‘]/g, "'"],
  [/[“”]/g, '"'],
  [/[\u0300-\u036f]/g, ''], // This kills diacriticals after .normalize()
  [/‐/g, '-'],
];

const articles: [RegExp, string][] = [
  [/^THE /i, ''],
  [/^A /i, ''],
  [/^AN /i, ''],
];

export function StripInitialArticles(phrase: string): string {
  let res = phrase.normalize();
  for (const [rg, str] of articles) {
    res = res.replace(rg, str);
  }
  return res;
}

export function NormalizeText(phrase: string): string {
  let res = phrase.toLocaleUpperCase().normalize();
  for (const [rg, str] of cleaners) {
    res = res.replace(rg, str);
  }
  return res;
}

// Gotta use this instead of localeCompare, thanks to
// BLUE ÖYSTER CULT and BLUE ÖYSTER CULT being locale equal, but not ===
// which causes problems in the ArtistMap of the Music database
export function StringCompare(a: string, b: string): number {
  return (a > b ? 1 : 0) - (a < b ? 1 : 0);
}

export function NormalizedStringCompare(a: string, b: string): number {
  return StringCompare(NormalizeText(a), NormalizeText(b));
}

export function NoArticlesNormalizedStringCompare(
  a: string,
  b: string,
): number {
  return StringCompare(
    StripInitialArticles(NormalizeText(a)),
    StripInitialArticles(NormalizeText(b)),
  );
}

export function NoArticlesStringCompare(a: string, b: string): number {
  return StringCompare(StripInitialArticles(a), StripInitialArticles(b));
}
