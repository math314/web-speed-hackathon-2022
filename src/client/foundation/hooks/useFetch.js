import { useEffect, useState } from "react";
import { maybeConsumePrecomputedValuesForSsr } from "../contexts/SsrContext"

/**
 * @template T
 * @typedef {object} ReturnValues
 * @property {T | null} data
 * @property {Error | null} error
 * @property {boolean} loading
 */

/**
 * @template T
 * @param {string} apiPath
 * @param {(apiPath: string) => Promise<T>} fetcher
 * @returns {ReturnValues<T>}
 */
export function useFetch(apiPath, fetcher) {
  const precomputedValue = maybeConsumePrecomputedValuesForSsr(apiPath);

  const [result, setResult] = useState({
    data: precomputedValue,
    error: null,
    loading: !!precomputedValue,
  });


  useEffect(() => {
    if (precomputedValue) {
      return ;
    }

    setResult(() => ({
      data: null,
      error: null,
      loading: true,
    }));

    const promise = fetcher(apiPath);

    promise.then((data) => {
      setResult((cur) => ({
        ...cur,
        data,
        loading: false,
      }));
    });

    promise.catch((error) => {
      setResult((cur) => ({
        ...cur,
        error,
        loading: false,
      }));
    });
  }, [apiPath, fetcher]);

  return result;
}
