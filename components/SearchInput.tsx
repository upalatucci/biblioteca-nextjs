import { ChangeEventHandler, FC } from "react";

type SearchInputProps = {
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  placeholder?: string;
};

const SearchInput: FC<SearchInputProps> = ({
  value,
  onChange,
  placeholder
}) => (
  <input
    type="search"
    className="border border-secondary w-full max-w-lg px-4 py-1 rounded-2xl"
    placeholder={placeholder || "Inserisci la parola o frase..."}
    value={value || ""}
    onChange={onChange}
  />
);

export default SearchInput;
