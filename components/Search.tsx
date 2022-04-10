import { ChangeEventHandler, FC } from "react";
import SearchInput from "./SearchInput";

enum BOOKS {
  RSND1,
  RSND2,
  SUTRA,
  GLOSSARIO,
}

interface SearchProps {
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
}

const Search: FC<SearchProps> = ({ value, onChange }) => (
  <div className="search-card">
    <SearchInput value={value} onChange={onChange} />

    <div className="checkboxes">
      <span className="span-checkbox">
        <label>
          <input type="checkbox" value={BOOKS.RSND1} />
          <strong>RSND</strong> VOL. I
        </label>
      </span>
      <span className="span-checkbox">
        <label>
          <input type="checkbox" value={BOOKS.RSND2} />
          <strong>RSND</strong> VOL. II
        </label>
      </span>
      <span className="span-checkbox">
        <label>
          <input type="checkbox" value={BOOKS.SUTRA} />
          <strong>Il Sutra del Loto</strong>
        </label>
      </span>
      <span className="span-checkbox">
        <label>
          <input type="checkbox" value={BOOKS.GLOSSARIO} />
          <strong>Glossario</strong>
        </label>
      </span>
    </div>
  </div>
);

export default Search;
