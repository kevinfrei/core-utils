"use strict";
// usage:
// const generator = require('SeqNum')('prefix');
// newSeqNum = generator();
// anotherSeqNum = generator();
Object.defineProperty(exports, "__esModule", { value: true });
function makeSeqNumGenerator(prefix, resume) {
    var pref = prefix || '';
    var pl = pref.length;
    var curId = 0;
    if (resume) {
        curId = parseInt(resume.substr(pl), 36);
        curId++;
    }
    var theFunc = function () { return pref + (curId++).toString(36); };
    theFunc.keyCompare = function (a, b) {
        var aPref = a.substr(0, pl);
        var bPref = b.substr(0, pl);
        if (aPref !== bPref) {
            return NaN;
        }
        var aVal = parseInt(a.substr(pl), 36);
        var bVal = parseInt(b.substr(pl), 36);
        return aVal - bVal;
    };
    return theFunc;
}
exports.default = makeSeqNumGenerator;
