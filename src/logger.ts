const newDisabled: Set<string | symbol> = new Set();
const newEnabled: Set<string | symbol> = new Set();
const allLoggers: Set<string | symbol> = new Set();

function enable(id: string | symbol) {
  newEnabled.add(id);
  newDisabled.delete(id);
}

function disable(id: string | symbol) {
  newEnabled.delete(id);
  newDisabled.add(id);
}

function all() {
  newDisabled.clear();
  allLoggers.forEach((v) => newEnabled.add(v));
}
function none() {
  newEnabled.clear();
  allLoggers.forEach((v) => newDisabled.add(v));
}
function restore() {
  newEnabled.clear();
  newDisabled.clear();
}
/**
 * Function Object for logging
 *
 * @public
 */
export type LogCreator = {
  (id?: string, enabledByDefault?: boolean): {
    (...args: unknown[]): void;
    enable: () => void;
    disable: () => void;
    getId: () => string | symbol;
    isEnabled: () => boolean;
  };
  enable: (id: string | symbol) => void;
  disable: (id: string | symbol) => void;
  all: () => void;
  none: () => void;
  restore: () => void;
};

// I prefer this interface
// I'd like to make it possible to turn on all logging from anywhere
// Just need to think about what interface I want for that
function bindLogger(which: 'std' | 'err'): LogCreator {
  // eslint-disable-next-line no-console
  const theLogger = which === 'std' ? console.log : console.error;
  function LogMaker(
    id?: string,
    enabledByDefault?: boolean,
  ): {
    (...args: unknown[]): void;
    enable: () => void;
    disable: () => void;
    getId: () => string | symbol;
    isEnabled: () => boolean;
  } {
    const defaultOn =
      enabledByDefault !== undefined ? enabledByDefault : which === 'err';
    const name: string | symbol = id ? id : Symbol();
    allLoggers.add(name);
    function isEnabled(): boolean {
      if (newDisabled.has(name)) return false;
      if (newEnabled.has(name)) return true;
      return defaultOn;
    }
    function log(...args: unknown[]): void {
      if (isEnabled()) {
        theLogger(...args);
      }
    }
    log.enable = () => enable(name);
    log.disable = () => disable(name);
    log.getId = () => name;
    log.isEnabled = isEnabled;
    return log;
  }

  LogMaker.enable = enable;
  LogMaker.disable = disable;
  LogMaker.all = all;
  LogMaker.none = none;
  LogMaker.restore = restore;
  return LogMaker;
}

/** @function */
export const MakeLogger: LogCreator = bindLogger('std');
/** @function */
export const MakeError: LogCreator = bindLogger('err');
