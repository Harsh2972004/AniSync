const ListBar = ({ username, avatar, formattedDate, title, setTitle }) => {
  return (
    <div className="flex items-center justify-between relative bg-primary py-2 px-4 rounded-lg">
      <div className="flex items-center gap-2 bg-primary rounded-lg">
        <img className="w-14 rounded-lg" src={avatar} alt="avatar" />
        <div>
          <h3 className="text-lg font-bold">{username}</h3>
          <p className="text-sm text-gray-400">User since {formattedDate}</p>
        </div>
      </div>
      <div className="bg-primary rounded-lg absolute left-[43%] text-center">
        <p className="text-sm text-gray-300">You are seeing</p>
        <h1 className="text-2xl font-semibold">{title}</h1>
      </div>
      <div className="flex items-center gap-4">
        <button
          onClick={() => setTitle("Anime List")}
          className="border-2 border-btn_pink text-btn_pink hover:bg-btn_pink hover:text-secondary transition-colors duration-200 px-6 py-2 font-semibold rounded-lg"
        >
          Anime List
        </button>
        <button
          onClick={() => setTitle("Favourites")}
          className="border-2 border-btn_pink text-btn_pink hover:bg-btn_pink hover:text-secondary transition-colors duration-200 px-6 py-2 font-semibold rounded-lg"
        >
          Favourites
        </button>
      </div>
    </div>
  );
};

export default ListBar;
