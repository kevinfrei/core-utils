export const deQuote = (str: string): string => str.replace(/\"/g, '~!~');

export function reQuote(str: string): { [key: string]: string } {
  let res: string = str.replace(/\\/g, '\\\\');
  res = res.replace(/\"/g, '\\"');
  res = res.replace(/~!~/g, '"');
  return JSON.parse(res);
}

export function prefixObj(
  str: string,
  obj: { [key: string]: string },
): string[] {
  const res: string[] = [];
  for (const elem of Object.keys(obj)) {
    res.push(str + elem);
    if (obj[elem] !== null) {
      res.push(obj[elem]);
    }
  }
  return res;
}

export const isArray = (obj: unknown): boolean => Array.isArray(obj);

export function isString(obj: unknown): boolean {
  return obj !== null && obj !== undefined && typeof obj === 'string';
}

export function isNumber(obj: unknown): boolean {
  return typeof obj === 'number' && !isNaN(obj - 0);
}

export function isFunction(obj: unknown): boolean {
  return (
    (obj !== null &&
      typeof obj === 'object' &&
      obj!.hasOwnProperty('constructor') &&
      obj!.hasOwnProperty('call') &&
      obj!.hasOwnProperty('apply')) ||
    typeof obj === 'function'
  );
}
