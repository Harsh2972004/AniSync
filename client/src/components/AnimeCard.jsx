import { FaHeart, FaRegHeart } from "react-icons/fa";

const AnimeCard = ({ animeImg, title, airSince, genres }) => {
  return (
    <div className="w-[22%] min-h-[450px] rounded-2xl p-[1px] bg-gradient-to-br from-transparent via-yellow-50 to-white">
      <div className="h-full w-full flex flex-col gap-3 bg-secondary rounded-2xl overflow-hidden p-2 pb-6">
        <div className="h-[300px] overflow-hidden rounded-2xl">
          <img
            className=" w-full rounded-2xl object-cover object-center translate-y-[-10%]"
            src={animeImg}
            alt={title}
          />
        </div>
        <div className="flex flex-col gap-2">
          <div className=" flex justify-between items-start">
            <div className="flex-[7] h-14">
              <h3 className="font-bold text-lg line-clamp-2">{title}</h3>
            </div>
            <div className="flex-[3] flex justify-end">
              <FaHeart size={28} color="red" />
            </div>
          </div>
          <span className="text-gray-500 text-sm font-semibold">
            {airSince}
          </span>
          <div className="flex items-center gap-3 flex-wrap mt-2">
            {genres.map((genre) => {
              return (
                <span
                  className="text-sm text-gray-500 border-[1px] font-semibold rounded-3xl px-[8px] py-[2px]"
                  key={genre}
                >
                  {genre}
                </span>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnimeCard;
