export type Searchable<T> = (str: string, substrs?: boolean) => Iterable<T>;

type TrieNode<T> = {
  character: string;
  children: TrieMap<T>;
  values: Set<T>;
};
type TrieMap<T> = Map<string, TrieNode<T>>;
type TrieTree<T> = [TrieMap<T>, TrieMap<T>];

const splitter = /[- .;:]/;

function makeNode<T>(character: string): TrieNode<T> {
  return {
    children: new Map<string, TrieNode<T>>(),
    values: new Set<T>(),
    character,
  };
}

function getOrMakeNode<T>(trieParent: TrieMap<T>, chr: string): TrieNode<T> {
  let maybeNode = trieParent.get(chr);
  if (!maybeNode) {
    maybeNode = makeNode<T>(chr);
    trieParent.set(chr, maybeNode);
  }
  return maybeNode;
}

/**
 * @function Add str[idx] to the trie for object o
 * @param  {number} idx - the index of the string to add
 * @param  {string} str - the string being indexed
 * @param  {T} o - the object corresponding to the string
 * @param  {TrieNode<T>} trie - the trie for 'idx' to be added to
 * @param  {boolean?} substr - if we should be adding substrings, too
 */
function addToIndex<T>(
  idx: number,
  str: string,
  o: T,
  trieParent: TrieMap<T>,
  substr?: boolean,
) {
  const chr = str[idx].toLocaleUpperCase();
  const node: TrieNode<T> = getOrMakeNode(trieParent, chr);
  if (substr || str.length === idx + 1) {
    // For a terminal, add the object
    node.values.add(o);
  }
  // If we haven't reached the end of the string, keep going
  if (idx + 1 < str.length) {
    addToIndex(idx + 1, str, o, node.children, substr);
  }
}

/**
 * AddToIndex takes a collection of T's, and a "getter" that will
 * return the string that you want to index for each T, and adds the object
 * string to the index provided
 * @param {TrieTree<T>} trieTree - The root of the trie node for string indexing
 * @param {Iterable<T>} objects - the collection of objects to index
 * @param {(arg:T)=>string} getter - accessor to get the indexable string for T
 */
function AddToIndex<T>(
  trieTree: TrieTree<T>,
  objects: Iterable<T>,
  getter: (arg: T) => string,
): void {
  for (const o of objects) {
    const name = getter(o);
    for (const str of name.split(splitter)) {
      // We have a string for the object 'o' that needs to be added to the trie
      // This makes an index for only whole words
      if (str.length) {
        addToIndex(0, str, o, trieTree[0]);
      }
      // This will make the "substrings also" index:
      for (let i = 1; i < str.length; i++) {
        addToIndex(i, str, o, trieTree[1], true);
      }
    }
  }
}

/**
 * MakeIndex takes a collection of T's, and a "getter" that will
 * return the string that you want to index for each T, and return a "root"
 * trie node for use with general text searching
 * @param  {Iterable<T>} objects - the collection of objects to index
 * @param  {(arg:T)=>string} getter - accessor to get the indexable string for T
 * @returns {TrieTree<T>} The root of the trie node for string indexing
 */
function MakeIndex<T>(
  objects: Iterable<T>,
  getter: (arg: T) => string,
): TrieTree<T> {
  const trieTree: TrieTree<T> = [
    new Map<string, TrieNode<T>>(),
    new Map<string, TrieNode<T>>(),
  ];
  if (objects && getter) {
    AddToIndex(trieTree, objects, getter);
  }
  return trieTree;
}

function SearchTrie<T>(str: string, trie: TrieMap<T>): Set<T> {
  let curMap: TrieMap<T> | null = trie;
  let theChild: TrieNode<T> | undefined;
  for (const c of str) {
    theChild = curMap.get(c.toUpperCase());
    if (theChild) {
      curMap = theChild.children;
    } else {
      break;
    }
  }
  if (theChild) {
    return theChild.values;
  }
  return new Set<T>();
}

function buildSearchable<T>(whole: TrieMap<T>, sub: TrieMap<T>): Searchable<T> {
  const searchFn = (str: string, substrs?: boolean): Iterable<T> => {
    // First, look in the whole-string index
    const wholeRes = SearchTrie(str, whole);
    if (!substrs) return wholeRes.values();
    const subRes = SearchTrie(str, sub);
    subRes.forEach((val: T) => wholeRes.add(val));
    return wholeRes.values();
  };
  return searchFn;
}

/**
 * This makes a searchable index of the collection of objects passed in,
 * given the string(s) returned by the getter
 * @param  {Iterable<T>} objects - The objects to search
 * @param  {(arg:T)=>string} getter - The string data that refers to the object
 * @returns {Searchable<T>} - a function that takes a string and an optional
 * boolean to indicate whether to search substrings or just whole strings
 */
export function MakeSearchable<T>(
  objects: Iterable<T>,
  getter: (arg: T) => string,
): Searchable<T> {
  const [whole, sub] = MakeIndex(objects, getter);
  return buildSearchable(whole, sub);
}
