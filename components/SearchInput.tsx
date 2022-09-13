import { ChangeEventHandler, FC, FormEvent, useState } from "react";

interface SearchInputProps {
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  placeholder?: string;
}

const SearchInput: FC<SearchInputProps> = ({ value, onChange, placeholder }) => (
  <input
    type="search"
    className="search-input"
    placeholder={placeholder || "Inserisci la parola o frase..."}
    value={value || ""}
    onChange={onChange}
  />
);

export default SearchInput;
