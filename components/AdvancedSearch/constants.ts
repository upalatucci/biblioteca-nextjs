import { SEARCH_TYPE } from "../../utils/constants";
import { OptionType } from "../Select";

export const mapSearchType: Record<SEARCH_TYPE, string> = {
    [SEARCH_TYPE.OR]: "Almeno una di queste parole",
    [SEARCH_TYPE.AND]: "Tutte queste parole",
    [SEARCH_TYPE.BASE]: "Le parole o la frase",
    [SEARCH_TYPE.EXACT]: "Questa esatta parola o frase",
  };

export const RECIPIENTS_OPTIONS: OptionType[] = [
    {value: 0, label: "Tutti"},
    {value: 1, label: "Takahashi Rokuro Hyoe"},
  ]

export const PLACES_OPTIONS: OptionType[] = [{value: 0, label: 'Tutti'}, {value: 1, label: "Kamakura"}]

export const DATES: OptionType[] = [{value: 1200, label: '1200'}, {value: 1270, label: '1270'}]