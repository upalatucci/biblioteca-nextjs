import { useRouter } from "next/router";
import React, { FC, useCallback, useReducer } from "react";
import { BOOKS, FIELDS, SEARCH_TYPE } from "../../utils/constants";
import SearchInput from "../SearchInput";
import Select from "../Select";
import reducer, { ACTION_TYPES, initializeState } from "./reducer";

type SearchProps = {};

const DEFAULT = "Tutte";

const mapSearchType: Record<SEARCH_TYPE, string> = {
  [SEARCH_TYPE.OR]: "OR",
  [SEARCH_TYPE.AND]: "AND",
  [SEARCH_TYPE.EXACT]: "Ricerca Esatta",
};

const AdvancedSearch: FC<SearchProps> = () => {
  const router = useRouter();

  const [state, dispatch] = useReducer(reducer, null, () =>
    initializeState(router.asPath)
  );

  const {
    sources,
    fields,
    searchText,
    recipient,
    place,
    from,
    to,
    searchType,
  } = state;

  const onSubmit = (event) => {
    event.preventDefault();

    if (!searchText) return;

    router.query.q = searchText;
    router.query.sources = sources;
    router.query.fields = fields;
    router.query.from = from;
    router.query.to = to;
    router.query.searchType = searchType;

    if (recipient) router.query.recipient = recipient;
    else delete router.query.recipient;

    if (place) router.query.place = place;
    else delete router.query.place;
    router.push(router);
  };

  const onSourceChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      if (event.target.checked) {
        dispatch({
          type: ACTION_TYPES.ADD_SOURCE,
          payload: event.target.value as BOOKS,
        });
      } else {
        dispatch({
          type: ACTION_TYPES.REMOVE_SOURCE,
          payload: event.target.value as BOOKS,
        });
      }
    },
    []
  );

  const onFieldsChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      if (event.target.checked) {
        dispatch({
          type: ACTION_TYPES.ADD_FIELD,
          payload: event.target.value as FIELDS,
        });
      } else {
        dispatch({
          type: ACTION_TYPES.REMOVE_FIELD,
          payload: event.target.value as FIELDS,
        });
      }
    },
    []
  );

  const onSearchTextChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      dispatch({
        type: ACTION_TYPES.CHANGE_SEARCH_TEXT,
        payload: event.target.value,
      });
    },
    []
  );

  const onChangeSelect = (type) => {
    return (newValue) => {
      dispatch({
        type,
        payload: newValue === DEFAULT ? null : newValue,
      });
    };
  };

  return (
    <form onSubmit={onSubmit}>
      <section className="container blank-section">
        <div className="inner">
          <h2>Fai la tua ricerca:</h2>

          <div className="search-card advanced">
            <div className="searchbox">
              <Select
                onChange={onChangeSelect(ACTION_TYPES.CHANGE_SEARCH_TYPE)}
                value={searchType}
                name="type"
                options={Object.values(SEARCH_TYPE).map((type) => ({
                  value: type,
                  label: mapSearchType[type],
                }))}
              />
              <SearchInput value={searchText} onChange={onSearchTextChange} />
            </div>

            <div className="checkboxes">
              <span className="span-checkbox">
                <label>
                  <input
                    type="checkbox"
                    value={BOOKS.RSND1}
                    checked={sources.includes(BOOKS.RSND1)}
                    onChange={onSourceChange}
                  />
                  <strong>RSND</strong> VOL. I
                </label>
              </span>
              <span className="span-checkbox">
                <label>
                  <input
                    type="checkbox"
                    value={BOOKS.RSND2}
                    checked={sources.includes(BOOKS.RSND2)}
                    onChange={onSourceChange}
                  />
                  <strong>RSND</strong> VOL. II
                </label>
              </span>
              <span className="span-checkbox">
                <label>
                  <input
                    type="checkbox"
                    value={BOOKS.SUTRA}
                    checked={sources.includes(BOOKS.SUTRA)}
                    onChange={onSourceChange}
                  />
                  <strong>Il Sutra del Loto</strong>
                </label>
              </span>
              <span className="span-checkbox">
                <label>
                  <input
                    type="checkbox"
                    value={BOOKS.GLOSSARIO}
                    checked={sources.includes(BOOKS.GLOSSARIO)}
                    onChange={onSourceChange}
                  />
                  <strong>Glossario</strong>
                </label>
              </span>
            </div>
            <div className="filters">
              <h3>Cerca in:</h3>
              <div className="field-filter">
                <span className="span-checkbox">
                  <label>
                    <input
                      type="checkbox"
                      value={FIELDS.CONTENT}
                      onChange={onFieldsChange}
                      checked={fields.includes(FIELDS.CONTENT)}
                    />
                    Contenuto
                  </label>
                </span>
                <span className="span-checkbox">
                  <label>
                    <input
                      type="checkbox"
                      value={FIELDS.CENNI_STORICI}
                      onChange={onFieldsChange}
                      checked={fields.includes(FIELDS.CENNI_STORICI)}
                    />
                    Cenni storici
                  </label>
                </span>
                <span className="span-checkbox">
                  <label>
                    <input
                      type="checkbox"
                      value={FIELDS.NOTE}
                      onChange={onFieldsChange}
                      checked={fields.includes(FIELDS.NOTE)}
                    />
                    Note
                  </label>
                </span>
              </div>
              <h3>Filtra i risultati:</h3>

              <div className="filter-selections">
                <span className="span-select">
                  <label>
                    <span>Destinatario</span>
                    <Select
                      onChange={onChangeSelect(ACTION_TYPES.CHANGE_RECIPIENT)}
                      value={recipient}
                      name="destinatario"
                      defaultValue={DEFAULT}
                      options={["Takahashi Rokuro Hyoe"]}
                    />
                  </label>
                </span>

                <span className="span-select">
                  <label>
                    <span>Scritto a</span>
                    <Select
                      onChange={onChangeSelect(ACTION_TYPES.CHANGE_PLACE)}
                      value={place}
                      name="luogo"
                      defaultValue={DEFAULT}
                      options={["Kamakura"]}
                    />
                  </label>
                </span>

                <span className="span-select">
                  <label>
                    <span>Scritto nel</span>
                    <Select
                      onChange={onChangeSelect(ACTION_TYPES.CHANGE_FROM)}
                      value={from}
                      name="da"
                      defaultValue={DEFAULT}
                      options={["1200"]}
                    />
                    -
                    <Select
                      onChange={onChangeSelect(ACTION_TYPES.CHANGE_TO)}
                      value={to}
                      name="a"
                      defaultValue={DEFAULT}
                      options={["1270"]}
                    />
                  </label>
                </span>
              </div>
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

export default AdvancedSearch;
