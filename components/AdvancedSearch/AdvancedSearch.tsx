import { useRouter } from "next/router";
import React, { FC, useCallback, useReducer } from "react";
import { BOOKS, FIELDS, SEARCH_TYPE } from "../../utils/constants";
import SearchInput from "../SearchInput";
import Select from "../Select";
import {
  DATES,
  mapSearchType,
  PLACES_OPTIONS,
  RECIPIENTS_OPTIONS,
} from "./constants";
import reducer, { ACTION_TYPES, initializeState } from "./reducer";

const AdvancedSearch: FC = () => {
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
    router.query.from = from.toString();
    router.query.to = to.toString();
    router.query.searchType = searchType;

    if (recipient) router.query.recipient = recipient;
    else delete router.query.recipient;

    if (place) router.query.place = place;
    else delete router.query.place;

    router.push(router, null, { scroll: false });
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
        payload: newValue === 0 ? null : newValue,
      });
    };
  };

  return (
    <form onSubmit={onSubmit}>
      <section className="bg-white">
        <div className="container py-8 mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold mt-8 mb-14">
            Fai la tua ricerca:
          </h2>

          <div className="bg-defaultBg rounded-xl shadow-md mb-8 mx-auto p-8 font-sans">
            <div className="flex items-center justify-center w-full mb-8">
              <Select
                onChange={onChangeSelect(ACTION_TYPES.CHANGE_SEARCH_TYPE)}
                value={searchType}
                name="type"
                options={Object.values(SEARCH_TYPE).map((type) => ({
                  value: type,
                  label: mapSearchType[type],
                }))}
                className="w-80 mr-4"
              />
              <SearchInput value={searchText} onChange={onSearchTextChange} />
            </div>

            <div className="bg-white border rounded-xl px-8 pt-4 pb-8">
              <h3 className="text-lg md:text-xl font-serif text-primary font-bold mt-4 mb-6">
                Cerca in:
              </h3>
              <div className="bg-defaultBg shadow-md rounded-xl px-8 py-8 mb-10">
                <div className="flex items-center justify-start flex-wrap mb-4">
                  <span className="w-32 lg:w-40">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        value={BOOKS.RSND}
                        checked={sources.includes(BOOKS.RSND)}
                        onChange={onSourceChange}
                        className="mr-4"
                      />
                      <strong>RSND</strong>
                    </label>
                  </span>
                  <span className="w-32 lg:w-40">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        value={BOOKS.SUTRA}
                        checked={sources.includes(BOOKS.SUTRA)}
                        onChange={onSourceChange}
                        className="mr-4"
                      />
                      <strong>Il Sutra del Loto</strong>
                    </label>
                  </span>
                  <span className="w-32 lg:w-40">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        value={BOOKS.GLOSSARIO}
                        checked={sources.includes(BOOKS.GLOSSARIO)}
                        onChange={onSourceChange}
                        className="mr-4"
                      />
                      <strong>Glossario</strong>
                    </label>
                  </span>
                </div>
                <div className="flex items-center justify-start flex-wrap">
                <span className="w-32 lg:w-40">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      value={FIELDS.CONTENT}
                      onChange={onFieldsChange}
                      checked={fields.includes(FIELDS.CONTENT)}
                      className="mr-4"
                    />
                    Contenuto
                  </label>
                </span>
                <span className="w-32 lg:w-40">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      value={FIELDS.CENNI_STORICI}
                      onChange={onFieldsChange}
                      checked={fields.includes(FIELDS.CENNI_STORICI)}
                      className="mr-4"
                    />
                    Cenni storici
                  </label>
                </span>
                <span className="w-32 lg:w-40">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      value={FIELDS.NOTE}
                      onChange={onFieldsChange}
                      checked={fields.includes(FIELDS.NOTE)}
                      className="mr-4"
                    />
                    Note
                  </label>
                </span>
                </div>
              </div>
              <h3 className="text-lg font-serif md:text-xl text-primary font-bold mt-4 mb-6">
                Filtra i risultati:
              </h3>

              <div className="flex items-center justify-between flex-wrap">
                <span className="mb-4 mr-4">
                  <label className="flex items-center">
                    <span className="mr-4">Destinatario</span>
                    <Select
                      onChange={onChangeSelect(ACTION_TYPES.CHANGE_RECIPIENT)}
                      value={recipient || RECIPIENTS_OPTIONS[0].value}
                      name="destinatario"
                      options={RECIPIENTS_OPTIONS}
                    />
                  </label>
                </span>

                <span className="mb-4">
                  <label className="flex items-center">
                    <span className="mr-4">Scritto a</span>
                    <Select
                      onChange={onChangeSelect(ACTION_TYPES.CHANGE_PLACE)}
                      value={place || PLACES_OPTIONS[0].value}
                      name="luogo"
                      options={PLACES_OPTIONS}
                    />
                  </label>
                </span>

                <span  className="mb-4">
                  <label className="flex items-center">
                    <span className="mr-4">Scritto nel</span>
                    <Select
                      onChange={onChangeSelect(ACTION_TYPES.CHANGE_FROM)}
                      value={from}
                      name="da"
                      options={DATES}
                      className="mr-4"
                    />
                    -
                    <Select
                      onChange={onChangeSelect(ACTION_TYPES.CHANGE_TO)}
                      value={to}
                      name="a"
                      options={DATES}
                      className="ml-4"
                    />
                  </label>
                </span>
              </div>
            </div>
            <div className="px-4 flex items-center justify-center mt-8">
              <button
                className="btn bg-sky-600 hover:bg-sky-800 rounded-3xl w-36 h-10 text-white text-lg mx-4"
                type="submit"
              >
                Cerca
              </button>

              <button
                className="btn  rounded-3xl h-10 w-36 border border-secondary hover:text-white hover:bg-secondary"
                type="button"
              >
                Reset
              </button>
            </div>
          </div>
        </div>
      </section>
    </form>
  );
};

export default AdvancedSearch;
