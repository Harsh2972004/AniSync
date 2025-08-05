const EpisodeCard = ({ thumbnail, title, url }) => {
  return (
    <a href={url} className="roudeded-md">
      <img className=" rounded-t-md" src={thumbnail} alt={title} />
      <p className="text-sm text-gray-300 bg-primary p-2 rounded-b-md">
        {title}
      </p>
    </a>
  );
};

export default EpisodeCard;
