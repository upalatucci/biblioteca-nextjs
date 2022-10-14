import React from "react";
import SearchInput from "../SearchInput";
import Select from "../Select";
import GoshoListTable from "./GoshoListTable";
import { useFilters } from "./utils";

export type GoshoType = {
  title: string;
  slug: string;
  recipient: string;
  place: string;
  date: string;
  number: number;
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

  return (
    <section className="bg-white" id="gosho-list">
      <div className="container mx-auto px-4 py-8 min-h-[50vh]">
        <h2 className="text-4xl md:text-5xl text-secondary mb-8">Scritti</h2>
        <form className="border-b-2 border-secondary flex items-stretch flex-col lg:flex-row lg:items-center justify-between flex-wrap gap-4 pb-4">
          <label className="flex-1 flex lg:flex-col items-center lg:items-start">
            <span className="mr-4 font-bold">Titolo</span>
            <SearchInput
              value={titleFilter}
              onChange={(e) => setTitleFilter(e.target.value)}
              placeholder="Inserisci il titolo del Gosho che stai cercando"
            />
          </label>
          <label className="flex lg:flex-col items-center lg:items-start">
            <span className="mr-4">Destinatario</span>
            <Select
              onChange={setRecipient}
              value={recipient}
              name="destinatario"
              options={recipientOptions}
              className="w-64"
            />
          </label>
          <label className="flex lg:flex-col items-center lg:items-start">
            <span className="mr-4">Luogo</span>
            <Select
              onChange={setPlace}
              value={place}
              name="destinatario"
              options={placesOptions}
              className="w-64"
            />
          </label>
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
            <GoshoListTable items={filteredGosho} />
          </div>
        )}
      </div>
    </section>
  );
};

export default GoshoList;
