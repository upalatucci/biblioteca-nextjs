import { NextRouter } from "next/router";
import { Url } from "url";

export const getTabUrl = (router: NextRouter, book?: string): Partial<Url> => {
  const newQuery = { ...router.query };

  if (!book) delete newQuery.book;
  else newQuery.book = book;

  return {
    pathname: "/glossario",
    query: newQuery,
    hash: "risultati",
  };
};
