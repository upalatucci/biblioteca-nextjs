import { DATES } from "@components/AdvancedSearch/constants";
import { PLACES_OPTIONS } from "@components/AdvancedSearch/places";
import { RECIPIENTS_OPTIONS } from "@components/AdvancedSearch/recipients";
import { ALL_LABEL } from "@components/GoshoList/utils";
import Select from "@components/Select";
import { MAP_POST_TYPE_TO_BOOK_URL, PostType } from "@utils/elasticSearchUtils";
import { useRouter } from "next/router";
import React from "react";

const TabFilters: React.FC = () => {
  const router = useRouter();
  const { from, to, recipient, place } = router.query;

  const onChangeRecipient = (newRecipient) => {
    const routerQuery = router.query;

    if (newRecipient === ALL_LABEL) delete routerQuery.recipient;
    else routerQuery.recipient = newRecipient;

    router.push({
      ...router,
      query: routerQuery,
      hash: "risultati",
    });
  };

  const onChangePlace = (newPlace) => {
    const routerQuery = router.query;

    if (newPlace === ALL_LABEL) delete routerQuery.place;
    else routerQuery.place = newPlace;

    router.push({
      ...router,
      query: routerQuery,
      hash: "risultati",
    });
  };

  if (
    router.query.book !== MAP_POST_TYPE_TO_BOOK_URL[PostType.RSND] ||
    !/ricerca-avanzata/.test(router.asPath)
  )
    return null;

  return (
    <div className="mb-10">
      <h3 className="text-lg md:text-xl text-primary font-bold mb-6">
        Filtra i risultati:
      </h3>

      <div className="flex items-center justify-between flex-wrap">
        <span className="mb-4 mr-4">
          <label className="flex items-center">
            <span className="mr-4">Destinatario</span>
            <Select
              onChange={onChangeRecipient}
              value={(recipient as string) || RECIPIENTS_OPTIONS[0]}
              name="destinatario"
              options={RECIPIENTS_OPTIONS}
              className="w-64"
            />
          </label>
        </span>

        <span className="mb-4">
          <label className="flex items-center">
            <span className="mr-4">Scritto a</span>
            <Select
              onChange={onChangePlace}
              value={(place as string) || PLACES_OPTIONS[0]}
              name="luogo"
              options={PLACES_OPTIONS}
              className="w-64"
            />
          </label>
        </span>

        <span className="mb-4">
          <label className="flex items-center">
            <span className="mr-4">Scritto nel</span>
            <Select
              onChange={(newFrom) =>
                router.push({
                  ...router,
                  query: { ...router.query, from: newFrom },
                  hash: "risultati",
                })
              }
              value={(from as string) || DATES[0]}
              name="da"
              options={DATES}
              className="mr-4 w-16"
            />
            -
            <Select
              onChange={(newTo) =>
                router.push({
                  ...router,
                  query: { ...router.query, to: newTo },
                  hash: "risultati",
                })
              }
              value={(to as string) || DATES.at(-1)}
              name="a"
              options={DATES}
              className="ml-4 w-16"
            />
          </label>
        </span>
      </div>
    </div>
  );
};

export default TabFilters;
