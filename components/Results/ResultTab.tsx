import classNames from "classnames";
import Link from "next/link";
import { NextRouter, useRouter } from "next/router";
import { Url } from "url";
// import { removeRSNDParams } from "./utils";

type ResultTabProps = {
  count: number;
  title: string;
  active?: boolean;
  tabKey?: string;
  loading?: boolean;
};

const createTabURL = (router: NextRouter, tabKey?: string): Partial<Url> => {
  const newQuery = { ...router.query };

  delete newQuery.page;
  delete newQuery.recipient;
  delete newQuery.from;
  delete newQuery.to;
  delete newQuery.place;
  delete newQuery.book;

  if (tabKey) newQuery.book = tabKey;

  const advancedSearch = router.pathname.match("ricerca-avanzata");

  if (tabKey) {
    return {
      pathname: advancedSearch ? "/ricerca-avanzata/[book]" : "/ricerca/[book]",
      query: newQuery,
      hash: "risultati",
    };
  }

  return {
    pathname: advancedSearch ? "/ricerca-avanzata" : "/ricerca",
    query: newQuery,
    hash: "risultati",
  };
};

const CountLoading = ({ loading, count }) =>
  loading ? (
    <span className="animate-pulse  bg-slate-200">
      ({<span className="h-2 px-1" />})
    </span>
  ) : (
    <span>({count})</span>
  );

const selectedTabClass =
  "font-bold text-black !bg-white border border-gray-200  border-b-0 relative top-[0.5px]";

const baseTabClass =
  "transition-none rounded-t-3xl text-sm md:text-lg inline-block py-4 px-5 tab-mobile";

const ResultTab: React.FC<ResultTabProps> = ({
  count,
  title,
  active,
  tabKey,
  loading,
}) => {
  const router = useRouter();

  if (count === 0) {
    return (
      <li className="mr-2 min-w-80 whitespace-pre">
        <a
          aria-current="page"
          className={classNames(baseTabClass, "cursor-not-allowed")}
        >
          {title} <CountLoading loading={loading} count={count} />
        </a>
      </li>
    );
  }

  return (
    <li className="mr-2 min-w-80 whitespace-pre">
      <Link
        href={createTabURL(router, tabKey)}
        scroll={false}
        aria-current="page"
        className={classNames(baseTabClass, {
          [selectedTabClass]: active,
        })}
      >
        {title} <CountLoading loading={loading} count={count} />
      </Link>
    </li>
  );
};

export default ResultTab;
