import { SearchResponse } from "@elastic/elasticsearch/lib/api/typesWithBodyKey";
import {
  ChangeEventHandler,
  KeyboardEventHandler,
  MouseEventHandler,
  useCallback,
  useMemo,
  useRef,
  useState,
} from "react";
import { useQuery } from "react-query";

type UseSuggestionInputType = {
  withSuggestions: boolean;
  value: string;
  onChange: (text: string) => void;
};

const useSuggestions = ({
  withSuggestions,
  value,
  onChange,
}: UseSuggestionInputType) => {
  const inputRef = useRef<HTMLInputElement>();
  const listSuggestionRef = useRef<HTMLUListElement>();
  const [searchText, setSearchText] = useState("");
  const [suggestionFocusIndex, setSuggestionFocusIndex] = useState<
    number | null
  >(null);
  const [suggestionVisible, setSuggestionVisible] = useState(true);
  const onType: ChangeEventHandler<HTMLInputElement> = (event) => {
    onChange(event.currentTarget.value);
    if (event.currentTarget.value.endsWith(" ")) return;

    const words = event.currentTarget.value?.split(" ");

    if (!words) return;

    setSearchText(words.at(-1));
    setSuggestionFocusIndex(null);
    setSuggestionVisible(true);

    inputRef.current?.focus();
  };

  const { data, isLoading } = useQuery<
    SearchResponse<{ post_title?: string }>,
    Error
  >(
    ["search", searchText],
    () => fetch("/api/suggestion?term=" + searchText).then((res) => res.json()),
    {
      enabled: searchText.length > 2 && withSuggestions,
    }
  );

  const onSuggestionClick: MouseEventHandler<HTMLButtonElement> = useCallback(
    (event) => {
      if (!value) return;
      const words = value.split(" ");

      const newSearch =
        words.slice(0, words.length - 1).join(" ") +
        " " +
        event?.currentTarget?.innerText;

      setSearchText("");
      onChange(newSearch);
      setSuggestionFocusIndex(null);
      if (inputRef.current) inputRef.current.focus();
    },
    [value, suggestionFocusIndex]
  );

  const suggestions = useMemo(
    () => [
      ...new Set(data?.hits?.hits?.map((s) => s._source?.post_title) || []),
    ],
    [data]
  );

  const onKeyDown: KeyboardEventHandler<HTMLDivElement> = useCallback(
    (event) => {
      const suggestions = listSuggestionRef.current?.querySelectorAll(
        "li > button"
      ) as NodeListOf<HTMLButtonElement>;

      if (event.key === "Enter" && suggestionFocusIndex === null) {
        setSuggestionVisible(false);
        return;
      }

      if (event.key === "Escape" && suggestionVisible) {
        event.preventDefault();
        setSuggestionVisible(false);
        return;
      }

      if (event.key === "ArrowDown" && suggestions) {
        event.preventDefault();
        const nextFocusIndex =
          suggestionFocusIndex !== null
            ? (suggestionFocusIndex + 1) % suggestions.length
            : 0;

        suggestions?.[nextFocusIndex]?.focus();
        setSuggestionFocusIndex(nextFocusIndex);
      } else if (event.key === "ArrowUp" && suggestions) {
        event.preventDefault();
        console.log(suggestionFocusIndex);

        if (!suggestionFocusIndex) {
          inputRef.current?.focus();
          setSuggestionFocusIndex(null);
          return;
        }

        const prevFocusIndex =
          !suggestionFocusIndex || suggestionFocusIndex <= 0
            ? suggestions.length - 1
            : (suggestionFocusIndex - 1) % suggestions.length;

        suggestions?.[prevFocusIndex]?.focus();
        setSuggestionFocusIndex(prevFocusIndex);
      }
    },
    [suggestions, suggestionVisible, suggestionFocusIndex]
  );

  const hideSuggestions = useCallback(() => {
    setSuggestionVisible(false);
  }, []);

  const showSuggestionDropDown =
    suggestionVisible &&
    (suggestions?.length > 0 || isLoading) &&
    withSuggestions;

  return {
    inputRef,
    listSuggestionRef,
    onType,
    onKeyDown,
    showSuggestionDropDown,
    suggestions,
    onSuggestionClick,
    isLoading,
    hideSuggestions,
  };
};

export default useSuggestions;
