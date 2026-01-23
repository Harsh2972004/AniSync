import { forwardRef } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useUserContext } from "../context/UserListContext";

const AnimeCard = forwardRef(
  ({ id, animeImg, title, airSince, genres }, ref) => {
    const { isInFavourites, handleAddToFavourite } = useUserContext();

    const isFavourites = isInFavourites(id);

    return (
      <Link
        ref={ref}
        to={`/${id}`}
        className="max-h-[300px] xl:min-h-[450px] rounded-2xl p-[1px] bg-gradient-to-br from-transparent via-yellow-50 to-white hover:scale-105 focus:scale-105 transition-all duration-200"
      >
        <div className="h-full w-full flex flex-col gap-3 bg-secondary rounded-2xl overflow-hidden p-2 pb-6">
          <div className="h-[150px] xl:h-[300px] overflow-hidden rounded-2xl">
            <img
              className=" w-full rounded-2xl object-cover object-center translate-y-[-10%]"
              src={animeImg}
              alt={title}
            />
          </div>
          <div className="flex flex-col gap-2">
            <div className=" flex justify-between items-start">
              <div className="xl:flex-[7] xl:h-14">
                <h3 className="font-bold xl:text-lg line-clamp-2">{title}</h3>
              </div>
              <div
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  handleAddToFavourite(id);
                }}
                className="xl:flex-[3] flex justify-end cursor-pointer"
              >
                {isFavourites ? (
                  <FaHeart size={28} color="red" />
                ) : (
                  <FaRegHeart size={28} color="red" />
                )}
              </div>
            </div>
            <span className="text-gray-500 text-xs font-semibold">
              airing since {airSince}
            </span>
            <div className="hidden xl:flex items-center gap-3 flex-wrap mt-2">
              {genres?.map((genre) => {
                return (
                  <span
                    className="text-xs text-gray-500 border-[1px] font-semibold rounded-3xl px-[8px] py-[2px]"
                    key={genre}
                  >
                    {genre}
                  </span>
                );
              })}
            </div>
          </div>
        </div>
      </Link>
    );
  }
);

export default AnimeCard;
