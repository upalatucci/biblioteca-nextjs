import classNames from "classnames";
import { ChangeEventHandler, FC } from "react";

type SearchInputProps = {
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  placeholder?: string;
  className?: string;
  required?: boolean;
  "aria-label"?: string;
};

const SearchInput: FC<SearchInputProps> = ({
  value,
  onChange,
  placeholder,
  className,
  "aria-label": ariaLabel,
}) => (
  <input
    type="search"
    className={classNames(
      "border border-secondary font-serif w-full max-w-lg px-4 py-1 rounded-2xl placeholder:text-secondary placeholder:font-sans",
      className
    )}
    placeholder={placeholder || "Inserisci la parola o frase..."}
    value={value || ""}
    onChange={onChange}
    required
    aria-label={ariaLabel}
  />
);

export default SearchInput;
