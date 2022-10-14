import { createFuzzyIndex } from "@utils/fuzzySearch";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { GoshoType } from "./GoshoList";
import Fuse from "fuse.js";

const generateUniqueOptions = (jsonData: GoshoType[], key) => {
  const options = [{ value: 0, label: "Tutti" }];
  const uniqueValues = new Set<string>(jsonData.map((post) => post[key]));

  uniqueValues.forEach((value) => {
    if (value)
      options.push({
        value: options.length,
        label: value,
      });
  });

  return options;
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
  const [recipient, setRecipient] = useState<string | number>(
    recipientOptions[0].value
  );
  const [place, setPlace] = useState<string | number>(placesOptions[0].value);

  const fuseRef = useRef<Fuse<GoshoType>>();

  useEffect(() => {
    fuseRef.current = createFuzzyIndex<GoshoType>(allGosho);
  }, [allGosho]);

  const clearFilters = useCallback(() => {
    setTitleFilter("");
    setRecipient(recipientOptions[0].value);
    setPlace(placesOptions[0].value);
  }, []);

  const goshoFilteredByTitle =
    !titleFilter || !fuseRef.current
      ? allGosho
      : fuseRef.current?.search(titleFilter).map((result) => result.item);

  const filteredGosho = goshoFilteredByTitle.filter((gosho) => {
    if (recipient && gosho.recipient !== recipientOptions[recipient].label) {
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

export const useOrder = (allGosho: GoshoType[]) => {
  const [sortField, setSortField] = useState<FIELDS>("number");
  const [sortAscend, setSortAscend] = useState(true);

  const sortedGosho = allGosho.sort((a, b) =>
    a[sortField] > b[sortField] ? 1 : -1
  );

  const onSortChange = useCallback((fieldToSort, ascendent) => {
    setSortField(fieldToSort);
    setSortAscend(ascendent);
  }, []);

  return {
    sortedGosho: sortAscend ? sortedGosho : sortedGosho.reverse(),
    sortField,
    sortAscend,
    onSortChange,
  };
};
