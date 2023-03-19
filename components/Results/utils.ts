/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRouter } from "next/router";
import { ParsedUrlQuery } from "querystring";
import { useEffect, useRef } from "react";

const usePrevious = <T>(value: T): T => {
  const ref = useRef<T>();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
};

// don't load tabs when user change tabs
export const useLoadingTab = (loading: boolean): boolean => {
  const router = useRouter();
  const prevRouterQuery = usePrevious<ParsedUrlQuery>(router.query);
  const loadingTab = useRef(true);

  useEffect(() => {
    if (prevRouterQuery?.book !== router?.query?.book) {
      loadingTab.current = false;
    } else {
      loadingTab.current = true;
    }
  }, [router.query]);

  return loadingTab.current ? loading : false;
};

// on changing tabs, retain data to avoid loading
export const retainAggregationData = (data: any): any => {
  const prevData = useRef();

  if (!data) {
    return prevData.current;
  }

  prevData.current = data;

  return data;
};
