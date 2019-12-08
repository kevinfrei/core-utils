// @flow
// @format

const deQuote = (str: string): string => str.replace(/\"/g, "~!~");

const reQuote = (str: string): {[key:string]: string} => {
  let res: string = str.replace(/\\/g, "\\\\");
  res = res.replace(/\"/g, '\\"');
  res = res.replace(/~!~/g, '"');
  return JSON.parse(res);
};

const prefixObj = (str: string, obj: {[key:string]: string}): Array<string> => {
  const res: Array<string> = [];
  for (const elem/*: string*/ of Object.keys(obj)) {
    res.push(str + elem);
    if (obj[elem] !== null) {
      res.push(obj[elem]);
    }
  }
  return res;
};

const isArray = (obj: mixed): boolean %checks => {
  return Array.isArray(obj);
};

const isString = (obj: mixed): boolean %checks => {
  return obj !== null && obj !== undefined && typeof obj === "string";
};

const isNumber = (obj: mixed): boolean %checks => {
  return typeof obj === "number" && !isNaN(obj - 0);
};

const isFunction = (obj: any): boolean %checks => {
  return (
    obj !== null &&
    obj.hasOwnProperty("constructor") &&
    obj.hasOwnProperty("call") &&
    obj.hasOwnProperty("apply")
  );
};

module.exports = {
  deQuote,
  reQuote,
  prefixObj,
  isArray,
  isString,
  isNumber,
  isFunction
};
