import { useRouter } from "next/router";

type usePaginationType = <T>(data: T[], itemsPerPage?: number) => T[];

export const DEFAULT_ITEMS_PER_PAGE = 20;

export const usePage = () => {
  const router = useRouter();

  const pageQuery = parseInt(
    Array.isArray(router?.query?.page)
      ? router?.query?.page[0]
      : router?.query?.page
  );

  return pageQuery && !isNaN(pageQuery) ? pageQuery : 1;
};

export const usePagination: usePaginationType = (
  data,
  itemsPerPage = DEFAULT_ITEMS_PER_PAGE
) => {
  const page = usePage();

  return data?.slice(itemsPerPage * (page - 1), itemsPerPage * page) || [];
};
