// @format
const deQuote = str => str.replace(/\"/g, "~!~");

const reQuote = str => {
  let res = str.replace(/\\/g, "\\\\");
  res = res.replace(/\"/g, '\\"');
  res = res.replace(/~!~/g, '"');
  return JSON.parse(res);
};

const prefixObj = (str, obj) => {
  const res = [];

  for (const elem
  /*: string*/
  of Object.keys(obj)) {
    res.push(str + elem);

    if (obj[elem] !== null) {
      res.push(obj[elem]);
    }
  }

  return res;
};

const isArray = obj => {
  return Array.isArray(obj);
};

const isString = obj => {
  return obj !== null && obj !== undefined && typeof obj === "string";
};

const isNumber = obj => {
  return typeof obj === "number" && !isNaN(obj - 0);
};

const isFunction = obj => {
  return obj !== null && typeof obj === 'object' && obj.hasOwnProperty("constructor") && obj.hasOwnProperty("call") && obj.hasOwnProperty("apply") || typeof obj === 'function';
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
//# sourceMappingURL=object.js.map