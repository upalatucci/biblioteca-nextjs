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

  const [titleFilter, setTitleFilter] = useState(
    (router.query.titleFilter as string) || ""
  );
  const [recipient, setRecipient] = useState<string>(
    (router.query.recipient as string) || ALL_LABEL
  );
  const [place, setPlace] = useState<string>(
    (router.query.place as string) || ALL_LABEL
  );

  const fuseRef = useRef<Fuse<GoshoType>>();

  useEffect(() => {
    fuseRef.current = createFuzzyIndex<GoshoType>(allGosho);
  }, [allGosho]);

  const clearFilters = useCallback(() => {
    setTitleFilter("");
    setRecipient(ALL_LABEL);
    setPlace(ALL_LABEL);
  }, []);

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

  useEffect(() => {
    const newQuery: ParsedUrlQuery = {
      ...router.query,
      place,
      recipient,
      titleFilter,
    };
    if (router.query.page) {
      delete newQuery.page;
    }

    router.push(
      {
        ...router,
        query: newQuery,
        hash: "gosho-list",
      },
      undefined,
      { scroll: false }
    );
  }, [place, recipient, titleFilter]);

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
    ? allGosho.sort((a, b) => (a[sortField] > b[sortField] ? 1 : -1))
    : allGosho;

  return {
    sortedGosho: sortAscend ? sortedGosho : sortedGosho.reverse(),
    sortField,
    sortAscend,
    onSortChange,
  };
};
