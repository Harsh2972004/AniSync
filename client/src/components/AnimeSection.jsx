import AnimeCard from "./animeCard";
import { useNavigate } from "react-router-dom";
import {
  getTrendingAnime,
  getAllTimePopularAnime,
  getPopularThisSeasonAnime,
  getUpcomingNextSeasonAnime,
} from "../services/media";
import { useEffect, useState } from "react";
import SkeletonCard from "./SkeletonCard";
import { useBrowse } from "../context/BrowseContext";

const AnimeSection = ({ title, fetchType, limit = 4, inBrowse = false }) => {
  const [animeList, setAnimeList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { mode, sectionType, setMode, setSectionType } = useBrowse();

  const displayLimit =
    inBrowse && mode === "sectionViewAll" && sectionType === fetchType ? 20 : 4;

  const handleViewAll = () => {
    if (inBrowse) {
      setMode("sectionViewAll");
      setSectionType({ fetchType: fetchType, title: title });
    } else {
      navigate(
        `/browse?mode=sectionViewAll&sectionType=${fetchType}&title=${encodeURIComponent(
          title
        )}`
      );
    }
    console.log(mode, sectionType);
  };

  useEffect(() => {
    setIsLoading(true);
    const fetchAnimeList = async () => {
      try {
        let response;
        switch (fetchType) {
          case "trending":
            response = await getTrendingAnime(displayLimit);
            break;
          case "allTimePopular":
            response = await getAllTimePopularAnime(displayLimit);
            break;
          case "upcoming":
            response = await getUpcomingNextSeasonAnime(displayLimit);
            break;
          case "thisSeason":
            response = await getPopularThisSeasonAnime(displayLimit);
            break;
          default:
            response = await getTrendingAnime(displayLimit);
            break;
        }
        const data = response.data.mediaList;
        setAnimeList(data);
      } catch (error) {
        console.error("Error fetching anime list:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchAnimeList();
  }, [fetchType, limit]);

  return (
    <section className="container-spacing flex flex-col w-full gap-6 ">
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold">{title}</h1>
        <button
          onClick={handleViewAll}
          className={`text-gray-400 ${mode === "sectionViewAll" && "hidden"}`}
        >
          View All
        </button>
      </div>
      <div className="flex justify-between flex-wrap gap-y-20 w-full">
        {isLoading
          ? Array.from({ length: displayLimit }).map((_, index) => (
              <SkeletonCard key={index} />
            ))
          : animeList.map((anime) => {
              return (
                <AnimeCard
                  key={anime.id}
                  id={anime.id}
                  title={anime.title.english}
                  animeImg={anime.coverImage.large}
                  airSince={anime.startDate.year}
                  genres={anime.genres.slice(0, 3)}
                />
              );
            })}
      </div>
    </section>
  );
};

export default AnimeSection;
