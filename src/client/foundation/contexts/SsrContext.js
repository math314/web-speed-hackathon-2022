import axios from "axios";
import React, { useCallback, useContext, useMemo, useState } from "react";

// /**
//  * @typedef SsrContextValues
//  * @property {boolean | null} isServerSide
//  * @property {string: any} values
//  * @property {(userId: string) => void} setUserId
//  */

const SsrContext = React.createContext({
  isServerSide: null,
  values: {},
  setValues: () => () => {
    throw new Error("SsrContext value is not set");
  },
});

export const SsrContextProvider = ({ isServerSide, precomputedValues, children }) => {
  const [values, setValues] = useState(precomputedValues || {});

  return (
    <SsrContext.Provider
      value={{
        isServerSide,
        values,
        setValues
      }}
    >
      {children}
    </SsrContext.Provider>
  );
};

export const maybeConsumePrecomputedValuesForSsr = (apiPathWithParams) => {
  const { isServerSide, values } = useContext(SsrContext);
  if (!(apiPathWithParams in values)) {
    return null;
  }
  const result = values[apiPathWithParams];

  if (!isServerSide) {
    delete values[apiPathWithParams];
  }

  return result;
};

