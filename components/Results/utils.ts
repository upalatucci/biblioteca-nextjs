export const removeBook = (routerPath: string, book: string): string => {
  return routerPath.replace(book, "");
};

export const removeRSNDParams = (routerPath: string) => {
  return routerPath.replace(/(recipient|from|to|place)=[\w\d\+]+&?/g, "");
};
