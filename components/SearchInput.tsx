import { SearchResponse } from "@elastic/elasticsearch/lib/api/typesWithBodyKey";
import classNames from "classnames";
import {
  ChangeEventHandler,
  FC,
  KeyboardEventHandler,
  MouseEventHandler,
  useCallback,
  useMemo,
  useRef,
  useState,
} from "react";
import { useQuery } from "react-query";

type SearchInputProps = {
  value: string;
  onChange: (text: string) => void;
  placeholder?: string;
  className?: string;
  required?: boolean;
  "aria-label"?: string;
  withSuggestions?: boolean;
};

const SearchInput: FC<SearchInputProps> = ({
  value,
  onChange,
  placeholder,
  className,
  "aria-label": ariaLabel,
  required = false,
  withSuggestions = false,
}) => {
  const [searchText, setSearchText] = useState("");
  const inputRef = useRef<HTMLInputElement>();
  const listSuggestionRef = useRef<HTMLUListElement>();
  const [suggestionFocusIndex, setSuggestionFocusIndex] = useState<
    number | null
  >(null);
  const [suggestionVisible, setSuggestionVisible] = useState(true);

  const onType: ChangeEventHandler<HTMLInputElement> = (event) => {
    onChange(event.currentTarget.value);
    if (event.currentTarget.value.endsWith(" ")) return;

    const words = event.currentTarget.value?.split(" ");
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

  const useSuggestion: MouseEventHandler<HTMLButtonElement> = useCallback(
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
    [suggestions, suggestionFocusIndex]
  );

  const showSuggestionDropDown =
    suggestionVisible &&
    (suggestions?.length > 0 || isLoading) &&
    withSuggestions;

  return (
    <div
      className={classNames(
        "w-full md:max-w-[50%] input-container relative",
        className
      )}
      onKeyDown={onKeyDown}
    >
      <input
        type="search"
        className="border border-primary h-[42px] w-full pl-4 pr-8 py-1 rounded-3xl bg-white placeholder:text-gray-500 text-md lg:text-lg font-sans"
        placeholder={placeholder || "Inserisci la parola o frase..."}
        value={value || ""}
        onChange={onType}
        required={required}
        aria-label={ariaLabel}
        ref={inputRef}
      />
      <span className="input-search-icon"></span>
      {showSuggestionDropDown && (
        <>
          <div
            className="fixed inset-0 w-full h-full z-10"
            onClick={() => setSuggestionVisible(false)}
          ></div>
          <ul
            className="suggestions absolute top-8 right-10 left-2 bg-white py-2 shadow-md rounded-b-3xl z-20"
            ref={listSuggestionRef}
          >
            {suggestions.map((suggestion) => (
              <li
                key={suggestion}
                id={`suggestion-${suggestion}`}
                tabIndex={-1}
              >
                <button
                  type="button"
                  onClick={(e) => useSuggestion(e)}
                  className="py-2 px-4 focus:bg-defaultBg rounded-3xl w-full text-left"
                >
                  {suggestion}
                </button>
              </li>
            ))}
            {isLoading && (
              <li className="py-2 px-4 w-full text-left">
                <span className="animate-pulse">Caricamento...</span>
              </li>
            )}
          </ul>
        </>
      )}
    </div>
  );
};

export default SearchInput;
