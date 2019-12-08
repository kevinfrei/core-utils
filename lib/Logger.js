// @format
let limit = 1;

let logger = (level, ...data) => {
  if (level <= limit) {
    console.log(...data);
  }
};

logger.getLimit = () => limit;

logger.setLimit = newLimit => {
  limit = newLimit;
};

module.exports = logger;
//# sourceMappingURL=Logger.js.map