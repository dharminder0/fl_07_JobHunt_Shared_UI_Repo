import React, { createContext, useContext, useState, ReactNode } from "react";

// Define the type for the context value
interface OrganizationTypeContextValue {
  organizationType: string;
  setOrganizationType: React.Dispatch<React.SetStateAction<string>>;
}

// Create the context with a default value of `undefined`
const OrganizationTypeContext = createContext<OrganizationTypeContextValue | undefined>(undefined);

// Provider component
export const OrganizationTypeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [organizationType, setOrganizationType] = useState<string>("company"); // Default to 'company'

  return (
    <OrganizationTypeContext.Provider value={{ organizationType, setOrganizationType }}>
      {children}
    </OrganizationTypeContext.Provider>
  );
};

// Custom hook for using the context
export const useOrganizationType = (): OrganizationTypeContextValue => {
  const context = useContext(OrganizationTypeContext);
  if (!context) {
    throw new Error("useOrganizationType must be used within an OrganizationTypeProvider");
  }
  return context;
};
