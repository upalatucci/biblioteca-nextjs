import { createFuzzyIndex } from "@utils/fuzzySearch";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { GoshoType } from "./GoshoList";
import Fuse from "fuse.js";
import { useRouter } from "next/router";
import { ParsedUrlQuery } from "querystring";

export const ALL_LABEL = "Tutti";

const generateUniqueOptions = (jsonData: GoshoType[], key) => {
  const uniqueValues = new Set<string>();

  jsonData.forEach((post) => {
    if (Array.isArray(post[key])) {
      post[key].forEach((value) => uniqueValues.add(value));
      return;
    }

    uniqueValues.add(post[key]);
  });
  console.log(uniqueValues);

  return Array.from(uniqueValues);
};

export const useFilters = (allGosho: GoshoType[]) => {
  const router = useRouter();
  const recipientOptions = useMemo(
    () =>
      [ALL_LABEL].concat(generateUniqueOptions(allGosho, "recipient").sort()),
    [allGosho]
  );

  const placesOptions = useMemo(
    () => [ALL_LABEL].concat(generateUniqueOptions(allGosho, "place").sort()),
    [allGosho]
  );

  const titleFilter = (router.query.titleFilter as string) || "";

  const recipient = (router.query.recipient as string) || ALL_LABEL;

  const place = (router.query.place as string) || ALL_LABEL;

  const fuseRef = useRef<Fuse<GoshoType>>();

  useEffect(() => {
    fuseRef.current = createFuzzyIndex<GoshoType>(allGosho);
  }, [allGosho]);

  const clearFilters = () =>
    router.push(
      {
        pathname: router.pathname,
        query: {},
        hash: "gosho-list",
      },
      undefined,
      { scroll: false, shallow: true }
    );

  const goshoFilteredByTitle =
    !titleFilter || !fuseRef.current
      ? allGosho
      : fuseRef.current?.search(titleFilter).map((result) => result.item);

  const filteredGosho = goshoFilteredByTitle.filter((gosho) => {
    if (
      recipient &&
      recipient !== ALL_LABEL &&
      !gosho.recipient.includes(recipient)
    ) {
      return false;
    }

    if (place && place !== ALL_LABEL && gosho.place !== place) {
      return false;
    }

    return true;
  });

  const setRouterState = useCallback(
    (key: string, value: string, replace?: boolean) => {
      const query = new URLSearchParams(window.location.search);
      query.set(key, value);

      const newQuery: ParsedUrlQuery = {};

      for (const [key, value] of query) {
        newQuery[key] = value;
      }

      if (newQuery.page) {
        delete newQuery.page;
      }

      const routerOptions = { scroll: false, shallow: true };
      const routerParams = {
        pathname: router.pathname,
        query: newQuery,
        hash: "gosho-list",
      };

      if (replace) {
        router.replace(routerParams, undefined, routerOptions);
        return;
      }

      router.push(routerParams, undefined, routerOptions);
    },
    [router.pathname]
  );

  const setTitleFilter = useCallback(
    (newValue) => {
      setRouterState("titleFilter", newValue, !!router.query.titleFilter);
    },
    [setRouterState, router.query.titleFilter]
  );

  const setRecipient = useCallback(
    (newValue) => {
      setRouterState("recipient", newValue);
    },
    [setRouterState]
  );

  const setPlace = useCallback(
    (newValue) => {
      setRouterState("place", newValue);
    },
    [setRouterState]
  );

  return {
    titleFilter,
    setTitleFilter,
    recipient,
    setRecipient,
    place,
    setPlace,
    clearFilters,
    filteredGosho,
    recipientOptions,
    placesOptions,
  };
};

type FIELDS = keyof GoshoType;

export type UseOrderType = {
  sortedGosho: GoshoType[];
  sortField: FIELDS;
  sortAscend: boolean;
  onSortChange: (fieldToSort: FIELDS, ascendent: boolean) => void;
};

export const useOrder = (allGosho: GoshoType[]): UseOrderType => {
  const [sortField, setSortField] = useState<FIELDS | undefined>("number");
  const [sortAscend, setSortAscend] = useState(true);

  const onSortChange = useCallback(
    (fieldToSort: FIELDS, ascendent: boolean) => {
      setSortField(fieldToSort);
      setSortAscend(ascendent);
    },
    []
  );

  const sortedGosho = sortField
    ? allGosho.sort((a, b) => {
        if (a[sortField] && b[sortField] && typeof a[sortField] === "number") {
          return (a[sortField] as number) - (b[sortField] as number);
        }

        const aField = Array.isArray(a[sortField])
          ? a[sortField]?.[0]
          : a[sortField];
        const bField = Array.isArray(b[sortField])
          ? b[sortField]?.[0]
          : b[sortField];

        return aField?.toString()?.toUpperCase() >
          bField?.toString()?.toUpperCase()
          ? 1
          : -1;
      })
    : allGosho;

  return {
    sortedGosho: sortAscend ? sortedGosho : sortedGosho.reverse(),
    sortField,
    sortAscend,
    onSortChange,
  };
};
