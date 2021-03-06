import Link from "next/link";
import { useRouter } from "next/router";
import React, { FC, useEffect, useState } from "react";
import { BOOKS } from "../utils/constants";
import SearchInput from "./SearchInput";

type SearchProps = {};

const SimpleSearch: FC<SearchProps> = () => {
  const router = useRouter();
  const [searchText, setSearchText] = useState(router.query.q as string);

  const initialSources: BOOKS[] = Array.isArray(router.query.sources)
    ? (router.query.sources as BOOKS[])
    : [(router.query.sources as BOOKS) || BOOKS.RSND];

  const [searchResouces, setSearchResouces] = useState(initialSources);

  const onSubmit = (event) => {
    event.preventDefault();

    if (!searchText) return;

    router.query.q = searchText;
    router.query.sources = searchResouces as string[];
    router.push(router);
  };

  useEffect(() => {
    const searchQueryString = router.query.q as string;
    if (searchQueryString) {
      setSearchText(searchQueryString);
    }
  }, [router.query.q]);

  const onResouceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (searchResouces.includes(event.target.value as BOOKS)) {
      let filterResouces = searchResouces.filter(
        (resouce) => resouce !== event.target.value
      );

      if (filterResouces.length === 0) filterResouces = [BOOKS.RSND];
      setSearchResouces(filterResouces);
    } else {
      setSearchResouces((resouces) =>
        resouces.concat([event.target.value as BOOKS])
      );
    }
  };

  return (
    <div className="simple-search">
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
                    <input
                      type="checkbox"
                      value={BOOKS.RSND}
                      checked={searchResouces.includes(BOOKS.RSND)}
                      onChange={onResouceChange}
                    />
                    <strong>RSND</strong>
                  </label>
                </span>
                <span className="span-checkbox">
                  <label>
                    <input
                      type="checkbox"
                      value={BOOKS.SUTRA}
                      checked={searchResouces.includes(BOOKS.SUTRA)}
                      onChange={onResouceChange}
                    />
                    <strong>Il Sutra del Loto</strong>
                  </label>
                </span>
                <span className="span-checkbox">
                  <label>
                    <input
                      type="checkbox"
                      value={BOOKS.GLOSSARIO}
                      checked={searchResouces.includes(BOOKS.GLOSSARIO)}
                      onChange={onResouceChange}
                    />
                    <strong>Glossario</strong>
                  </label>
                </span>
              </div>
            </div>
            <div className="action-buttons">
              <button className="primary" type="submit">
                Cerca
              </button>

              <button className="secondary" type="button">
                Reset
              </button>
            </div>
          </div>
        </section>
      </form>
      <div className="go-to-advanced-search">
        <Link href="/ricerca-avanzata" passHref>
          <a className="primary">Vai alla ricerca avanzata</a>
        </Link>
      </div>
    </div>
  );
};

export default SimpleSearch;
