import React, { useState, createContext, ReactNode } from "react";

interface ActiveFunctionalityContextType {
  activeFunctionality: string;
  setActiveFunctionality: (value: string) => void;
}

const ActiveFunctionalityContext = createContext<ActiveFunctionalityContextType>({
  activeFunctionality: "",
  setActiveFunctionality: () => {},
});

export const ActiveFunctionalityProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [activeFunctionality, setActiveFunctionality] = useState("Dashboard");

  return (
    <ActiveFunctionalityContext.Provider value={{ activeFunctionality, setActiveFunctionality }}>
      {children}
    </ActiveFunctionalityContext.Provider>
  );
};

export default ActiveFunctionalityContext;