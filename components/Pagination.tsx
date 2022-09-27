import classNames from "classnames";
import Link from "next/link";
import { useRouter } from "next/router";
import * as React from "react";
import { UrlObject } from "url";

type PaginationProps = {
  totalResults: number;
  array: any[];
  renderer: (item: any, index: number) => React.ReactNode;
  itemsPerPage?: number;
  anchorHash?: string;
  arrayStatic?: boolean;
};

const pageClassName =
  "border font-sans border-secondary rounded-xl mx-1 px-3 text-sm";
const pageNumerDisabledClassName = "text-gray-300 border-gray-300";

export const DEFAULT_ITEMS_PER_PAGE = 20;

const Pagination: React.FC<PaginationProps> = ({
  array,
  totalResults = 1,
  renderer,
  itemsPerPage = DEFAULT_ITEMS_PER_PAGE,
  anchorHash,
  arrayStatic = true
}) => {
  const router = useRouter();

  const pageQuery = parseInt(
    Array.isArray(router?.query?.page)
      ? router?.query?.page[0]
      : router?.query?.page
  );

  const page = pageQuery && !isNaN(pageQuery) ? pageQuery : 1;

  const prevPage = page - 1;
  const prevPrevPage = page - 2;

  const totalPage = Math.ceil(totalResults / itemsPerPage);

  const nextPages = Array(Math.min(totalPage - page + 1, 5))
    .fill(0)
    .map((_, i) => i + page);

  const generateHref = (pageNumber: number): UrlObject | string => {
    if (pageNumber <= 0) return "";

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { page, ...otherQuery } = router.query;

    return {
      pathname: router.pathname,
      query: {
        ...otherQuery,
        page: pageNumber.toString()
      },
      hash: anchorHash
    };
  };

  const items = arrayStatic
    ? array.slice(itemsPerPage * (page - 1), itemsPerPage * page)
    : array;

  return (
    <>
      {items.map((item, index) =>
        renderer(item, itemsPerPage * (page - 1) + index)
      )}
      <div className="flex items-center justify-center pt-10">
        <Link href={generateHref(page - 1)} passHref>
          <a
            aria-label="Pagina precedente"
            className={classNames(pageClassName, {
              [pageNumerDisabledClassName]: page === 1
            })}
          >
            {"<"}
          </a>
        </Link>
        {prevPrevPage > 0 && (
          <Link href={generateHref(prevPrevPage)} passHref>
            <a aria-label={`Pagina ${prevPrevPage}`} className={pageClassName}>
              {prevPrevPage}
            </a>
          </Link>
        )}
        {prevPage > 0 && (
          <Link href={generateHref(prevPage)} passHref>
            <a aria-label={`Pagina ${prevPage}`} className={pageClassName}>
              {prevPage}
            </a>
          </Link>
        )}

        {nextPages.map((nextPage) => (
          <Link key={nextPage} href={generateHref(nextPage)} passHref>
            <a
              aria-label={`Pagina ${prevPrevPage}`}
              className={classNames(
                { [pageNumerDisabledClassName]: nextPage === page },
                pageClassName
              )}
            >
              {nextPage}
            </a>
          </Link>
        ))}
        <Link
          href={generateHref(totalPage === page ? page : page + 1)}
          passHref
        >
          <a
            aria-label="Pagina successiva"
            className={classNames(
              { [pageNumerDisabledClassName]: totalPage === page },
              pageClassName
            )}
          >
            {">"}
          </a>
        </Link>
      </div>
    </>
  );
};

export default Pagination;
