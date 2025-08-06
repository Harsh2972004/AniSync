import { useContext, createContext, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

const BrowseContext = createContext();

export const BrowseProvider = ({ children }) => {
  const [mode, setMode] = useState("default"); // default || filtered || search || sectionViewAll
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

  const location = useLocation();

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

  useEffect(() => {
    if (location.pathname !== "/browse" && mode === "sectionViewAll") {
      setMode("default");
      setSectionType(null);
    }
  }, [location.pathname, mode]);

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
