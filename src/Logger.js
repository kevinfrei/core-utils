// @flow
// @format

import type { LoggerFuncType } from './index';

let limit = 1;

let logger:LoggerFuncType = (level: number, ...data: Array<any>) => {
  if (level <= limit) {
    console.log(...data);
  }
};

logger.getLimit = (): number => limit;
logger.setLimit = (newLimit: number) => {
  limit = newLimit;
};

module.exports = logger;
