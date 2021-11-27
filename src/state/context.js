import React, { useReducer, createContext } from "react";

const INITIAL_STATE = {
  exchange: "",
  pair: "",
  interval: "",
  cron: "*/15 * * * *",
  ohlcDefinitions: [],
  error: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    /* générique. Sera complété avec d'autres actions... 
    si ça se complique, on passera des onClick aux différents Search.js
    pour distinguer en amont des actions différentes
    */
    case "field": {
      if (action.fieldName === "exchange") {
        return {
          ...state,
          exchange: action.payload,
          pair: "",
          interval: "",
          error: null,
        };
      }
      return {
        ...state,
        [action.fieldName]: action.payload,
      };
    }
    case "init_definitions": {
      return {
        ...state,
        ohlcDefinitions: action.payload,
      };
    }
    case "error":
      return {
        ...state,
        error: action.payload,
      };
    case "success":
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export const Context = createContext();

export const ContextProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

  return (
    <Context.Provider value={[state, dispatch]}>
      {props.children}
    </Context.Provider>
  );
};
