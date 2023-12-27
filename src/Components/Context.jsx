import React, { createContext, useContext, useState } from "react";
const GlobalContext = createContext();
export const UseGlobalContext = () => useContext(GlobalContext);
const AppContext = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    sessionStorage.getItem("isAuthenticated")
      ? sessionStorage.getItem("isAuthenticated")
      : false
  );
  return (
    <GlobalContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default AppContext;
