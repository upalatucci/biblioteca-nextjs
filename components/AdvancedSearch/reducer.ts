import { parse } from "querystring";
import { BOOKS, FIELDS, SEARCH_TYPE } from "../../utils/constants";
import { DATES } from "./constants";

export enum ACTION_TYPES {
  ADD_SOURCE,
  REMOVE_SOURCE,
  ADD_FIELD,
  REMOVE_FIELD,
  CHANGE_SEARCH_TEXT,
  CHANGE_RECIPIENT,
  CHANGE_PLACE,
  CHANGE_FROM,
  CHANGE_TO,
  CHANGE_SEARCH_TYPE,
}

type Action =
  | {
      type: ACTION_TYPES.ADD_SOURCE;
      payload: BOOKS;
    }
  | { type: ACTION_TYPES.REMOVE_SOURCE; payload: BOOKS }
  | { type: ACTION_TYPES.ADD_FIELD; payload: FIELDS }
  | { type: ACTION_TYPES.REMOVE_FIELD; payload: FIELDS }
  | { type: ACTION_TYPES.CHANGE_SEARCH_TEXT; payload: string }
  | { type: ACTION_TYPES.CHANGE_RECIPIENT; payload: string }
  | { type: ACTION_TYPES.CHANGE_PLACE; payload: string }
  | { type: ACTION_TYPES.CHANGE_FROM; payload: string }
  | { type: ACTION_TYPES.CHANGE_TO; payload: string }
  | { type: ACTION_TYPES.CHANGE_SEARCH_TYPE; payload: string };

type State = {
  sources: BOOKS[];
  fields: FIELDS[];
  searchText: string;
  recipient: string;
  place: string;
  from: string | number;
  to: string | number;
  searchType: SEARCH_TYPE;
};

export const initialState: State = {
  sources: [BOOKS.RSND],
  fields: [FIELDS.CONTENT],
  searchText: "",
  recipient: null,
  place: null,
  from: DATES[0].value,
  to: DATES[1].value,
  searchType: SEARCH_TYPE.OR,
};

const getSearchString = (path: string) => {
  const pathSplit = path.split("?");

  return pathSplit.length > 1 ? pathSplit[1] : "";
};

export const initializeState = (path: string): State => {
  const state = { ...initialState };

  const query = parse(getSearchString(path));

  if (query.q) {
    state.searchText = query.q as string;
  }

  if (query.sources) {
    state.sources = Array.isArray(query.sources)
      ? (query.sources as BOOKS[])
      : [query.sources as BOOKS];
  }

  if (query.fields) {
    state.fields = Array.isArray(query.fields)
      ? (query.fields as FIELDS[])
      : [query.fields as FIELDS];
  }

  if (query.searchType) state.searchType = query.searchType as SEARCH_TYPE;
  else state.searchType = SEARCH_TYPE.BASE;

  return state;
};

const reducer = (state = initialState, { type, payload }: Action) => {
  switch (type) {
    case ACTION_TYPES.ADD_SOURCE:
      return {
        ...state,
        sources: [...state.sources, payload],
      };
    case ACTION_TYPES.REMOVE_SOURCE:
      const nextSources = state.sources.filter((source) => source !== payload);

      if (nextSources.length === 0) nextSources.push(BOOKS.RSND);

      return {
        ...state,
        sources: nextSources.length ? nextSources : initialState.sources,
      };
    case ACTION_TYPES.ADD_FIELD:
      return {
        ...state,
        fields: [...state.fields, payload],
      };

    case ACTION_TYPES.REMOVE_FIELD:
      const nextField = state.fields.filter((field) => field !== payload);

      if (nextField.length === 0) nextField.push(FIELDS.CONTENT);

      return {
        ...state,
        fields: nextField.length ? nextField : initialState.fields,
      };
    case ACTION_TYPES.CHANGE_SEARCH_TEXT:
      return {
        ...state,
        searchText: payload,
      };
    case ACTION_TYPES.CHANGE_RECIPIENT:
      return {
        ...state,
        recipient: payload,
      };
    case ACTION_TYPES.CHANGE_PLACE:
      return {
        ...state,
        place: payload,
      };
    case ACTION_TYPES.CHANGE_FROM:
      return {
        ...state,
        from: payload,
      };
    case ACTION_TYPES.CHANGE_TO:
      return {
        ...state,
        to: payload,
      };
    case ACTION_TYPES.CHANGE_SEARCH_TYPE:
      return {
        ...state,
        searchType: payload,
      };
    default:
      return state;
  }
};

export default reducer;
