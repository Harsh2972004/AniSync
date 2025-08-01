import AnimeCard from "./AnimeCard";
import SkeletonCard from "./SkeletonCard";
import useInfiniteScroll from "../hooks/useInfiniteScroll";
import { getSearchedAnime } from "../services/media";

const SearchResults = ({ searchTerm, title, filters }) => {
  const fetchSearchResults = async (page) => {
    try {
      if (!searchTerm) return [];
      console.log("Searching for:", searchTerm, "page:", page);
      const response = await getSearchedAnime(20, page, searchTerm, filters);
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
  };

  const {
    data: searchResults,
    lastAnimeRef,
    isLoading,
  } = useInfiniteScroll(fetchSearchResults, [searchTerm]);

  const uniqueSearchResults = Array.from(
    new Map(searchResults.map((item) => [item.id, item])).values()
  );
  if (!searchTerm) {
    return (
      <section className="container-spacing flex flex-col w-full gap-6">
        <h1 className="text-2xl font-bold">{title}</h1>
        <p className="text-gray-500">Enter a search term to find anime</p>
      </section>
    );
  }

  return (
    <section className="container-spacing flex flex-col w-full gap-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">{title}</h1>
        {uniqueSearchResults.length > 0 && (
          <span className="text-gray-500">
            {uniqueSearchResults.length} result
            {uniqueSearchResults.length !== 1 ? "s" : ""}
          </span>
        )}
      </div>

      {uniqueSearchResults.length === 0 && !isLoading && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">
            No results found for "{searchTerm}"
          </p>
          <p className="text-gray-400 mt-2">
            Try searching with different keywords
          </p>
        </div>
      )}

      <div className="grid grid-cols-4 gap-x-10 gap-y-20 w-full">
        {uniqueSearchResults.map((anime, index) => {
          const isLast = index === uniqueSearchResults.length - 1;
          return (
            <AnimeCard
              key={anime.id}
              id={anime.id}
              title={anime.title?.english || anime.title.romaji}
              animeImg={anime.coverImage.large}
              airSince={anime.startDate?.year}
              genres={anime.genres?.slice(0, 3)}
              ref={isLast ? lastAnimeRef : null}
            />
          );
        })}

        {isLoading &&
          Array.from({ length: 4 }).map((_, index) => (
            <SkeletonCard key={index} />
          ))}
      </div>
    </section>
  );
};

export default SearchResults;
