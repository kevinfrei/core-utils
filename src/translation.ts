export function toSafeName(name: string): string {
  // I want to produce a name that *looks* close to the original wherever
  // possible, while being encodable on a case-insensitive platform as a file
  // name.
  // Everything starts out in "normal, uppercase" mode
  // An dash is the "control" character
  // A double dash means "flip case mode"
  // Everything else is a B36 encoded UTF8 code
  const res: string[] = [];
  let curCase = /[A-Z0-9_.]/;
  let notCase = /[a-z0-9_.]/;
  for (const c of name) {
    if (curCase.exec(c) !== null) {
      res.push(c.toUpperCase());
    } else if (notCase.exec(c) !== null) {
      res.push('--', c.toUpperCase());
      const tmp = curCase;
      curCase = notCase;
      notCase = tmp;
    } else {
      res.push('-', c.charCodeAt(0).toString(36).toUpperCase(), '-');
    }
  }
  return res.join('');
}

export function fromSafeName(safe: string): string {
  // This just undoes what the above function does
  let curCase = (a: string) => a.toUpperCase();
  let notCase = (a: string) => a.toLowerCase();
  const res: string[] = [];
  for (let i = 0; i < safe.length; i++) {
    const c = safe[i];
    // Just a letter, folks
    if (c !== '-') {
      res.push(curCase(c));
      continue;
    }
    // Check to see if we're safe
    const nextUnderscore = safe.indexOf('-', i + 1);
    if (nextUnderscore < 0) {
      throw Error('Non-terminated encoding.');
    }
    // Is this a case-flip command?
    if (nextUnderscore === i + 1) {
      const tmp = curCase;
      curCase = notCase;
      notCase = tmp;
    } else {
      // Let's make sure that this number is formatted properly
      const numStr = safe.substring(i + 1, nextUnderscore);
      const theMatch = /^[0-9A-Z]+$/.exec(numStr);
      if (theMatch !== null) {
        res.push(
          String.fromCharCode(Number.parseInt(numStr.toLowerCase(), 36)),
        );
      } else {
        throw Error('Invalid encoding');
      }
    }
    i = nextUnderscore;
  }
  return res.join('');
}
