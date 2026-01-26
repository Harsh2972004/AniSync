import ListAnimeCard from "./ListAnimeCard";

const AnimeListSection = ({
  status,
  animeInfo,
  animeList,
  onEditCardClick,
  onViewCardClick,
}) => {
  return (
    animeInfo?.animeList.find((i) => i.status === status) && (
      <div className="flex flex-col gap-4">
        <h3 className="font-bold text-xl">
          {status?.[0].toUpperCase() + status?.slice(1)}
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-6 gap-10">
          {animeList?.map((anime) => {
            const info = animeInfo?.animeList.find(
              (i) => i.animeId === anime.id
            );

            return (
              info &&
              info.status === status && (
                <ListAnimeCard
                  onEditClick={() => onEditCardClick(anime, info)}
                  onViewClick={() => onViewCardClick(anime, info)}
                  id={anime.id}
                  key={anime.id}
                  title={
                    anime.title.english ||
                    anime.title.romaji ||
                    anime.title.native
                  }
                  image={anime.coverImage.large}
                />
              )
            );
          })}
        </div>
      </div>
    )
  );
};

export default AnimeListSection;
