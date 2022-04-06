import { ChangeEventHandler, FC, FormEvent, useState } from "react";

interface SearchInputProps {
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
}

const SearchInput: FC<SearchInputProps> = ({ value, onChange }) => (
  <input
    type="search"
    className="search-input"
    placeholder="Inserisci la parola o frase..."
    value={value}
    onChange={onChange}
  />
);

export default SearchInput;
