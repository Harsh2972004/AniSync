import { MdEdit } from "react-icons/md";
import { FaEye } from "react-icons/fa";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Link } from "react-router-dom";


const ListAnimeCard = ({
  id,
  image,
  title,
  onEditClick,
  onViewClick,
  list = true,
  reorderMode
}) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id, disabled: !reorderMode });

  const isDragging = Boolean(transform)

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  return (
    <Link to={`/${id}`}
      onClickCapture={(e) => {
        if (reorderMode) {
          e.preventDefault();
          e.stopPropagation();
        }
      }}>
      <div
        ref={setNodeRef}
        {...attributes}
        {...(reorderMode ? listeners : {})}
        style={style}
        className={`w-[40vw] md:w-[20vw] xl:w-44 relative rounded-md group touch-none ${reorderMode ? "touch-none " : "touch-manipulation"} ${list
          ? "cursor-default"
          : isDragging && reorderMode
            ? "cursor-grabbing"
            : "cursor-grab"}`}
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
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onViewClick?.(e);
              }}
              className="lg:opacity-0 group-hover:opacity-100 p-1 bg-black/70 rounded-lg transition-all duration-200"
            >
              <FaEye size={20} />
            </button>
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onEditClick?.(e);
              }}
              className="lg:opacity-0 group-hover:opacity-100 p-1 bg-black/70 rounded-lg transition-all duration-200"
            >
              <MdEdit size={20} />
            </button>
          </div>
        )}
      </div>
    </Link>
  );
};

export default ListAnimeCard;
