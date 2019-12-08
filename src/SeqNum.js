// @flow
// @format

// usage:
// const generator = require('SeqNum)('prefix');
// newSeqNum = generator();
// anotherSeqNum = generator();

module.exports = (prefix: ?string): (() => string) => {
  let curId = 0;
  const pref = prefix || '';
  return (): string => pref + (curId++).toString(36);
};
