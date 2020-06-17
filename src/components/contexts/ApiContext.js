import React, { useState, createContext } from "react";
export const ApiContext = createContext();
export const ApiProvider = (props) => {
  const [resApi, setResApi] = useState([]);
  return (
    <ApiContext.Provider value={[resApi, setResApi]}>
      {props.children}
    </ApiContext.Provider>
  );
};
