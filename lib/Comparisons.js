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
exports.StringCaseInsensitiveEqual = exports.ArraySetEqual = exports.SetEqual = void 0;
function SetEqual(s1, s2) {
    var e_1, _a;
    if (s1.size !== s2.size) {
        return false;
    }
    try {
        for (var s1_1 = __values(s1), s1_1_1 = s1_1.next(); !s1_1_1.done; s1_1_1 = s1_1.next()) {
            var i = s1_1_1.value;
            if (!s2.has(i)) {
                return false;
            }
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (s1_1_1 && !s1_1_1.done && (_a = s1_1.return)) _a.call(s1_1);
        }
        finally { if (e_1) throw e_1.error; }
    }
    return true;
}
exports.SetEqual = SetEqual;
function ArraySetEqual(a1, a2) {
    if ((a1 === undefined && a2 === undefined) || (a1 === null && a2 === null)) {
        return true;
    }
    if (!a1 || !a2) {
        return false;
    }
    if (a1.length !== a2.length) {
        return false;
    }
    return SetEqual(new Set(a1), new Set(a2));
}
exports.ArraySetEqual = ArraySetEqual;
function StringCaseInsensitiveEqual(s1, s2) {
    if ((s1 && !s2) || (!s1 && s2)) {
        return false;
    }
    if (!s1 && !s2) {
        return s1 === s2;
    }
    return s1.toLocaleUpperCase() === s2.toLocaleUpperCase();
}
exports.StringCaseInsensitiveEqual = StringCaseInsensitiveEqual;
