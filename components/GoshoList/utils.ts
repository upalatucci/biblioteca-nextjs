import { createFuzzyIndex } from "@utils/fuzzySearch";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { GoshoType } from "./GoshoList";
import Fuse from "fuse.js";

export const ALL_LABEL = "Tutti";

const generateUniqueOptions = (jsonData: GoshoType[], key) => {
  const uniqueValues = new Set<string>();

  jsonData.forEach((post) => {
    if (Array.isArray(post[key])) {
      post[key].forEach((value) => uniqueValues.add(value));
    }
    uniqueValues.add(post[key]);
  });

  return Array.from(uniqueValues);
};

export const useFilters = (allGosho: GoshoType[]) => {
  const recipientOptions = useMemo(
    () => generateUniqueOptions(allGosho, "recipient"),
    [allGosho]
  );

  const placesOptions = useMemo(
    () => generateUniqueOptions(allGosho, "place"),
    [allGosho]
  );

  const [titleFilter, setTitleFilter] = useState("");
  const [recipient, setRecipient] = useState<string>(ALL_LABEL);
  const [place, setPlace] = useState<string>(ALL_LABEL);

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
      !gosho.recipient.includes(recipientOptions[recipient].label)
    ) {
      return false;
    }

    if (place && gosho.place !== placesOptions[place].label) {
      return false;
    }

    return true;
  });

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
