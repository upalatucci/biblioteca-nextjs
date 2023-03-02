import { useRouter } from "next/router";
import React, { FC, useCallback, useEffect, useState } from "react";
import { EXTRA_CATEGORIES, FIELDS, SEARCH_TYPE } from "@utils/constants";
import SearchInput from "../SearchInput";
import Select from "../Select";
import { SELECTABLE_TYPES, mapSearchType, mapSelectToType } from "./constants";
import Loading from "@components/Loading";
import { getQueryParamAsArray } from "@utils/utils";

type AdvancedSearchType = {
  loading: boolean;
};

const AdvancedSearch: FC<AdvancedSearchType> = ({ loading }) => {
  const router = useRouter();
  const [searchText, setSearchText] = useState("");
  const [searchType, setSearchType] = useState<SEARCH_TYPE>(SEARCH_TYPE.EXACT);
  const [fields, setFields] = useState([FIELDS.CONTENT]);
  const [extraCategories, setExtraCategories] = useState<EXTRA_CATEGORIES[]>(
    []
  );

  useEffect(() => {
    if (router.query.q) setSearchText(router.query.q as string);
  }, [router.query.q]);

  useEffect(() => {
    if (router.query.searchType)
      setSearchType(router.query.searchType as SEARCH_TYPE);
  }, [router.query.searchType]);

  useEffect(() => {
    if (router.query.fields)
      setFields(getQueryParamAsArray(router.query.fields));
  }, [router.query.fields]);

  useEffect(() => {
    if (router.query.extraCategory)
      setExtraCategories(getQueryParamAsArray(router.query.extraCategory));
  }, [router.query.extraCategory]);

  const onSubmit = (event) => {
    event.preventDefault();
    if (!searchText) return;

    router.query.q = searchText;
    router.query.fields = fields;

    router.query.searchType = searchType;

    router.query.extraCategory = extraCategories;

    router.push({ ...router, hash: "risultati" }, null, { scroll: false });
  };

  const onFieldsChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      if (event.target.checked) {
        setFields((f) => f.concat([event.target.value as FIELDS]));
      } else {
        setFields((array) => array.filter((f) => f !== event.target.value));
      }
    },
    []
  );
  const onCategoriesChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      if (event.target.checked) {
        setExtraCategories((f) =>
          f.concat([event.target.value as EXTRA_CATEGORIES])
        );
      } else {
        setExtraCategories((array) =>
          array.filter((f) => f !== event.target.value)
        );
      }
    },
    []
  );

  const onReset = (event) => {
    event.preventDefault();
    router.push("/ricerca-avanzata");
    setSearchType(SEARCH_TYPE.EXACT);
    setFields([FIELDS.CONTENT]);
    setExtraCategories([]);
    setSearchText("");
  };

  return (
    <div className="w-full bg-white rounded-3xl shadow-md py-20 mb-20 lg:py-32 px-8">
      <form onSubmit={onSubmit} className="mx-auto max-w-[1400px]">
        <section className="">
          <div className="container mx-auto">
            <h2 className="text-3xl px-4 pb-10 md:px-0 font-bold ">
              Cosa vuoi approfondire oggi?
            </h2>

            <div className="font-sans rounded-3xl bg-defaultBg px-14 py-20 shadow-md flex flex-col items-center justify-evenly gap-12">
              <div className="w-full flex flex-col md:flex-row items-center justify-start gap-8">
                <span className="font-bold mr-10">Cerca:</span>
                <Select
                  onChange={(newVal) =>
                    setSearchType(mapSelectToType[newVal.toString()])
                  }
                  value={mapSearchType[searchType]}
                  name="type"
                  options={SELECTABLE_TYPES}
                  className="mb-4 md:mb-0 md:mr-4 w-full md:w-96"
                />
                <SearchInput
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                  required
                  aria-label="Cerca parole o frase"
                />
              </div>

              <div className="pt-4 flex w-full justify-start">
                <span className="font-bold mb-6 mr-10">in:</span>
                <div className="">
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
                    <span className="w-32 lg:w-40">
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          value={EXTRA_CATEGORIES.INTRO}
                          onChange={onCategoriesChange}
                          checked={extraCategories.includes(
                            EXTRA_CATEGORIES.INTRO
                          )}
                          className="mr-4"
                        />
                        Introduzione
                      </label>
                    </span>
                    <span className="w-32 lg:w-40">
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          value={EXTRA_CATEGORIES.APPENDICI}
                          onChange={onCategoriesChange}
                          checked={extraCategories.includes(
                            EXTRA_CATEGORIES.APPENDICI
                          )}
                          className="mr-4"
                        />
                        Appendici
                      </label>
                    </span>
                  </div>
                </div>
              </div>

              <div className="px-4 flex flex-wrap gap-4 items-center justify-center">
                <button
                  className="btn bg-primary hover:bg-primaryHover rounded-3xl w-60 h-10 text-white text-lg"
                  type="submit"
                >
                  <div className="flex items-center justify-center">
                    {loading && <Loading />} Cerca
                  </div>
                </button>

                <button
                  className="btn rounded-3xl h-10 w-60 border border-secondary hover:text-white hover:bg-secondary"
                  type="reset"
                  onClick={onReset}
                >
                  Reset
                </button>
              </div>
            </div>
          </div>
        </section>
      </form>
    </div>
  );
};

export default AdvancedSearch;
