export function getDate(date: string) {
  return new Date(date).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export const getQueryParamAsArray = <T>(
  queryParam: unknown | unknown[],
  defaultValue?: T
) => {
  return Array.isArray(queryParam) ? queryParam : [queryParam || defaultValue];
};

export const removeHTMLTags = (htmlString: string) =>
  htmlString.replace(/<[^>]*>?/gm, "");
