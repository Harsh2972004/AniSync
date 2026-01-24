import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useUserContext } from "../context/UserListContext";
import { Link } from "react-router-dom";
import { FaEye } from "react-icons/fa";

const ListAnimeTile = ({ index, id, title, image, guard }) => {
  const { animeInfo } = useUserContext();

  const anime = animeInfo.animeList.find((anime) => anime.animeId == id);
  const score = anime?.score;

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
      className="px-6 py-2 flex items-center justify-between bg-primary rounded-md touch-none"
      onPointerDownCapture={guard.onPointerDown}
      onPointerMoveCapture={guard.onPointerMove}
      onPointerUpCapture={guard.onPointerUp}
      onPointerCancelCapture={guard.onPointerUp}
    >
      <div className="flex items-center gap-4">
        <span className="font-bold">{`${index})`}</span>
        <img className="w-10 rounded-md" src={image} alt={`${title}-image`} />
        <h4 className="text-sm font-semibold">{title}</h4>
      </div>
      <div className="flex items-center justify-center gap-2">
        <Link to={`/${id}`}
          onClick={e => {
            if (!shouldAllowClick()) {
              e.preventDefault()
              e.stopPropagation()
            }
          }}
        >
          <FaEye size={22} />
        </Link>
        <span>{score ? score : "—"}</span>
      </div>
    </div>
  );
};

export default ListAnimeTile;
