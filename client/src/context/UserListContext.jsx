import {
  useState,
  useEffect,
  useContext,
  createContext,
  useCallback,
} from "react";
import {
  getAnimeForList,
  getFavourites,
  getList,
  updateAnimeProgress,
  addToFavourite,
  addToList,
} from "../services/list";

const UserListContext = createContext();

export const UserListProvider = ({ children }) => {
  const [listTitle, setListTitle] = useState("Anime List");
  const [animeList, setAnimeList] = useState(null);
  const [animeInfo, setAnimeInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleAddToList = async (id) => {
    try {
      if (animeInfo?.animeList.some((anime) => anime.animeId == id)) {
        console.log("already added to the list");
      } else {
        setAnimeInfo((prev) => ({
          ...prev,
          animeList: [...(prev?.animeList || []), { animeId: Number(id) }],
        }));
        const response = await addToList(id);
        console.log(response.data);
      }
    } catch (error) {
      console.log(
        "error adding to the list:",
        error.message,
        error.response.data
      );
      setAnimeInfo((prev) => ({
        ...prev,
        animeList: prev.animeList.filter(
          (anime) => anime.animeId !== Number(id)
        ),
      }));
    }
  };

  const handleAddToFavourite = async (id) => {
    try {
      if (animeInfo.favourites.some((anime) => anime == id)) {
        console.log("already added to favourites");
      } else {
        setAnimeInfo((prev) => ({
          ...prev,
          favourites: [...(prev?.favourites || []), Number(id)],
        }));

        const response = await addToFavourite(id);
        console.log(response.data);
      }
    } catch (error) {
      console.log(
        "error adding to the favourite:",
        error.message,
        error.response?.data
      );
      setAnimeInfo((prev) => ({
        ...prev,
        favourites: prev.favourites.filter((anime) => anime !== Number(id)),
      }));
    }
  };

  const isInList = useCallback(
    (animeId) =>
      animeInfo?.animeList.some((anime) => anime.animeId === Number(animeId)),
    [animeInfo]
  );

  const isInFavourites = useCallback(
    (animeId) =>
      animeInfo?.favourites.some((anime) => anime === Number(animeId)),
    [animeInfo]
  );

  useEffect(() => {
    const getAnimeList = async () => {
      try {
        setIsLoading(true);
        const [listResponse, favouritesResponse] = await Promise.all([
          getList(),
          getFavourites(),
        ]);

        const animeIds =
          listTitle === "Favourites"
            ? favouritesResponse.data.favourites.map((favourites) => favourites)
            : listResponse.data.animeList.map((anime) => anime.animeId);
        console.log(animeIds, listResponse.data, favouritesResponse.data);

        if (animeIds.length === 0) {
          setAnimeList([]);
          setAnimeInfo({
            animeList: listResponse.data?.animeList || [],
            favourites: favouritesResponse.data?.favourites || [],
          });
          setIsLoading(false);
          return;
        }

        const animeResponse = await getAnimeForList(animeIds);
        setAnimeList(animeResponse.data);
        setAnimeInfo({
          animeList: listResponse.data?.animeList || [],
          favourites: favouritesResponse.data?.favourites || [],
        });
        console.log(animeResponse.data);
      } catch (error) {
        console.log(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    getAnimeList();
  }, [listTitle]);

  const updateAnimeInfo = async (animeId, status, progress, score, notes) => {
    try {
      const response = await updateAnimeProgress(
        animeId,
        status,
        progress,
        score,
        notes
      );
      return response;
    } catch (error) {
      console.log("error updating", error.message, error.response?.data);
    }
  };

  return (
    <UserListContext.Provider
      value={{
        animeInfo,
        animeList,
        isLoading,
        listTitle,
        setListTitle,
        setAnimeInfo,
        updateAnimeInfo,
        isInFavourites,
        isInList,
        handleAddToFavourite,
        handleAddToList,
      }}
    >
      {children}
    </UserListContext.Provider>
  );
};

export const useUserContext = () => useContext(UserListContext);
