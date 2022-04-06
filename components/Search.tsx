import { ChangeEventHandler, FC } from "react";
import SearchInput from "./SearchInput";

interface SearchProps {
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
}

const Search: FC<SearchProps> = ({ value, onChange }) => (
  <div className="search-card">
    <SearchInput value={value} onChange={onChange} />

    <div className="checkboxes">
      <span className="span-checkbox">
        <input type="checkbox" value="" />
        <label>
          <strong>RSND</strong> VOL. I
        </label>
      </span>
      <span className="span-checkbox">
        <input type="checkbox" value="" />
        <label>
          <strong>RSND</strong> VOL. II
        </label>
      </span>
      <span className="span-checkbox">
        <input type="checkbox" value="" />
        <label>
          <strong>Il Sutra del Loto</strong>
        </label>
      </span>
      <span className="span-checkbox">
        <input type="checkbox" value="" />
        <label>
          <strong>Glossario</strong>
        </label>
      </span>
    </div>
  </div>
);

export default Search;
