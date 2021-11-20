import React, { useReducer, createContext } from "react";

const INITIAL_STATE = {
    exchange: '',
    pair: '',
    interval: '',
    error: null
};

const reducer = (state, action) => {
    switch(action.type) {
        /* générique. Sera complété avec d'autres actions... */
        case 'field': {
          return {
            ...state,
            [action.fieldName]: action.payload,
          };
        }
        default:
          return state;
    }
};

export const Context = createContext();

export const ContextProvider = props => {
    const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
  
    return (
      <Context.Provider value={[state, dispatch]}>
        {props.children}
      </Context.Provider>
    );
  };