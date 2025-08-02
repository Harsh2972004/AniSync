import { useNavigate } from "react-router-dom";
import { useBrowse } from "../context/BrowseContext";
import { getSearchedAnime } from "../services/media";

const useSearchHandler = () => {
  const { setMode, setSubmittedSearchTerm, submittedSearchTerm } = useBrowse();
  const navigate = useNavigate();

  const handleSearch = (input) => {
    const trimmed = input.trim();
    if (!trimmed) return;
    setMode("search");
    setSubmittedSearchTerm(trimmed);
    navigate(`/browse?mode=search&title=${encodeURIComponent(trimmed)}`);
  };

  const fetchSearchAnime = async (page, searchQuery = submittedSearchTerm) => {
    try {
      if (!searchQuery) return [];
      const response = await getSearchedAnime(20, page, searchQuery);
      return response.data.mediaList;
    } catch (error) {
      console.log({ "error fetching": error });
      return [];
    }
  };

  return { handleSearch, fetchSearchAnime };
};

export default useSearchHandler;
