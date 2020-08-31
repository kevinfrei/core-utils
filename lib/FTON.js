"use strict";
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.arrayOfStrings = exports.stringify = exports.parse = exports.typecheck = void 0;
function typecheck(x) {
    if (x === null ||
        typeof x === 'string' ||
        typeof x === 'number' ||
        typeof x === 'boolean') {
        return x;
    }
    if (x === undefined) {
        return null;
    }
    if (Array.isArray(x)) {
        return x.map(typecheck);
    }
    if (typeof x === 'object') {
        if (x instanceof Map || x instanceof Set) {
            return x;
        }
        var o = {};
        for (var k in x) {
            if (x.hasOwnProperty(k)) {
                o[k] = typecheck(x[k]);
            }
        }
        return o;
    }
    throw new Error('Invalid FTON');
}
exports.typecheck = typecheck;
function replacer(key, value) {
    // @ts-ignore
    var originalObject = this[key];
    if (originalObject instanceof Map) {
        return {
            dataType: 'Map',
            dataValue: __spread(originalObject),
        };
    }
    else if (originalObject instanceof Set) {
        return {
            dataType: 'Set',
            dataValue: __spread(originalObject),
        };
    }
    else {
        return value;
    }
}
function reviver(key, value) {
    if (typeof value !== 'object' || value === null || value === undefined)
        return value;
    if ('dataValue' in value && 'dataType' in value) {
        var filt = value;
        var val = filt.dataValue;
        if (!Array.isArray(val))
            return value;
        if (!('dataType' in value))
            return value;
        var type = filt.dataType;
        if (type === 'Map')
            return new Map(val);
        if (type === 'Set')
            return new Set(val);
    }
    return value;
}
function parse(input) {
    return typecheck(JSON.parse(input, reviver));
}
exports.parse = parse;
function stringify(input) {
    return JSON.stringify(input, replacer);
}
exports.stringify = stringify;
function arrayOfStrings(input) {
    if (input && Array.isArray(input)) {
        return input.filter(function (elem) { return typeof elem === 'string'; });
    }
}
exports.arrayOfStrings = arrayOfStrings;
