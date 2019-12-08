//@flow
//@format
'use strict';

const FTON = require('./FTON');

import type { FTONData, rpcMessageType, rpcHandlerType } from './index';

const MakeTypedMessage = (theMessage: FTONData): ?rpcMessageType => {
  const msg = theMessage;
  if (!msg) return;

  if (!msg.type) return null;
  const type = msg.type;
  if (type !== 'rpc') return;

  if (!msg.func) return;
  const func = msg.func;
  if (typeof func !== 'string') return;

  let args: FTONData = null;
  if (msg.args) args = FTON.typecheck(msg.args); // WTF is wrong with you, Flow?

  if (msg.result === undefined) {
    return {
      func,
      args
    };
  }
  if (typeof msg.result !== 'string') return null;
  return { func, args, result: msg.result };
};

const InvokeFunc = (
  func: Function,
  args: Array<any>,
  handler: rpcHandlerType,
  result: ?string
) => {
  if (!result) {
    func(...args);
  } else {
    const reply: ?Function = handler.get(result);
    if (reply) {
      reply(func(...args));
    }
  }
};

const ClientRPC = (message: FTONData, handler: rpcHandlerType): void => {
  // Validate the message, then call the function
  // by reflecting on the handler
  const typedMsg = MakeTypedMessage(message);
  if (!typedMsg) {
    return;
  }
  const func: ?Function = handler.get(typedMsg.func);
  if (!func) {
    return;
  }
  if (Array.isArray(typedMsg.args)) {
    InvokeFunc(func, typedMsg.args, handler, typedMsg.result);
  } else if (typedMsg.args) {
    InvokeFunc(func, [typedMsg.args], handler, typedMsg.result);
  } else {
    InvokeFunc(func, [], handler, typedMsg.result);
  }
};

module.exports = ClientRPC;
