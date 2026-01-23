import { Link } from "react-router-dom";

const RecommendationsCard = ({ image, title, id }) => {
  return (
    <Link to={`/${id}`} className="rounded-md w-36 xl:w-40 flex flex-col gap-2">
      <img className=" rounded-md max-h-[220px]" src={image} alt={title} />
      <h4 className="text-sm">{title}</h4>
    </Link>
  );
};

export default RecommendationsCard;
