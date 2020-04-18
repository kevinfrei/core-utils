function SetEqual(s1, s2) {
  if (s1.size !== s2.size) {
    return false;
  }

  for (let i of s1) {
    if (!s2.has(i)) {
      return false;
    }
  }

  return true;
}

function ArraySetEqual(a1, a2) {
  if (a1 === undefined && a2 === undefined || a1 === null && a2 === null) {
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

module.exports = {
  SetEqual,
  ArraySetEqual
};
//# sourceMappingURL=Comparisons.js.map