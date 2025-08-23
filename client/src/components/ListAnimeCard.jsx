import { MdEdit } from "react-icons/md";
import { FaEye } from "react-icons/fa";

const ListAnimeCard = ({
  image,
  title,
  onEditClick,
  onViewClick,
  list = true,
}) => {
  return (
    <div className=" w-44 relative rounded-md group">
      <img
        className="rounded-md w-full max-h-[220px]"
        src={image}
        alt={title}
      />
      <h4 className="w-full flex items-center justify-center absolute bottom-0 text-center text-sm bg-secondary opacity-90 p-4 z-10">
        {title}
      </h4>
      {list && (
        <div className="absolute right-2 top-2 flex gap-1">
          <button
            onClick={onViewClick}
            className="opacity-0 group-hover:opacity-100 p-1 bg-black/70 rounded-lg transition-all duration-200"
          >
            <FaEye size={20} />
          </button>
          <button
            onClick={onEditClick}
            className="opacity-0 group-hover:opacity-100 p-1 bg-black/70 rounded-lg transition-all duration-200"
          >
            <MdEdit size={20} />
          </button>
        </div>
      )}
    </div>
  );
};

export default ListAnimeCard;
