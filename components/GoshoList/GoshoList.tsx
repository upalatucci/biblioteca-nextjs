import React, { FormEventHandler } from "react";
import SearchInput from "../SearchInput";
import Select from "../Select";
import GoshoListTable from "./GoshoListTable";
import { useFilters, useOrder } from "./utils";

export type GoshoType = {
  title: string;
  slug: string;
  recipient?: string[];
  place?: string;
  date?: string;
  number?: number;
};

type GoshoListProps = {
  jsonData: GoshoType[];
};

const GoshoList: React.FC<GoshoListProps> = ({ jsonData }) => {
  const {
    filteredGosho,
    titleFilter,
    setTitleFilter,
    recipient,
    setRecipient,
    place,
    setPlace,
    placesOptions,
    recipientOptions,
    clearFilters,
  } = useFilters(jsonData);
  const { sortedGosho, sortField, sortAscend, onSortChange } =
    useOrder(filteredGosho);

  const onSearchInput: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setTitleFilter(e.target.value);
    onSortChange(undefined, true);
  };

  const onSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
  };

  return (
    <section className="pb-10 p-10 md:p-20" id="gosho-list">
      <div className="container py-8 min-h-[50vh] mx-auto max-w-6xl">
        <h2 className="text-4xl md:text-3xl text-primary font-bold mb-8">
          Scritti
        </h2>
        <form
          className="flex items-stretch flex-col lg:flex-row lg:items-center justify-between flex-wrap gap-4 pb-4"
          onSubmit={onSubmit}
        >
          <SearchInput
            value={titleFilter}
            onChange={onSearchInput}
            placeholder="Inserisci il titolo del Gosho che stai cercando"
            aria-label="Titolo"
          />
          <Select
            onChange={setRecipient}
            value={recipient}
            name="destinatario"
            options={recipientOptions}
            className="w-64"
            aria-label="Destinatario"
            placeholder="Seleziona destinatario"
          />
          <Select
            onChange={setPlace}
            value={place}
            name="destinatario"
            options={placesOptions}
            className="w-64"
            aria-label="Luogo"
            placeholder="Seleziona il luogo"
          />
        </form>
        {filteredGosho.length === 0 && (
          <div>
            <div className="mt-4 mb-2 text-3xl">
              Nessun risultato per questo tipo di ricerca
            </div>
            <button className="font-sans text-primary" onClick={clearFilters}>
              Rimuovi filtri
            </button>
          </div>
        )}
        {filteredGosho.length > 0 && (
          <div className="overflow-auto pb-4">
            <GoshoListTable
              sortedGosho={sortedGosho}
              sortField={sortField}
              sortAscend={sortAscend}
              onSortChange={onSortChange}
            />
          </div>
        )}
      </div>
    </section>
  );
};

export default GoshoList;
