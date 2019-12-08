// @flow
// @format

const FTON = require('./FTON');
const ObjUtil = require('./object');
const Logger = require('./Logger');
const SeqNum = require('./SeqNum');
const ClientRPC = require('./ClientRPC');

export type FTONData = string
  | number
  | boolean
  | null
  | FTONObject
  | FTONArray;
export type FTONObject = { [key: string]: FTONData };
export type FTONArray = Array<FTONData>;

export type LoggerFuncType = {
  (number, string): void,
  getLimit?: () => number,
  setLimit?: (number) => void
};

export type rpcMessageType = {
  func: string,
  args: FTONData,
  result?: string
};

export type rpcHandlerType = Map<string, Function>;
module.exports = {
  FTON,
  ObjUtil,
  Logger,
  SeqNum,
  ClientRPC
};
