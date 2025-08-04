import { useNavigate } from "react-router-dom";
import { useBrowse } from "../context/BrowseContext";
import { getSearchedAnime } from "../services/media";
import { useCallback } from "react";

const useSearchHandler = () => {
  const { setMode, setSubmittedSearchTerm, submittedSearchTerm, filters } =
    useBrowse();
  const navigate = useNavigate();

  const handleSearch = (input) => {
    const trimmed = input.trim();
    if (!trimmed) return;
    setMode("search");
    setSubmittedSearchTerm(trimmed);
    navigate(`/browse?mode=search&title=${encodeURIComponent(trimmed)}`);
    console.log(trimmed);
  };

  const handleFilters = () => {
    if (!filters) return;

    setMode("filtered");
    navigate(`/browse?mode=filtered`);
    console.log(filters);
  };

  const fetchSearchResults = useCallback(
    async (page, searchQuery = submittedSearchTerm) => {
      try {
        const isEmpty = Object.values(filters).every(
          (value) => value === "" || value === null || value === undefined
        );
        if (!submittedSearchTerm && isEmpty) {
          navigate("/browse");
          return [];
        }
        console.log("Searching for:", submittedSearchTerm, "page:", page);
        const response = await getSearchedAnime(20, page, searchQuery, filters);
        console.log("Search response:", response.data);
        return response.data.mediaList || [];
      } catch (error) {
        console.error("Error fetching search results:", error);
        if (error.response) {
          console.error("Response data:", error.response.data);
          console.error("Response status:", error.response.status);
        }
        return [];
      }
    }
  );

  return { handleSearch, fetchSearchResults, handleFilters };
};

export default useSearchHandler;
