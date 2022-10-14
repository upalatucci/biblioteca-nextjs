import Fuse from "fuse.js";

export const createFuzzyIndex = <T>(data, searchKeys = ["title"]) =>
  new Fuse<T>(data, {
    keys: searchKeys,
    shouldSort: true,
    threshold: 0.3,
    ignoreLocation: true,
  });
