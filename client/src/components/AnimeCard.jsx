import { FaHeart, FaRegHeart } from "react-icons/fa";

const AnimeCard = ({ animeImg, title, airSince, genres }) => {
  return (
    <div className="flex flex-col justify-center w-[20%]">
      <img src={animeImg} alt={animeImg} />
      <div className="flex justify-between items-center">
        <h3>{title}</h3>
        <FaHeart />
      </div>
      <span>{airSince}</span>
      <div>{genres}</div>
    </div>
  );
};

export default AnimeCard;
