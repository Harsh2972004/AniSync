import AnimeCard from "./animeCard";
import { Link } from "react-router-dom";
import {
  getTrendingAnime,
  getAllTimePopularAnime,
  getPopularThisSeasonAnime,
  getUpcomingNextSeasonAnime,
} from "../services/media";
import { useEffect, useState } from "react";

const HomeSection = ({ title, fetchType, limit = 4 }) => {
  const [animeList, setAnimeList] = useState([]);

  useEffect(() => {
    const fetchAnimeList = async () => {
      try {
        let response;
        switch (fetchType) {
          case "trending":
            response = await getTrendingAnime(limit);
            break;
          case "allTimePopular":
            response = await getAllTimePopularAnime(limit);
            break;
          case "upcoming":
            response = await getUpcomingNextSeasonAnime(limit);
            break;
          case "thisSeason":
            response = await getPopularThisSeasonAnime(limit);
            break;
          default:
            response = await getTrendingAnime(limit);
            break;
        }
        const data = response.data.mediaList;
        setAnimeList(data);
      } catch (error) {
        console.error("Error fetching anime list:", error);
      }
    };
    fetchAnimeList();
  }, [fetchType, limit]);

  return (
    <section className="container-spacing flex flex-col w-full gap-6 ">
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold">{title}</h1>
        <Link to="/browse">
          <span className="text-gray-400">View All</span>
        </Link>
      </div>
      <div className="flex justify-between w-full">
        {(animeList || []).map((anime) => {
          return (
            <AnimeCard
              key={anime.id}
              title={anime.title.english}
              animeImg={anime.coverImage.large}
              airSince={anime.startDate.year}
              genres={anime.genres.slice(0, 3)}
            />
          );
        })}
        {/* <AnimeCard
          title={"One Piece"}
          animeImg={onePiece}
          airSince="dunno when"
          genres={["action", "adventure", "drama"]}
        />
        <AnimeCard
          title={"Ore dake level up na ken: season 2"}
          animeImg={onePiece}
          airSince="dunno when"
          genres={["action", "adventure", "drama"]}
        />
        <AnimeCard
          title={"one-Piece"}
          animeImg={onePiece}
          airSince="dunno when"
          genres={["action", "adventure", "drama"]}
        />
        <AnimeCard
          title={"one-Piece"}
          animeImg={onePiece}
          airSince="dunno when"
          genres={["action", "adventure", "drama"]}
        /> */}
      </div>
    </section>
  );
};

export default HomeSection;
