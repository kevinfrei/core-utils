export function ToPathSafeName(name: string): string {
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

export function FromPathSafeName(safe: string): string {
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

/* eslint-disable no-bitwise */
/**
 *
 * @param val - An unsigned 32 bit integerr
 * @returns A string encoding of the value in 4 (or fewer) characters
 */
export function ToU8(val: number): string {
  const res = [];
  if (val > 4294967295 || val < 0) {
    throw new Error(`${val} out of range for U8 encoding`);
  }
  do {
    // Run once this for a zero value, so we don't get empty-string
    // All unicode values between 256 and 511 are defined and independent :)
    // Plus, this makes it so that other schemes involved ASCII don't conflict
    res.push((val & 0x1ff) + 0x1400);
    val = val >>> 9;
  } while (val > 0);
  return String.fromCharCode(...res);
}

export function FromU8(val: string): number {
  let res = 0;
  for (let i = val.length - 1; i >= 0; i--) {
    const code = val.charCodeAt(i) - 0x1400;
    if (code < 0 || code > 0x1ff) {
      throw new Error(`Character ${val[i]} (${code}) out of range`);
    }
    res *= 512;
    res += code;
  }
  return res;
}
