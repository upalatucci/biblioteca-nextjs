import { useRouter } from "next/router";
import { FC, useCallback, useEffect, useState } from "react";
import SearchInput from "./SearchInput";

enum BOOKS {
  RSND1,
  RSND2,
  SUTRA,
  GLOSSARIO,
}

type SearchProps = {
  onSearch: (searchText: string) => void;
};

const SimpleSearch: FC<SearchProps> = ({ onSearch }) => {
  const router = useRouter();
  const [searchText, setSearchText] = useState(router.query.q as string);

  const onSubmit = useCallback(
    (event) => {
      event.preventDefault();

      if (!searchText) return;

      router.query.q = searchText;
      router.push(router);
    },
    [router, searchText]
  );

  useEffect(() => {
    const searchQueryString = router.query.q as string;
    if (searchQueryString) {
      setSearchText(searchQueryString);
      onSearch(searchQueryString);
    }
  }, [onSearch, router.query.q]);

  return (
    <form onSubmit={onSubmit}>
      <section className="container blank-section">
        <div className="inner">
          <h2>Fai la tua ricerca:</h2>

          <div className="search-card">
            <SearchInput
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />

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
          <div className="action-buttons">
            <button className="primary" type="submit">
              Cerca
            </button>

            <button className="secondary">Reset</button>
          </div>
        </div>
      </section>
    </form>
  );
};

export default SimpleSearch;
