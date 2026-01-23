import { useEffect, useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import { getAnimeDetails } from "../services/media";
import parse from "html-react-parser";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { MdArrowDropDown } from "react-icons/md";
import RelationCard from "../components/RelationCard";
import CharacterCard from "../components/CharacterCard";
import EpisodeCard from "../components/EpisodeCard";
import RecommendationsCard from "../components/RecommendationsCard";
import { useUserContext } from "../context/UserListContext";
import ResponsiveParagraph from "../components/ResponsiveParagraph";

const DetailsPage = () => {
  const { id } = useParams();
  const {
    animeInfo,
    handleAddToFavourite,
    handleAddToList,
    isInList,
    isInFavourites,
  } = useUserContext();
  const [animeDetails, setAnimeDetails] = useState(null);
  const [timeLeft, setTimeLeft] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [statusDropdown, setStatusDropdown] = useState(false);

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const filteredRelations = animeDetails?.relations.edges.filter(
    (edge) =>
      edge.relationType !== "SUMMARY" &&
      edge.relationType !== "CHARACTER" &&
      edge.relationType !== "OTHER" &&
      edge.relationType !== "ALTERNATIVE"
  );

  const monthNumber = animeDetails?.startDate?.month; // 1-12
  const monthName = monthNumber ? monthNames[monthNumber - 1] : "";

  const inList = isInList(id);
  const inFavourites = isInFavourites(id);

  const airingAt = animeDetails?.nextAiringEpisode?.airingAt;

  const currentAnime = animeInfo?.animeList?.find(
    (anime) => anime.animeId === Number(id)
  );

  // Memoizing the parsed description to prevent infinite re-renders
  const parsedDescription = useMemo(() => {
    return parse(animeDetails?.description || "");
  }, [animeDetails?.description]);

  useEffect(() => {
    const fetchAnimeDetails = async () => {
      try {
        setIsLoading(true);
        const response = await getAnimeDetails(id);
        setAnimeDetails(response.data);
      } catch (error) {
        console.error("Error fetching anime details:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAnimeDetails();
  }, [id]);

  useEffect(() => {
    if (!airingAt) return;

    const updateTimer = () => {
      const now = Date.now();
      const diff = airingAt * 1000 - now;

      if (diff <= 0) {
        setTimeLeft("Now Airing!");
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      setTimeLeft(`${days}d ${hours}h ${minutes}m ${seconds}s`);
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000); // update every second

    return () => clearInterval(interval); // cleanup when component unmounts
  }, [airingAt]);

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center text-gray-400 ">
        Loading Anime details, please wait...
        <span className="absolute bottom-0 left-0 h-[2px] w-full bg-white animate-loading-bar" />
      </div>
    );
  }

  if (!isLoading) {
    return (
      <>
        {animeDetails?.bannerImage && (
          <img
            className="hidden mdl:block xl:block xl:max-h-[320px] w-full xl:h-full object-cover"
            src={animeDetails?.bannerImage}
            alt={`${animeDetails?.title.english}-bannerImage`}
          />
        )}
        <div className="bg-primary">
          <div className="container-spacing px-8 mdl:px-14 xl:px-0 grid mdl:grid-cols-[auto_1fr] gap-y-10 gap-x-14 ">
            <div className="flex flex-col gap-4">
              <img
                className="xl:-mt-32 w-full mdl:w-[300px] xl:max-h-[390px] aspect-auto shadow-lg"
                src={animeDetails?.coverImage.extraLarge}
                alt={`${
                  animeDetails?.title.english ||
                  animeDetails?.title.romaji ||
                  animeDetails?.title.native
                }-Image`}
              />
              <div className="w-full flex justify-between ">
                <button
                  onClick={() => setStatusDropdown(!statusDropdown)}
                  className="w-[80%] relative border-2 rounded-lg px-4 py-2 flex items-center justify-center"
                >
                  {inList ? (
                    currentAnime?.status ? (
                      currentAnime.status.charAt(0).toUpperCase() +
                      currentAnime.status.slice(1)
                    ) : (
                      "Loading..."
                    )
                  ) : (
                    <span className="flex items-center justify-center">
                      Add to list
                      <MdArrowDropDown className="absolute right-2" size={24} />
                    </span>
                  )}
                  <div
                    className={`${
                      statusDropdown && !inList && "open"
                    } absolute top-[120%] flex flex-col bg-secondary w-full rounded-lg dropdown hide-scrollbar space-y-3`}
                  >
                    <span onClick={() => handleAddToList(id, "planning")}>
                      Planning
                    </span>
                    <span onClick={() => handleAddToList(id, "watching")}>
                      Watching
                    </span>
                    <span onClick={() => handleAddToList(id, "completed")}>
                      Completed
                    </span>
                    <span onClick={() => handleAddToList(id, "dropped")}>
                      Dropped
                    </span>
                  </div>
                </button>
                <button
                  onClick={() => handleAddToFavourite(id)}
                  className="bg-red-500 rounded-lg p-2"
                >
                  {inFavourites ? (
                    <FaHeart size={26} />
                  ) : (
                    <FaRegHeart size={26} />
                  )}
                </button>
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <h1 className="text-3xl font-bold">
                {animeDetails?.title.english ||
                  animeDetails?.title.romaji ||
                  animeDetails?.title.native}
              </h1>
              <ResponsiveParagraph text={parsedDescription} />
            </div>
          </div>
        </div>

        {/* formats and genres */}
        <div className="container-spacing px-8 mdl:px-14 xl:px-0 grid mdl:grid-cols-[auto_1fr] grid-rows-[auto] gap-14">
          <div className="xl:w-[300px] row-span-2  ">
            <div className="bg-primary rounded-lg py-6 px-8 flex flex-col  gap-4">
              <div>
                <h1 className="font-bold">Format</h1>
                <span className="text-gray-300 text-sm">
                  {animeDetails?.format}
                </span>
              </div>
              <div>
                <h1 className="font-bold">Status</h1>
                <span className="text-gray-300 text-sm">
                  {animeDetails?.status}
                </span>
              </div>
              <div>
                <h1 className="font-bold">Episodes</h1>
                <span className="text-gray-300 text-sm font-semibold">
                  {animeDetails?.episodes ||
                    `${
                      animeDetails?.nextAiringEpisode?.episode - 1
                    } and more coming`}
                </span>
              </div>
              {airingAt && (
                <div>
                  <h1 className="font-bold">Next Airing Episode</h1>
                  <span className="text-gray-300 text-sm font-semibold">
                    Episode {animeDetails?.nextAiringEpisode?.episode} in{" "}
                    <span className="text-blue-500 font-bold">{timeLeft}</span>
                  </span>
                </div>
              )}
              <div>
                <h1 className="font-bold">Start Date</h1>
                <span className="text-gray-300 text-sm">{`${monthName} ${animeDetails?.startDate.day}, ${animeDetails?.startDate.year}`}</span>
              </div>
              <div>
                <h1 className="font-bold">Season</h1>
                <span className="text-gray-300 text-sm">{`${animeDetails?.season} ${animeDetails?.startDate.year}`}</span>
              </div>
              <div>
                <h1 className="font-bold">Popularity</h1>
                <span className="text-gray-300 text-sm">
                  {animeDetails?.popularity}
                </span>
              </div>
              <div>
                <h1 className="font-bold">Favourites</h1>
                <span className="text-gray-300 text-sm">
                  {animeDetails?.favourites}
                </span>
              </div>
              <div>
                <h1 className="font-bold">Studios</h1>
                {animeDetails?.studios.edges.map((studio) => {
                  return (
                    studio.isMain && (
                      <span
                        className="text-gray-300 text-sm"
                        key={studio.node.name}
                      >
                        {studio.node.name}
                      </span>
                    )
                  );
                })}
              </div>
              <div className="flex flex-col">
                <h1 className="font-bold">Genres</h1>
                {animeDetails?.genres.map((genre) => (
                  <span className="text-gray-300 text-sm" key={genre}>
                    {genre}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* relations */}
          <div className="grid grid-cols-3 xl:grid-cols-5 gap-x-8 gap-y-2">
            <h3 className="col-span-5 font-bold text-lg">Relations</h3>
            {filteredRelations?.map((relation, index) => (
              <RelationCard
                key={index}
                image={relation.node.coverImage.large}
                title={relation.node.title.english}
                relationType={relation.relationType}
              />
            ))}
          </div>

          {/* Voice actors and characters */}
          <div className="grid xl:grid-cols-2 grid-rows-3 gap-4 w-full">
            {animeDetails?.characters.edges.map((edge) => (
              <CharacterCard
                key={edge.node.name.full}
                charImage={edge.node.image.large}
                charName={edge.node.name.full}
                charRole={edge.role}
                voiceActor={edge.voiceActors[0]?.name.full}
                voiceActorImg={edge.voiceActors[0]?.image.large}
                voiceActorLang={edge.voiceActors[0]?.language}
              />
            ))}
          </div>
        </div>

        {/* Trailer and Episodes */}
        <div className="container-spacing px-8 mdl:px-14 xl:px-0 grid xl:grid-cols-[560px_1fr] grid-rows-[auto] gap-8">
          <div className="xl:w-[560px] xl:h-[315px] flex flex-col gap-2">
            <h3 className="text-lg font-bold">Trailer</h3>

            {animeDetails?.trailer?.site === "youtube" && (
              <div>
                <iframe
                  src={`https://www.youtube.com/embed/${animeDetails.trailer.id}`}
                  title="YouTube trailer"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="rounded-md h-[200px] w-full mdl:h-[380px] xl:w-[560px] xl:h-[320px]"
                ></iframe>
              </div>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <h3 className="text-lg font-bold">Watch</h3>
            <div className="grid grid-cols-2 xl:grid-cols-3 gap-x-8 gap-y-6">
              {animeDetails?.streamingEpisodes?.map((ep, index) => {
                if (index < 6) {
                  return (
                    <EpisodeCard
                      key={ep.title}
                      title={ep.title}
                      url={ep.url}
                      thumbnail={ep.thumbnail}
                    />
                  );
                }
              })}
            </div>
          </div>
        </div>

        {/* recommendations */}
        <div className="container-spacing px-8 mdl:px-14 mt-8 xl:px-0 flex flex-col gap-4 pt-0">
          <h3 className="text-lg font-bold">Recommendations</h3>
          <div className="flex flex-wrap justify-between mdl:justify-start xl:justify-between gap-14 mdl:gap-24 xl:gap-8">
            {animeDetails?.recommendations.edges.map((edge) => (
              <RecommendationsCard
                key={edge.node.mediaRecommendation.id}
                title={
                  edge.node.mediaRecommendation.title.english ||
                  edge.node.mediaRecommendation.title.romaji ||
                  edge.node.mediaRecommendation.title.native
                }
                image={edge.node.mediaRecommendation.coverImage.large}
                id={edge.node.mediaRecommendation.id}
              />
            ))}
          </div>
        </div>
      </>
    );
  }
};

export default DetailsPage;
