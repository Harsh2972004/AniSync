const RelationCard = ({ image, title, relationType }) => {
  const relation = relationType.charAt(0) + relationType.slice(1).toLowerCase();
  return (
    <div className="flex flex-col gap-2">
      <img
        className="xl:w-32 xl:max-h-[180px] aspect-auto rounded-md"
        src={image}
        alt={title}
      />
      <p className="text-[10px] xl:text-xs w-32">{relation}</p>
    </div>
  );
};

export default RelationCard;
