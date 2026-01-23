import { useUserContext } from "../context/UserListContext";

const SelectedAnimeView = ({
  id,
  title,
  coverImage,
  bannerImage,
  show,
  setShow,
  setModalOpen,
}) => {
  const { animeInfo, isInFavourites } = useUserContext();

  const currentAnime = animeInfo?.animeList?.find(
    (anime) => anime.animeId === Number(id)
  );

  const inFavourites = isInFavourites(id);

  return (
    <div>
      {" "}
      <img
        className="w-full h-[15vh] lg:h-1/3 bg-cover object-cover rounded-t-lg"
        src={bannerImage}
        alt={`
    ${title}-bannerImage`}
      />
      <div className="w-[90%] pb-4 px-2 lg:p-0 mx-auto mt-8 flex flex-col lg:flex-row gap-10 lg:gap-4">
        <div className="flex gap-4 basis-1/2">
          <img
            className="w-20 lg:w-40 max-h-[120px] lg:max-h-[220px] rounded-md"
            src={coverImage}
            alt={`${title}-coverImage`}
          />
          <div>
            <div className="space-y-4">
              <h1 className="lg:text-xl font-bold lg:max-w-[75%] border-b-2">
                {title}
              </h1>
              <div className="space-y-1">
                <p className="text-sm md:text-base text-gray-300">
                  Status:{" "}
                  <span className="font-semibold">
                    {currentAnime.status[0].toUpperCase() +
                      currentAnime.status.slice(1)}
                  </span>
                </p>
                <p className="text-sm md:text-base text-gray-300">
                  Progress:{" "}
                  <span className="font-semibold">{currentAnime.progress}</span>
                </p>
                <p className="text-sm md:text-base text-gray-300">
                  Score:{" "}
                  <span className="font-semibold">{currentAnime.score}</span>
                </p>
                <p className="text-[12px] md:text-base text-gray-400 lg:max-w-[75%] pt-4">
                  {inFavourites
                    ? "This Anime is in your favourites."
                    : "Not Favourited"}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="basis-1/2 text-center flex flex-col gap-1">
          <h3>Notes:</h3>
          <p
            className={`w-full h-full bg-secondary break-words p-4 rounded-lg ${!currentAnime.notes && "text-gray-500"
              }`}
          >
            {currentAnime.notes ||
              "You haven't written your thougts on this anime..."}
          </p>
        </div>
      </div>
    </div>
  );
};

export default SelectedAnimeView;
