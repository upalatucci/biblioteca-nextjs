export enum BOOKS {
  RSND = "RSND",
  SUTRA = "SUTRA",
  GLOSSARIO = "GLOSSARIO",
}

export enum FIELDS {
  CONTENT = "CONTENT",
  CENNI_STORICI = "CENNI_STORICI",
  NOTE = "NOTE",
}

export enum EXTRA_CATEGORIES {
  INTRO = "INTRO",
  APPENDICI = "APPENDICI",
}

export enum SEARCH_TYPE {
  AND = "AND",
  OR = "OR",
  EXACT = "EXACT",
}

export const RSND_VOL_1_CATEGORY_ID = 16;
export const RSND_VOL_2_CATEGORY_ID = 17;

export const RSND_APPENDICE_CAT_ID = 19;
export const RSND_INTRO_1_CAT_ID = 21;
export const RSND_INTRO_2_CAT_ID = 22;
export const SDL_CAT_ID = 12;
export const GLOSSARY_RSND_CAT_ID = 14;
export const GLOSSARY_SDL_CAT_ID = 15;
export const SDL_INTRO_CAT_ID = 18;

export enum ACF_METADATA {
  NUMBER = "acf_numero",
  RECIPIENT = "acf_destinatario",
  PLACE = "acf_luogo",
  DATE = "acf_data",
  BACKGROUND = "acf_cenni_storici",
  NOTE = "acf_note",
}
