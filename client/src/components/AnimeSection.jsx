import AnimeCard from "./AnimeCard";
import { useNavigate } from "react-router-dom";
import {
  getTrendingAnime,
  getAllTimePopularAnime,
  getPopularThisSeasonAnime,
  getUpcomingNextSeasonAnime,
} from "../services/media";
import SkeletonCard from "./SkeletonCard";
import { useBrowse } from "../context/BrowseContext";
import useInfiniteScroll from "../hooks/useInfiniteScroll";

const AnimeSection = ({ title, fetchType, inBrowse = false }) => {
  const navigate = useNavigate();
  const { mode, sectionType, setMode, setSectionType } = useBrowse();

  const displayLimit =
    inBrowse && mode === "sectionViewAll" && sectionType === fetchType ? 20 : 4;

  const handleViewAll = () => {
    if (inBrowse) {
      setMode("sectionViewAll");
      setSectionType(fetchType);
    } else {
      navigate(
        `/browse?mode=sectionViewAll&sectionType=${fetchType}&title=${encodeURIComponent(
          title
        )}`
      );
    }
  };

  const fetchAnimeList = async (page) => {
    try {
      const limit =
        inBrowse && mode === "sectionViewAll" && sectionType === fetchType
          ? 20
          : 4;

      let response;
      switch (fetchType) {
        case "trending":
          response = await getTrendingAnime(limit, page);
          break;
        case "allTimePopular":
          response = await getAllTimePopularAnime(limit, page);
          break;
        case "upcoming":
          response = await getUpcomingNextSeasonAnime(limit, page);
          break;
        case "thisSeason":
          response = await getPopularThisSeasonAnime(limit, page);
          break;
        default:
          response = await getTrendingAnime(limit, page);
          break;
      }
      return response.data.mediaList;
    } catch (error) {
      console.error("Error fetching anime list:", error);
    }
  };

  const {
    data: animeList,
    lastAnimeRef,
    isLoading,
  } = useInfiniteScroll(
    fetchAnimeList,
    [fetchType, mode, sectionType],
    fetchType,
    mode
  );

  const uniqueAnimeList = Array.from(
    new Map(animeList.map((item) => [item.id, item])).values()
  );

  const isViewAll = inBrowse && mode === "sectionViewAll" && sectionType === fetchType;

  const getPreviewLimit = () => {
    if (window.innerWidth >= 960) return 4; // xl
    if (window.innerWidth >= 667) return 3;  // md
    return 4; // mobile (2x2)
  };

  const previewLimit = getPreviewLimit();

  const visibleAnimeList = isViewAll
    ? uniqueAnimeList
    : uniqueAnimeList.slice(0, previewLimit);

  return (
    <section className="container-spacing flex flex-col w-full gap-6 ">
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold w-[60%]">{title}</h1>
        <button
          onClick={handleViewAll}
          className={`text-gray-400 xl:base ${inBrowse && mode === "sectionViewAll" && "hidden"
            }`}
        >
          View All
        </button>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 gap-y-20 w-full">
        {animeList.length === 0 && isLoading
          ? Array.from({ length: 4 }).map((_, index) => (
            <SkeletonCard key={index} />
          ))
          : visibleAnimeList.map((anime, index) => {
            const isLast =
              index === visibleAnimeList.length - 1 &&
              visibleAnimeList.length >= displayLimit;
            const shouldAttachRef =
              inBrowse &&
              mode === "sectionViewAll" &&
              sectionType === fetchType;
            return (
              <AnimeCard
                key={anime.id}
                id={anime.id}
                title={anime.title?.english || anime.title.romaji}
                animeImg={anime.coverImage.extraLarge}
                airSince={anime.startDate.year}
                genres={anime.genres.slice(0, 3)}
                ref={isLast && shouldAttachRef ? lastAnimeRef : null}
              />
            );
          })}

        {isLoading &&
          uniqueAnimeList.length > 0 &&
          Array.from({ length: 4 }).map((_, index) => (
            <SkeletonCard key={index} />
          ))}
      </div>
    </section>
  );
};

export default AnimeSection;
