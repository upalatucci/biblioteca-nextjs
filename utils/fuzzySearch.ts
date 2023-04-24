import Fuse from "fuse.js";

export const createFuzzyIndex = <T>(data, searchKeys = ["title"]) =>
  new Fuse<T>(data, {
    keys: searchKeys,
    shouldSort: true,
    threshold: 0.3,
    ignoreLocation: true,
    includeMatches: true,
    includeScore: true,
    minMatchCharLength: 3,
    findAllMatches: true,
  });

export const highlight = <T extends object>(
  fuseSearchResult: Fuse.FuseResult<T>[]
) => {
  const set = (obj: object, path: string, value: string) => {
    const pathValue = path.split(".");
    let i;

    for (i = 0; i < pathValue.length - 1; i++) {
      obj = obj[pathValue[i]];
    }

    obj[pathValue[i]] = value;
  };

  const generateHighlightedText = (
    inputText: string,
    regions: readonly Fuse.RangeTuple[] = []
  ) => {
    let content = "";
    let nextUnhighlightedRegionStartingIndex = 0;

    regions.forEach((region) => {
      const lastRegionNextIndex = region[1] + 1;

      content += [
        inputText.substring(nextUnhighlightedRegionStartingIndex, region[0]),
        `<mark>`,
        inputText.substring(region[0], lastRegionNextIndex),
        "</mark>",
      ].join("");

      nextUnhighlightedRegionStartingIndex = lastRegionNextIndex;
    });

    content += inputText.substring(nextUnhighlightedRegionStartingIndex);

    return content;
  };

  console.log(fuseSearchResult);
  return fuseSearchResult
    .filter(({ matches }) => matches && matches.length)
    .map(({ item, matches }) => {
      const highlightedItem = { ...item };

      matches.forEach((match) => {
        set(
          highlightedItem,
          match.key,
          generateHighlightedText(match.value, match.indices)
        );
      });

      return highlightedItem;
    });
};
