import classNames from "classnames";
import Link from "next/link";
import { NextRouter, useRouter } from "next/router";
import { removeRSNDParams } from "./utils";

type ResultTabProps = {
  count: number;
  title: string;
  active?: boolean;
  tabKey?: string;
  loading?: boolean;
};

const createTabURL = (router: NextRouter, tabKey) => {
  const basePath = router.pathname.replace("/[book]", "");
  const stringToReplace = tabKey ? `${basePath}/${tabKey}?` : `${basePath}?`;

  return removeRSNDParams(router.asPath)
    .replace(/\/ricerca(-avanzata)?(\/)?.*\?/, stringToReplace)
    .replace(/&?page=\d+/, "");
};

const CountLoading = ({ loading, count }) =>
  loading ? (
    <span className="animate-pulse  bg-slate-200">
      ({<span className="h-2 px-1" />})
    </span>
  ) : (
    <span>({count})</span>
  );

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
      <li className="mr-2">
        <a
          aria-current="page"
          className={classNames(
            "inline-block p-4  bg-gray-100 rounded-t-lg active dark:bg-gray-800 dark:text-blue-500 text-gray-400 cursor-not-allowed"
          )}
        >
          {title} <CountLoading loading={loading} count={count} />
        </a>
      </li>
    );
  }

  return (
    <li className="mr-2">
      <Link href={createTabURL(router, tabKey)}>
        <a
          aria-current="page"
          className={classNames(
            "inline-block p-4  bg-gray-100 rounded-t-lg active dark:bg-gray-800 dark:text-blue-500",
            { "text-blue-600": active }
          )}
        >
          {title} <CountLoading loading={loading} count={count} />
        </a>
      </Link>
    </li>
  );
};

export default ResultTab;
