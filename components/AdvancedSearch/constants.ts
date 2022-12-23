import { SEARCH_TYPE } from "@utils/constants";

export const SELECTABLE_TYPES = [
  "Almeno una di queste parole",
  "Tutte queste parole",
  "Questa esatta parola o frase",
];

export const mapSelectToType: { [x: string]: SEARCH_TYPE } = {
  [SELECTABLE_TYPES[0]]: SEARCH_TYPE.OR,
  [SELECTABLE_TYPES[1]]: SEARCH_TYPE.AND,
  [SELECTABLE_TYPES[2]]: SEARCH_TYPE.EXACT,
};

export const mapSearchType: Record<SEARCH_TYPE, string> = {
  [SEARCH_TYPE.OR]: "Almeno una di queste parole",
  [SEARCH_TYPE.AND]: "Tutte queste parole",
  [SEARCH_TYPE.EXACT]: "Questa esatta parola o frase",
};

export const DATES: string[] = new Array(25)
  .fill(0)
  .map((_, i) => (i + 1257).toString());
