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
  required = false,
}) => (
  <div className={classNames("w-full max-w-[50%] input-container", className)}>
    <input
      type="search"
      className="border border-primary h-[42px] w-full px-4 py-1 rounded-3xl bg-white placeholder:text-black text-lg font-sans"
      placeholder={placeholder || "Inserisci la parola o frase..."}
      value={value || ""}
      onChange={onChange}
      required={required}
      aria-label={ariaLabel}
    />
    <span className="input-search-icon"></span>
  </div>
);

export default SearchInput;
