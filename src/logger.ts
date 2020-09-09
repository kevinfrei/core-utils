const disabled: Set<unknown> = new Set();
const enabled: Set<unknown> = new Set();

let defaultToShow = true;

export type logType = {
  (id: unknown, ...args: unknown[]): void;
  disable: (id: unknown) => void;
  enable: (id: unknown) => void;
  defaultToOff: () => void;
  defaultToOn: () => void;
  isEnabled: (id: unknown) => boolean;
  isDisabled: (id: unknown) => boolean;
  bind: (id: unknown, enabled?: boolean) => (...args: unknown[]) => void;
};

export default function log(id: unknown, ...args: unknown[]) {
  if (
    (defaultToShow && !disabled.has(id)) ||
    (!defaultToShow && enabled.has(id))
  ) {
    // tslint:disable-next-line
    console.log(...args);
  }
}

log.disable = (id: unknown) => {
  disabled.add(id);
  enabled.delete(id);
};

log.enable = (id: unknown) => {
  enabled.add(id);
  disabled.delete(id);
};

log.defaultToOff = () => {
  defaultToShow = false;
};

log.defaultToOn = () => {
  defaultToShow = true;
};

log.isEnabled = (id: unknown): boolean => enabled.has(id);

log.isDisabled = (id: unknown): boolean => disabled.has(id);

log.bind = (
  id: unknown,
  isEnabled?: boolean,
): ((...args: unknown[]) => void) => {
  const boundLogger = (...args: unknown[]) => log(id, ...args);
  if (isEnabled) {
    log.enable(id);
  } else {
    log.disable(id);
  }
  return boundLogger;
};
