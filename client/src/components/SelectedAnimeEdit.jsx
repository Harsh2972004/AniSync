import { FaHeart, FaRegHeart } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useUserContext } from "../context/UserListContext";
import SelectedAnimeInput from "./SelectedAnimeInput";
import { useState } from "react";
import { deleteAnime, deleteFavourite } from "../services/list";

const SelectedAnimeEdit = ({
  id,
  title,
  coverImage,
  bannerImage,
  episodeNumber,
  setModalOpen,
}) => {
  const {
    animeInfo,
    setAnimeInfo,
    updateAnimeInfo,
    isInFavourites,
    handleAddToFavourite,
    getAnimeList,
  } = useUserContext();

  const [animeProgress, setAnimeProgress] = useState({
    status: "",
    progress: "",
    score: "",
    notes: "",
  });

  let episodes = [];

  for (let index = 1; index <= episodeNumber; index++) {
    episodes.push(index);
  }

  const onEnumClick = (key, selectedEnum) => {
    setAnimeProgress((prev) => ({ ...prev, [key]: selectedEnum }));
  };

  const currentAnime = animeInfo?.animeList?.find(
    (anime) => anime.animeId === Number(id)
  );

  const updateProgress = async () => {
    try {
      const response = await updateAnimeInfo(
        currentAnime.animeId,
        animeProgress.status || currentAnime.status,
        animeProgress.progress || currentAnime.progress,
        animeProgress.score || currentAnime.score,
        animeProgress.notes || currentAnime.notes
      );
      console.log("udpated:", response.data);

      setAnimeInfo((prev) => ({
        ...prev,
        animeList: prev.animeList.map((anime) =>
          anime.animeId === currentAnime.animeId
            ? {
                ...anime,
                status: animeProgress.status || currentAnime.status,
                progress: animeProgress.progress || currentAnime.progress,
                score: animeProgress.score || currentAnime.score,
                notes: animeProgress.notes || currentAnime.notes,
              }
            : anime
        ),
      }));
      setAnimeProgress({
        status: "",
        progress: "",
        score: "",
        notes: "",
      });
      setModalOpen(false);
    } catch (error) {
      console.log("updation failed:", error.message, error.response.data);
    }
  };

  const inFavourites = isInFavourites(id);

  const handleDeleteAnime = async (animeId) => {
    try {
      const response = await deleteAnime(animeId);
      console.log(response.data);
      getAnimeList();
      setModalOpen(false);
    } catch (error) {
      console.log(error.response.data);
    }
  };

  return (
    <div>
      <img
        className="w-full h-1/3 max-h-[210px] object-cover rounded-t-lg"
        src={bannerImage}
        alt={`
          ${title}-bannerImage`}
      />
      <div className="w-[90%] mx-auto mt-8 flex">
        <div className="flex gap-4 basis-1/2">
          <img
            className="w-40 max-h-[220px] rounded-md"
            src={coverImage}
            alt={`${title}-coverImage`}
          />
          <div className="space-y-4">
            <h1 className="text-xl font-bold max-w-[75%] border-b-2">
              {title}
            </h1>
            <div className="space-y-1">
              <p className="text-gray-300">
                Status:{" "}
                <span className="font-semibold">
                  {currentAnime.status[0]?.toUpperCase() +
                    currentAnime.status.slice(1)}
                </span>
              </p>
              <p className="text-gray-300">
                Progress:{" "}
                <span className="font-semibold">{currentAnime.progress}</span>
              </p>
              <p className="text-gray-300">
                Score:{" "}
                <span className="font-semibold">{currentAnime.score}</span>
              </p>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 grid-rows-3 gap-8 justify-between items-start basis-1/2">
          {/* status */}
          <SelectedAnimeInput
            id={id}
            title={"status"}
            value={animeProgress.status}
            selectedEnums={["planning", "watching", "completed", "dropped"]}
            onClick={onEnumClick}
            setAnimeProgress={setAnimeProgress}
          />
          {/* progress */}
          <SelectedAnimeInput
            id={id}
            title={"progress"}
            value={animeProgress.progress}
            selectedEnums={episodes}
            onClick={onEnumClick}
            progress={true}
            setAnimeProgress={setAnimeProgress}
          />
          {/* score */}
          <SelectedAnimeInput
            id={id}
            title={"score"}
            value={animeProgress.score}
            selectedEnums={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
            onClick={onEnumClick}
            setAnimeProgress={setAnimeProgress}
          />
          <div className="flex flex-col gap-2 w-[200px] row-span-2">
            <label className="font-semibold" htmlFor="notes">
              notes
            </label>
            <textarea
              className="rounded-md w-full min-h-10 max-h-28 px-3 py-2 bg-secondary hide-scrollbar"
              name="notes"
              id="notes"
              type="text"
              maxLength={300}
              placeholder="Write your experience"
              value={animeProgress.notes || ""}
              onChange={(e) =>
                setAnimeProgress((prev) => ({ ...prev, notes: e.target.value }))
              }
            />
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => handleDeleteAnime(id)}
              className="p-2 border-2 border-red-500 rounded-md font-semibold text-sm text-red-500"
            >
              <MdDelete size={25} />
            </button>
            <button
              onClick={() => handleAddToFavourite(id)}
              className=" p-2 border-2 rounded-md  font-semibold text-sm"
            >
              {inFavourites ? <FaHeart size={24} /> : <FaRegHeart size={24} />}
            </button>
            <button
              onClick={updateProgress}
              className="px-4 py-2 border-2 rounded-md font-semibold text-sm"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelectedAnimeEdit;
