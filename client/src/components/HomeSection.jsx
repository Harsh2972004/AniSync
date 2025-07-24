import AnimeCard from "./animeCard";
import onePiece from "../assets/images/onepiece.jpg";

const HomeSection = ({ title }) => {
  return (
    <section className="container-spacing flex flex-col gap-4 ">
      <h1 className="text-2xl font-bold">{title}</h1>
      <div className="flex justify-between">
        <AnimeCard
          title={"one-Piece"}
          animeImg={onePiece}
          airSince="dunno when"
          genres="action"
        />
        <AnimeCard
          title={"one-Piece"}
          animeImg={onePiece}
          airSince="dunno when"
          genres="action"
        />
        <AnimeCard
          title={"one-Piece"}
          animeImg={onePiece}
          airSince="dunno when"
          genres="action"
        />
        <AnimeCard
          title={"one-Piece"}
          animeImg={onePiece}
          airSince="dunno when"
          genres="action"
        />
      </div>
    </section>
  );
};

export default HomeSection;
