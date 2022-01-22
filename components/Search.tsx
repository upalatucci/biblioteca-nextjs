import { ChangeEvent, FC, FormEvent, useState } from "react";

interface SearchProps {
  onSearch: (searchText: string) => void;
}

const Search: FC<SearchProps> = ({ onSearch }) => {
  const [searchText, setSearchText] = useState("");

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();

    onSearch(searchText);
  };

  return (
    <form onSubmit={onSubmit} className="text-center p-5">
      <input
        type="search"
        value={searchText}
        onChange={(event: ChangeEvent<HTMLInputElement>) =>
          setSearchText(event.currentTarget.value)
        }
      />
    </form>
  );
};

export default Search;
