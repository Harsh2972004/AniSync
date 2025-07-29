import { useContext, createContext, useState } from "react";

const BrowseContext = createContext();

export const BrowseProvider = ({ children }) => {
  const [mode, setMode] = useState("default"); // default || filtered || search || sectionViewAll
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({});
  const [sectionType, setSectionType] = useState(null);
  const [title, setTitle] = useState("");

  const reset = () => {
    setMode("default");
    setSectionType(null);
    setFilters({});
    setSearchTerm("");
  };

  return (
    <BrowseContext.Provider
      value={{
        mode,
        setMode,
        searchTerm,
        setSearchTerm,
        filters,
        setFilters,
        sectionType,
        setSectionType,
        title,
        setTitle,
        reset,
      }}
    >
      {children}
    </BrowseContext.Provider>
  );
};

export const useBrowse = () => useContext(BrowseContext);
