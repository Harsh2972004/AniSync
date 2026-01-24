import { useState, useEffect, useRef } from "react";
import { useAuth } from "../context/AuthContext";
import ListBar from "../components/ListBar";
import ListAnimeCard from "../components/ListAnimeCard";
import Modal from "../components/Modal";
import SelectedAnimeEdit from "../components/SelectedAnimeEdit";
import AnimeListSection from "../components/AnimeListSection";
import { useUserContext } from "../context/UserListContext";
import bannerImage from "../assets/images/AniSync-user-default-banner.png";
import bannerVideo from "../assets/images/smaller-blue-blinking-eyes.mp4";
import { CiImageOn, CiVideoOn } from "react-icons/ci";
import { FaThList } from "react-icons/fa";
import { IoGrid } from "react-icons/io5";
import SelectedAnimeView from "../components/SelectedAnimeView";
import { motion, AnimatePresence } from "motion/react";
import {
  closestCorners,
  DndContext,
  KeyboardSensor,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  rectSortingStrategy,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import ListAnimeTile from "../components/ListAnimeTile";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import { useClickGuard } from "../hooks/useClickGuard";

const AnimeList = () => {
  const { user, userAvatar, userBanner } = useAuth();
  const {
    isLoading,
    animeList,
    setAnimeList,
    animeInfo,
    listTitle,
    setListTitle,
  } = useUserContext();
  const [modalOpen, setModalOpen] = useState(false);
  const [view, setView] = useState(null); //view, edit
  const [selectedAnime, setSelectedAnime] = useState(null);
  const [bannerVideoOn, setBannerVideoOn] = useState(true);
  const [viewStyle, setViewStyle] = useState("tile"); //tile, card

  const createdAt = new Date(user.createdAt);

  const options = { day: "numeric", month: "short", year: "numeric" };
  const formattedDate = createdAt.toLocaleDateString("en-GB", options);

  const guard = useClickGuard()

  const justDraggedUntilRef = useRef(0);
  const isDraggingRef = useRef(0)

  const shouldBlockClick = () => isDraggingRef.current || Date.now() < justDraggedUntilRef.current;


  const onEditCardClick = (animeCardInfo, info) => {
    setModalOpen(true);
    setSelectedAnime([animeCardInfo, info]);
    setView("edit");
  };

  const onViewCardClick = (animeCardInfo, info) => {
    setModalOpen(true);
    setSelectedAnime([animeCardInfo, info]);
    setView("view");
  };

  const onModalClose = () => {
    setModalOpen(false), setSelectedAnime(null);
  };

  const getAnimePosition = (id, list) =>
    list.findIndex((anime) => anime.id === id);

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (!over) return
    if (active.id === over.id) return;

    setAnimeList((prev) => {
      const originalPosition = getAnimePosition(active.id, prev);
      const newPosition = getAnimePosition(over.id, prev);

      return arrayMove(prev, originalPosition, newPosition);
    });
  };

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
    useSensor(TouchSensor, {
      activationConstraint: { delay: 200, tolerance: 8 }
    })
  );

  useEffect(() => {
    document.body.style.overflow = modalOpen ? "hidden" : "";
  }, [modalOpen])

  return (
    <div className="flex flex-col">
      <AnimatePresence>
        {selectedAnime && (
          <Modal onClose={onModalClose} open={modalOpen}>
            {view === "edit" && (
              <SelectedAnimeEdit
                id={selectedAnime[1].animeId}
                title={
                  selectedAnime[0]?.title.english ||
                  selectedAnime[0]?.title.romaji ||
                  selectedAnime[0]?.title.native
                }
                coverImage={selectedAnime[0]?.coverImage.large}
                bannerImage={selectedAnime[0]?.bannerImage}
                episodeNumber={
                  selectedAnime[0]?.nextAiringEpisode?.episode - 1 ||
                  selectedAnime[0]?.episodes
                }
                setModalOpen={setModalOpen}
              />
            )}
            {view === "view" && (
              <SelectedAnimeView
                id={selectedAnime[1].animeId}
                title={
                  selectedAnime[0]?.title.english ||
                  selectedAnime[0]?.title.romaji ||
                  selectedAnime[0]?.title.native
                }
                coverImage={selectedAnime[0]?.coverImage.large}
                bannerImage={selectedAnime[0]?.bannerImage}
                setModalOpen={setModalOpen}
              />
            )}
          </Modal>
        )}
      </AnimatePresence>
      <div className="relative hidden lg:block group max-h-[40vh]">
        <AnimatePresence mode="wait">
          {!bannerVideoOn ? (
            <motion.img
              key="image"
              src={userBanner || user.anilistBannerImage || bannerImage}
              alt="banner-image"
              className="w-full h-full object-cover"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            />
          ) : (
            <motion.video
              key="video"
              src={bannerVideo}
              autoPlay
              loop
              className="w-full h-full object-cover"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            />
          )}
        </AnimatePresence>
        <button
          onClick={() => setBannerVideoOn(!bannerVideoOn)}
          className="absolute right-14 bottom-10 p-4 opacity-0 group-hover:opacity-100 transition-all duration-200 bg-black/60 text-btn_pink rounded-full"
        >
          {!bannerVideoOn ? <CiVideoOn size={24} /> : <CiImageOn size={24} />}
        </button>
      </div>

      {/* banner on smaller devices */}
      <img
        src={userBanner || user.anilistBannerImage || bannerImage}
        alt="banner-image"
        className="lg:hidden w-full h-[25vh] md:h-[30vh] object-cover"
      />
      <div className="container-spacing flex flex-col gap-8 h-full">
        <ListBar
          username={user.name}
          avatar={userAvatar || user.anilistAvatar}
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
        <div className="overflow-hidden px-[5vw] md:px-[3vw] lg:px-0">
          {listTitle === "Anime List" && !isLoading && (
            <div className="space-y-10">
              <AnimeListSection
                status="planning"
                animeList={animeList}
                animeInfo={animeInfo}
                onEditCardClick={onEditCardClick}
                onViewCardClick={onViewCardClick}
                shouldBlockClick={shouldBlockClick}
              />
              <AnimeListSection
                status="watching"
                animeList={animeList}
                animeInfo={animeInfo}
                onEditCardClick={onEditCardClick}
                onViewCardClick={onViewCardClick}
                shouldBlockClick={shouldBlockClick}
              />
              <AnimeListSection
                status="completed"
                animeList={animeList}
                animeInfo={animeInfo}
                onEditCardClick={onEditCardClick}
                onViewCardClick={onViewCardClick}
                shouldBlockClick={shouldBlockClick}
              />
              <AnimeListSection
                status="dropped"
                animeList={animeList}
                animeInfo={animeInfo}
                onEditCardClick={onEditCardClick}
                onViewCardClick={onViewCardClick}
                shouldBlockClick={shouldBlockClick}
              />
            </div>
          )}
          {listTitle === "Favourites" && !isLoading && animeList.length > 0 && (
            <DndContext
              sensors={sensors}
              onDragStart={() => {
                isDraggingRef.current = true;
                justDraggedUntilRef.current = Date.now() + 800;
              }}
              onDragCancel={() => {
                isDraggingRef.current = false;
                justDraggedUntilRef.current = Date.now() + 800;
              }}
              onDragEnd={(event) => {
                isDraggingRef.current = false;
                justDraggedUntilRef.current = Date.now() + 800; // block after drop too
                handleDragEnd(event);
              }}
              collisionDetection={closestCorners}
              modifiers={viewStyle === "tile" && [restrictToVerticalAxis]}
            >
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-xl">Favourites</h3>
                  <div className="flex gap-2">
                    <button
                      className="bg-primary w-8 h-8 flex items-center justify-center rounded-md"
                      onClick={() => setViewStyle("tile")}
                    >
                      <FaThList />
                    </button>
                    <button
                      className="bg-primary w-8 h-8 flex items-center justify-center rounded-md"
                      onClick={() => setViewStyle("card")}
                    >
                      <IoGrid />
                    </button>
                  </div>
                </div>
                <SortableContext
                  items={animeList}
                  strategy={
                    viewStyle === "tile"
                      ? verticalListSortingStrategy
                      : rectSortingStrategy
                  }
                >
                  <div
                    className={
                      viewStyle === "tile"
                        ? "space-y-6"
                        : "grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-10"
                    }
                  >
                    {animeList?.map((anime, i) =>
                      viewStyle === "tile" ? (
                        <ListAnimeTile
                          key={anime.id}
                          id={anime.id}
                          index={i + 1}
                          title={
                            anime.title.english ||
                            anime.title.romaji ||
                            anime.title.native
                          }
                          image={anime.coverImage.large}
                          list={false}
                          guard={guard}
                        />
                      ) : (
                        <ListAnimeCard
                          key={anime.id}
                          id={anime.id}
                          title={
                            anime.title.english ||
                            anime.title.romaji ||
                            anime.title.native
                          }
                          image={anime.coverImage.large}
                          list={false}
                          guard={guard}
                          shouldBlockClick={shouldBlockClick}
                        />
                      )
                    )}
                  </div>
                </SortableContext>
              </div>
            </DndContext>
          )}
          {animeList?.length === 0 && (
            <div className="flex items-center justify-center text-gray-400">
              <p>{`No Anime ${listTitle === "Favourites" ? "Favourited" : "in the list."
                }. Try adding anime to the ${listTitle === "Favourites" ? "favourites..." : "list..."
                }`}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AnimeList;
