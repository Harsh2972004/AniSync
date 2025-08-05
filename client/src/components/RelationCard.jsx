const RelationCard = ({ image, title, relationType }) => {
  const relation = relationType.charAt(0) + relationType.slice(1).toLowerCase();
  return (
    <div className="flex flex-col gap-2">
      <img
        className="w-32 max-h-[180px] aspect-auto rounded-md"
        src={image}
        alt={title}
      />
      <p className="text-xs w-32">{relation}</p>
    </div>
  );
};

export default RelationCard;
