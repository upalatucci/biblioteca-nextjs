import classNames from "classnames";
import { ChangeEventHandler, FC } from "react";

type SearchInputProps = {
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  placeholder?: string;
  className?: string;
  required?: boolean;
};

const SearchInput: FC<SearchInputProps> = ({
  value,
  onChange,
  placeholder,
  className
}) => (
  <input
    type="search"
    className={classNames(
      "border border-secondary w-full max-w-lg px-4 py-1 rounded-2xl bg-defaultBg placeholder:text-secondary placeholder:font-sans",
      className
    )}
    placeholder={placeholder || "Inserisci la parola o frase..."}
    value={value || ""}
    onChange={onChange}
    required
  />
);

export default SearchInput;
