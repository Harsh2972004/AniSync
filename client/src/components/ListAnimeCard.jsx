const ListAnimeCard = ({ image, title, onClick }) => {
  return (
    <div
      onClick={onClick}
      className=" w-44 relative rounded-md cursor-pointer hover:scale-105 duration-200"
    >
      <img
        className="rounded-md w-full max-h-[300px] object-cover object-center objd"
        src={image}
        alt={title}
      />
      <h4 className="w-full flex items-center justify-center absolute bottom-0 text-center bg-secondary opacity-90 px-2 py-4 z-10">
        {title}
      </h4>
    </div>
  );
};

export default ListAnimeCard;
