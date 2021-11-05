const disabled: Set<unknown> = new Set();
const enabled: Set<unknown> = new Set();

let defaultToShow = true;

// deprecated
export type LogType = {
  (id: unknown, ...args: unknown[]): void;
  disable: (id: unknown) => void;
  enable: (id: unknown) => void;
  defaultToOff: () => void;
  defaultToOn: () => void;
  isEnabled: (id: unknown) => boolean;
  isDisabled: (id: unknown) => boolean;
  bind: (id: unknown, isEnabled?: boolean) => (...args: unknown[]) => void;
};

// deprecated
/* istanbul ignore next */
function Log(id: unknown, ...args: unknown[]): void {
  if (
    (defaultToShow && !disabled.has(id)) ||
    (!defaultToShow && enabled.has(id))
  ) {
    // eslint-disable-next-line no-console
    console.log(...args);
  }
}

/* istanbul ignore next */
Log.disable = (id: unknown) => {
  disabled.add(id);
  enabled.delete(id);
};

/* istanbul ignore next */
Log.enable = (id: unknown) => {
  enabled.add(id);
  disabled.delete(id);
};

/* istanbul ignore next */
Log.defaultToOff = () => {
  defaultToShow = false;
};

/* istanbul ignore next */
Log.defaultToOn = () => {
  defaultToShow = true;
};

/* istanbul ignore next */
Log.isEnabled = (id: unknown): boolean => enabled.has(id);

/* istanbul ignore next */
Log.isDisabled = (id: unknown): boolean => disabled.has(id);

/* istanbul ignore next */
Log.bind = (
  id: unknown,
  isEnabled?: boolean,
): ((...args: unknown[]) => void) => {
  if (isEnabled) {
    Log.enable(id);
  } else {
    Log.disable(id);
  }
  return (...args: unknown[]) => Log(id, ...args);
};

// eslint-disable-next-line @typescript-eslint/naming-convention
export const Logger: LogType = Log;

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

export const MakeLogger: LogCreator = bindLogger('std');
export const MakeError: LogCreator = bindLogger('err');
