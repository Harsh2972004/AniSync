import { useContext, createContext, useState } from "react";

const BrowseContext = createContext();

export const BrowseProvider = ({ children }) => {
  const [mode, setMode] = useState(""); // default || filtered || search || sectionViewAll
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    genre: "",
    seasonYear: "",
    season: "",
    format: "",
    streamingOn: "",
    countryOfOrigin: "",
    sources: "",
  });
  const [sectionType, setSectionType] = useState(null);
  const [title, setTitle] = useState("");
  const [submittedSearchTerm, setSubmittedSearchTerm] = useState("");

  const reset = () => {
    setMode("default");
    setSectionType(null);
    setFilters({
      genre: "",
      seasonYear: "",
      season: "",
      format: "",
      streamingOn: "",
      countryOfOrigin: "",
      sources: "",
    });
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
        submittedSearchTerm,
        setSubmittedSearchTerm,
      }}
    >
      {children}
    </BrowseContext.Provider>
  );
};

export const useBrowse = () => useContext(BrowseContext);
