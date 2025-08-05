import AnimeCard from "./AnimeCard";
import SkeletonCard from "./SkeletonCard";
import useInfiniteScroll from "../hooks/useInfiniteScroll";
import useSearchHandler from "../hooks/useSearchHandler";

const SearchResults = ({ submittedSearchTerm, title, filters }) => {
  const { fetchSearchResults } = useSearchHandler();

  const {
    data: searchResults,
    lastAnimeRef,
    isLoading,
  } = useInfiniteScroll(fetchSearchResults, [submittedSearchTerm, filters]);

  const uniqueSearchResults = Array.from(
    new Map(searchResults.map((item) => [item.id, item])).values()
  );

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
            No results found for "{submittedSearchTerm}"
          </p>
          <p className="text-gray-400 mt-2">
            Try searching with different keywords
          </p>
        </div>
      )}
      {isLoading && (
        <div className="text-center py-12">
          <p className="text-gray-400 text-lg">
            Searching results for "{submittedSearchTerm}"
          </p>
          <p className="text-gray-500 mt-2">please wait.. </p>
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
              animeImg={anime.coverImage.extraLarge}
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
