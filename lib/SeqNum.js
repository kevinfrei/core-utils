// @format
// usage:
// const generator = require('SeqNum)('prefix');
// newSeqNum = generator();
// anotherSeqNum = generator();
module.exports = prefix => {
  let curId = 0;
  const pref = prefix || '';
  return () => pref + (curId++).toString(36);
};
//# sourceMappingURL=SeqNum.js.map