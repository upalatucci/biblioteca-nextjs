import classNames from "classnames";
import Link from "next/link";
import { NextRouter, useRouter } from "next/router";

type ResultTabProps = {
  count: number;
  title: string;
  active?: boolean;
  tabKey?: string;
};

const createTabURL = (router: NextRouter, tabKey) => {
  const basePath = router.pathname.replace("/[book]", "");
  const stringToReplace = tabKey ? `${basePath}/${tabKey}?` : `${basePath}?`;

  return router.asPath
    .replace(/\/ricerca(-avanzata)?(\/)?.*\?/, stringToReplace)
    .replace(/&?page=\d+/, "");
};

const ResultTab: React.FC<ResultTabProps> = ({
  count,
  title,
  active,
  tabKey,
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
          {title} ({count})
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
          {title} ({count})
        </a>
      </Link>
    </li>
  );
};

export default ResultTab;
