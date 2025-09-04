import { MdEdit } from "react-icons/md";
import { FaEye } from "react-icons/fa";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

const ListAnimeCard = ({
  id,
  image,
  title,
  onEditClick,
  onViewClick,
  list = true,
}) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
    cursor: "grab",
  };

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={style}
      onMouseDown={(e) => (e.currentTarget.style.cursor = "grabbing")}
      onMouseUp={(e) => (e.currentTarget.style.cursor = "grab")}
      className=" w-44 relative rounded-md group"
    >
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
