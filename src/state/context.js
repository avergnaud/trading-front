import React, { useReducer, createContext } from "react";

const INITIAL_STATE = {
  exchange: "binance",
  pair: "",
  interval: "",
  intervalIndex: "",
  update_rate: 20,
  ohlcDefinitions: {},
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
    case "SELECT_INTERVAL": {
      return {
        ...state,
        interval: action.payload.interval,
        intervalIndex: action.payload.index
      }
    }
    case "init_definitions": {
      let newOhlcDefinitions = {};
      for (let ohlcDefinition of action.payload) {
        newOhlcDefinitions[ohlcDefinition["_id"]] = {
          exchange: ohlcDefinition.exchange,
          pair: ohlcDefinition.pair,
          interval: ohlcDefinition.interval,
          update_rate: ohlcDefinition.update_rate,
        };
      }
      return {
        ...state,
        ohlcDefinitions: newOhlcDefinitions,
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
    case "SAVE_DEFINITION": {
      let newOhlcDefinitions = {
        ...state.ohlcDefinitions,
      };
      newOhlcDefinitions[action.payload["_id"]] = {
        exchange: action.payload.exchange,
        pair: action.payload.pair,
        interval: action.payload.interval,
        update_rate: action.payload.update_rate,
      };
      return {
        ...state,
        ohlcDefinitions: newOhlcDefinitions,
      };
    };
    case "remove_definition": {
      /* filter returns a new array */
      let newOhlcDefinitions = {
        ...state.ohlcDefinitions
      }
      delete newOhlcDefinitions[action.payload];
      return {
        ...state,
        ohlcDefinitions: newOhlcDefinitions,
      };
    }
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
