const disabled: Set<unknown> = new Set();
const enabled: Set<unknown> = new Set();

let defaultToShow = true;

export type LogType = {
  (id: unknown, ...args: unknown[]): void;
  disable: (id: unknown) => void;
  enable: (id: unknown) => void;
  defaultToOff: () => void;
  defaultToOn: () => void;
  isEnabled: (id: unknown) => boolean;
  isDisabled: (id: unknown) => boolean;
  bind: (id: unknown, enable?: boolean) => (...args: unknown[]) => void;
};

function Log(id: unknown, ...args: unknown[]): void {
  if (
    (defaultToShow && !disabled.has(id)) ||
    (!defaultToShow && enabled.has(id))
  ) {
    // eslint-disable-next-line no-console
    console.log(...args);
  }
}

Log.disable = (id: unknown) => {
  disabled.add(id);
  enabled.delete(id);
};

Log.enable = (id: unknown) => {
  enabled.add(id);
  disabled.delete(id);
};

Log.defaultToOff = () => {
  defaultToShow = false;
};

Log.defaultToOn = () => {
  defaultToShow = true;
};

Log.isEnabled = (id: unknown): boolean => enabled.has(id);

Log.isDisabled = (id: unknown): boolean => disabled.has(id);

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