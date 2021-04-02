// usage:
// const generator = require('SeqNum')('prefix');
// newSeqNum = generator();
// anotherSeqNum = generator();

import type { SeqNumGenerator } from './index';

export function SeqNum(prefix?: string, resume?: string): SeqNumGenerator {
  const pref = prefix || '';
  const pl = pref.length;
  let curId = 0;
  if (resume) {
    curId = parseInt(resume.substr(pl), 36);
    curId++;
  }
  const theFunc = () => pref + (curId++).toString(36);
  theFunc.keyCompare = (a: string, b: string): number => {
    const aPref = a.substr(0, pl);
    const bPref = b.substr(0, pl);
    if (aPref !== bPref) {
      return NaN;
    }
    const aVal = parseInt(a.substr(pl), 36);
    const bVal = parseInt(b.substr(pl), 36);
    return aVal - bVal;
  };
  return theFunc;
}

export const MakeSeqNum = SeqNum;
