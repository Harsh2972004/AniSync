import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getAnimeDetails } from "../services/media";
import parse from "html-react-parser";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { MdArrowDropDown } from "react-icons/md";
import RelationCard from "../components/RelationCard";
import CharacterCard from "../components/CharacterCard";
import EpisodeCard from "../components/EpisodeCard";
import RecommendationsCard from "../components/RecommendationsCard";

const DetailsPage = () => {
  const { id } = useParams();
  const [animeDetails, setAnimeDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

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

  useEffect(() => {
    try {
      setIsLoading(true);
      const fetchAnimeDetails = async () => {
        const response = await getAnimeDetails(id);
        setAnimeDetails(response.data);
        console.log(response.data);
      };

      fetchAnimeDetails();
    } catch (error) {
      console.log("error fetching anime details:", error);
    } finally {
      setIsLoading(false);
    }
  }, [id]);

  if (isLoading) {
    return <div>...Loading</div>;
  }

  return (
    <>
      {animeDetails?.bannerImage && (
        <img
          src={animeDetails?.bannerImage}
          alt={`${animeDetails?.title.english}-bannerImage`}
        />
      )}
      <div className="bg-primary">
        <div className="container-spacing grid grid-cols-[auto_1fr] gap-y-10 gap-x-14 ">
          <div className="flex flex-col gap-4">
            <img
              className="-mt-32 w-[300px] max-h-[390px] aspect-auto shadow-lg"
              src={animeDetails?.coverImage.extraLarge}
              alt={`${animeDetails?.title.english}-Image`}
            />
            <div className="w-full flex justify-between ">
              <button className="w-[80%] relative border-2 rounded-lg px-4 py-2 flex items-center justify-center">
                Add to list
                <MdArrowDropDown className="absolute right-2" size={24} />
              </button>
              <button className="bg-red-500 rounded-lg p-2">
                <FaRegHeart size={26} />
              </button>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <h1 className="text-3xl font-bold">
              {animeDetails?.title.english}
            </h1>
            <p className="text-md text-gray-300">
              {parse(animeDetails?.description || "")}
            </p>
          </div>
        </div>
      </div>
      <div className="container-spacing grid grid-cols-[auto_1fr] grid-rows-[auto] gap-14">
        <div className="w-[300px] row-span-2  ">
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
        <div className="grid grid-cols-5 gap-x-8 gap-y-2">
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
        <div className="grid grid-cols-2 grid-rows-3 gap-4 w-full">
          {animeDetails?.characters.edges.map((edge) => (
            <CharacterCard
              key={edge.node.name.full}
              charImage={edge.node.image.large}
              charName={edge.node.name.full}
              charRole={edge.role}
              voiceActor={edge.voiceActors[0].name.full}
              voiceActorImg={edge.voiceActors[0].image.large}
            />
          ))}
        </div>
      </div>
      <div className="container-spacing grid grid-cols-[auto_1fr] grid-rows-[auto] gap-8">
        {animeDetails?.trailer?.site === "youtube" && (
          <div>
            <iframe
              width="560"
              height="315"
              src={`https://www.youtube.com/embed/${animeDetails.trailer.id}`}
              title="YouTube trailer"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="rounded-md"
            ></iframe>
          </div>
        )}
        <div className="grid grid-cols-3 grid-rows-2 gap-x-8 gap-y-6">
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
      <div className="container-spacing flex flex-col gap-4 pt-0">
        <h3 className="text-lg font-bold">Recommendations</h3>
        <div className="flex flex-wrap justify-between gap-8">
          {animeDetails?.recommendations.edges.map((edge) => (
            <RecommendationsCard
              key={edge.node.mediaRecommendation.id}
              title={edge.node.mediaRecommendation.title.english}
              image={edge.node.mediaRecommendation.coverImage.large}
              id={edge.node.mediaRecommendation.id}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default DetailsPage;
