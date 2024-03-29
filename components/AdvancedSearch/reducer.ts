import { ParsedUrlQuery, parse } from "querystring";
import { BOOKS, FIELDS, SEARCH_TYPE } from "@utils/constants";
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
  RESET,
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
  | { type: ACTION_TYPES.CHANGE_SEARCH_TYPE; payload: SEARCH_TYPE }
  | { type: ACTION_TYPES.RESET; payload?: null };

type State = {
  sources: BOOKS[];
  fields: FIELDS[];
  searchText: string;
  recipient: string | null;
  place: string | null;
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
  from: DATES[0],
  to: DATES[1],
  searchType: SEARCH_TYPE.OR,
};

export const initializeState = (query: ParsedUrlQuery): State => {
  const state = { ...initialState };

  if (query.q) {
    state.searchText = query.q as string;
  }

  if (query.fields) {
    state.fields = Array.isArray(query.fields)
      ? (query.fields as FIELDS[])
      : [query.fields as FIELDS];
  }

  state.searchType = (query.searchType as SEARCH_TYPE) || SEARCH_TYPE.EXACT;

  return state;
};

const reducer = (state = initialState, { type, payload }: Action): State => {
  switch (type) {
    case ACTION_TYPES.ADD_SOURCE:
      return {
        ...state,
        sources: [payload as BOOKS, ...(state.sources as BOOKS[])],
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
        fields: [...(state.fields as FIELDS[]), payload as FIELDS],
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
        searchType: payload as SEARCH_TYPE,
      };
    case ACTION_TYPES.RESET:
      return {
        ...state,
        ...initialState,
      };
    default:
      return state;
  }
};

export default reducer;
