import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useUserContext } from "../context/UserListContext";
import { Link } from "react-router-dom";
import { FaEye } from "react-icons/fa";

const ListAnimeTile = ({ index, id, title, image, reorderMode }) => {
  const { animeInfo } = useUserContext();

  const anime = animeInfo.animeList.find((anime) => anime.animeId == id);
  const score = anime?.score;

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id, disabled: !reorderMode });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  const isDragging = Boolean(transform)

  const CardBody = <div
    ref={setNodeRef}
    {...attributes}
    {...(reorderMode ? listeners : {})}
    style={style}
    onMouseDown={(e) => (e.currentTarget.style.cursor = "grabbing")}
    onMouseUp={(e) => (e.currentTarget.style.cursor = "grab")}
    className={`px-6 py-2 flex items-center justify-between bg-primary rounded-md ${reorderMode ? "touch-none " : "touch-manipulation"} ${!reorderMode
      ? "cursor-default" : isDragging ? "cursor-grabbing"
        : "cursor-grab"
      }`}

  >
    <div className="flex items-center gap-4">
      <span className="font-bold">{`${index})`}</span>
      <img className="w-10 rounded-md" src={image} alt={`${title}-image`} />
      <h4 className="text-sm font-semibold">{title}</h4>
    </div>
    <span>{score ? score : "—"}</span>
  </div >

  if (reorderMode) {
    return CardBody
  }

  return <Link to={`/${id}`}>{CardBody}</Link>
};

export default ListAnimeTile;
