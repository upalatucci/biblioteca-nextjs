import { FC } from "react";
import useSuggestions from "./useSuggestions";

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
  className = "",
  "aria-label": ariaLabel,
  required = false,
  withSuggestions = false,
}) => {
  const {
    inputRef,
    listSuggestionRef,
    onType,
    onKeyDown,
    showSuggestionDropDown,
    suggestions,
    onSuggestionClick,
    hideSuggestions,
    isLoading,
  } = useSuggestions({ onChange, value, withSuggestions });

  return (
    <div
      className={`${className} w-full md:max-w-[50%] input-container relative`}
      onKeyDown={onKeyDown}
    >
      <input
        type="search"
        className="border border-primary h-[42px] w-full pr-4 pl-10 py-1 rounded-3xl bg-white placeholder:text-gray-500 text-md lg:text-lg font-sans"
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
            onClick={hideSuggestions}
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
                  onClick={onSuggestionClick}
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
