import AnimeCard from "./animeCard";
import onePiece from "../assets/images/onepiece.jpg";

const HomeSection = ({ title }) => {
  return (
    <section className="container-spacing flex flex-col w-full gap-6 ">
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold">{title}</h1>
        <span className="text-gray-400">View All</span>
      </div>
      <div className="flex justify-between w-full">
        <AnimeCard
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
        />
      </div>
    </section>
  );
};

export default HomeSection;
