const CharacterCard = ({
  charImage,
  charName,
  charRole,
  voiceActorImg,
  voiceActor,
  voiceActorLang,
}) => {
  const role = charRole?.charAt(0) + charRole?.slice(1).toLowerCase();
  const language =
    voiceActorLang?.charAt(0) + voiceActorLang?.slice(1).toLowerCase();

  return (
    <div className="h-24 flex justify-between bg-primary rounded-md">
      <div className="flex gap-2">
        <img
          className="h-full w-auto aspect-auto rounded-md"
          src={charImage}
          alt={charName}
        />
        <div className="flex flex-col justify-between py-1">
          <h4>{charName}</h4>
          <p>{role}</p>
        </div>
      </div>
      <div className="flex gap-2 text-right">
        <div className="flex flex-col justify-between py-1">
          <h4>{voiceActor}</h4>
          {voiceActorLang && <p>{language}</p>}
        </div>
        <img
          className="h-full w-auto aspect-auto rounded-md"
          src={voiceActorImg}
          alt={voiceActor}
        />
      </div>
    </div>
  );
};

export default CharacterCard;
