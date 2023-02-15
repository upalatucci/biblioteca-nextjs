import classNames from "classnames";
import Link from "next/link";
import { useRouter } from "next/router";
import { useCallback, FC } from "react";
import { UrlObject } from "url";
import { DEFAULT_ITEMS_PER_PAGE, usePage } from "./usePagination";

type PaginationProps = {
  totalResults: number;
  itemsPerPage?: number;
  anchorHash?: string;
};

const pageClassName =
  "border font-sans border-primary rounded-xl mx-1 px-3 text-sm";
const pageNumerDisabledClassName = "text-gray-300 !border-gray-300";

const Pagination: FC<PaginationProps> = ({
  totalResults = 1,
  itemsPerPage = DEFAULT_ITEMS_PER_PAGE,
  anchorHash
}) => {
  const page = usePage();
  const router = useRouter();
  const prevPage = page - 1;
  const prevPrevPage = page - 2;

  const totalPage = Math.ceil(totalResults / itemsPerPage);

  const nextPages =
    totalPage - page + 1 > 0
      ? Array(Math.min(totalPage - page + 1, 5))
          .fill(0)
          .map((_, i) => i + page)
      : [];

  const generateHref = useCallback(
    (pageNumber: number): UrlObject | string => {
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
    },
    [router.query, router.pathname]
  );

  return (
    <div className="flex items-center justify-center py-10">
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
            className={classNames(pageClassName, {
              [pageNumerDisabledClassName]: nextPage === page
            })}
          >
            {nextPage}
          </a>
        </Link>
      ))}
      <Link href={generateHref(totalPage === page ? page : page + 1)} passHref>
        <a
          aria-label="Pagina successiva"
          className={classNames(pageClassName, {
            [pageNumerDisabledClassName]: totalPage === page
          })}
        >
          {">"}
        </a>
      </Link>
    </div>
  );
};

export default Pagination;
