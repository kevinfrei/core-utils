"use strict";
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isFunction = exports.isNumber = exports.isString = exports.isArray = exports.prefixObj = exports.reQuote = exports.deQuote = void 0;
exports.deQuote = function (str) { return str.replace(/\"/g, '~!~'); };
function reQuote(str) {
    var res = str.replace(/\\/g, '\\\\');
    res = res.replace(/\"/g, '\\"');
    res = res.replace(/~!~/g, '"');
    return JSON.parse(res);
}
exports.reQuote = reQuote;
function prefixObj(str, obj) {
    var e_1, _a;
    var res = [];
    try {
        for (var _b = __values(Object.keys(obj)), _c = _b.next(); !_c.done; _c = _b.next()) {
            var elem = _c.value;
            res.push(str + elem);
            if (obj[elem] !== null) {
                res.push(obj[elem]);
            }
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
        }
        finally { if (e_1) throw e_1.error; }
    }
    return res;
}
exports.prefixObj = prefixObj;
exports.isArray = function (obj) { return Array.isArray(obj); };
function isString(obj) {
    return obj !== null && obj !== undefined && typeof obj === 'string';
}
exports.isString = isString;
function isNumber(obj) {
    return typeof obj === 'number' && !isNaN(obj - 0);
}
exports.isNumber = isNumber;
function isFunction(obj) {
    return ((obj !== null &&
        typeof obj === 'object' &&
        obj.hasOwnProperty('constructor') &&
        obj.hasOwnProperty('call') &&
        obj.hasOwnProperty('apply')) ||
        typeof obj === 'function');
}
exports.isFunction = isFunction;
