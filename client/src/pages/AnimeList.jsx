import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import ListBar from "../components/ListBar";
import { getAnimeForList, getFavourites, getList } from "../services/list";
import ListAnimeCard from "../components/ListAnimeCard";
import Modal from "../components/Modal";
import SelectedAnimeEdit from "../components/SelectedAnimeEdit";
import AnimeListSection from "../components/AnimeListSection";

const AnimeList = () => {
  const { user } = useAuth();
  const [listTitle, setListTitle] = useState("Anime List");
  const [animeList, setAnimeList] = useState(null);
  const [animeInfo, setAnimeInfo] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedAnime, setSelectedAnime] = useState(null);
  const [show, setShow] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const createdAt = new Date(user.createdAt);

  const options = { day: "numeric", month: "short", year: "numeric" };
  const formattedDate = createdAt.toLocaleDateString("en-GB", options);

  const onCardClick = (animeCardInfo, info) => {
    setModalOpen(true);
    setSelectedAnime([animeCardInfo, info]);
  };

  const onModalClose = () => {
    setModalOpen(false), setSelectedAnime(null);
  };

  useEffect(() => {
    const getAnimeList = async () => {
      try {
        setIsLoading(true);
        const listResponse =
          listTitle === "Favourites" ? await getFavourites() : await getList();

        const animeIds =
          listTitle === "Favourites"
            ? listResponse.data.favourites.map((favourites) => favourites)
            : listResponse.data.animeList.map((anime) => anime.animeId);
        console.log(animeIds, listResponse.data);

        const animeResponse = await getAnimeForList(animeIds);
        setAnimeList(animeResponse.data);
        setAnimeInfo(listResponse.data?.animeList);
        console.log(animeResponse.data);
      } catch (error) {
        console.log(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    getAnimeList();
  }, [listTitle]);

  return (
    <div>
      {selectedAnime && (
        <Modal onClose={onModalClose} open={modalOpen}>
          <SelectedAnimeEdit
            title={
              selectedAnime[0]?.title.english ||
              selectedAnime[0]?.title.romaji ||
              selectedAnime[0]?.title.native
            }
            coverImage={selectedAnime[0]?.coverImage.large}
            bannerImage={selectedAnime[0]?.bannerImage}
            status={selectedAnime[1]?.status}
            progress={selectedAnime[1]?.progress}
            score={selectedAnime[1]?.score}
            show={show}
            setShow={setShow}
          />
        </Modal>
      )}
      <img
        className="w-full"
        src={user.bannerImage || user.anilistBannerImage}
        alt="banner-image"
      />
      <div className="container-spacing flex flex-col gap-8 h-full">
        <ListBar
          username={user.name}
          avatar={user.avatar || user.anilistAvatar}
          formattedDate={formattedDate}
          title={listTitle}
          setTitle={setListTitle}
        />
        {isLoading && (
          <div className="flex justify-center items-center h-80 text-gray-400">
            <p>Loading please wait...</p>
            <span className="absolute bottom-0 left-0 h-[2px] w-full bg-white animate-loading-bar" />
          </div>
        )}
        {listTitle === "Anime List" && !isLoading && (
          <>
            <AnimeListSection
              status="planning"
              animeList={animeList}
              animeInfo={animeInfo}
              onCardClick={onCardClick}
            />
            <AnimeListSection
              status="watching"
              animeList={animeList}
              animeInfo={animeInfo}
              onCardClick={onCardClick}
            />
            <AnimeListSection
              status="completed"
              animeList={animeList}
              animeInfo={animeInfo}
              onCardClick={onCardClick}
            />
            <AnimeListSection
              status="dropped"
              animeList={animeList}
              animeInfo={animeInfo}
              onCardClick={onCardClick}
            />
          </>
        )}
        {listTitle === "Favourites" && !isLoading && (
          <div className="flex flex-col gap-4">
            <h3 className="font-bold text-xl">Favourites</h3>
            <div className="grid grid-cols-6 gap-10">
              {animeList?.map((anime) => (
                <ListAnimeCard
                  key={anime.id}
                  title={
                    anime.title.english ||
                    anime.title.romaji ||
                    anime.title.native
                  }
                  image={anime.coverImage.large}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AnimeList;
