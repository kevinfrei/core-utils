import { Type } from './types';

const deQuote = (str: string): string => str.replace(/\"/g, '~!~');

function reQuote(str: string): { [key: string]: string } {
  let res: string = str.replace(/\\/g, '\\\\');
  res = res.replace(/\"/g, '\\"');
  res = res.replace(/~!~/g, '"');
  return JSON.parse(res) as { [key: string]: string };
}

function prefixObj(str: string, obj: { [key: string]: string }): string[] {
  const res: string[] = [];
  for (const elem of Object.keys(obj)) {
    res.push(str + elem);
    if (obj[elem] !== null) {
      res.push(obj[elem]);
    }
  }
  return res;
}

function has<K extends string>(
  key: K,
  x: unknown,
  // eslint-disable-next-line no-shadow
): x is { [key in K]: unknown } {
  return Type.isObjectNonNull(x) && key in x;
}

// eslint-disable-next-line no-shadow
function hasStr<K extends string>(
  key: K,
  x: unknown,
  // eslint-disable-next-line no-shadow
): x is { [key in K]: string } {
  return Type.isObjectNonNull(x) && has(key, x) && Type.isString(x[key]);
}

function objToMap(o: { [key: string]: string | number }): Map<string, string> {
  const res = new Map<string, string>();
  for (const i in o) {
    if (Type.isString(i) && i.length > 0 && i[0] !== '@' && i in o) {
      if (Type.isString(o[i]) || Type.isNumber(o[i])) {
        res.set(i, o[i].toString());
      }
    }
  }
  return res;
}

export const ObjUtil = { deQuote, reQuote, prefixObj, has, hasStr, objToMap };
