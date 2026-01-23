import { useState } from "react";
import defaultAvatar from "../assets/images/user-default-avatar.png";
import { MdKeyboardArrowDown } from "react-icons/md";


const ListBar = ({ username, avatar, formattedDate, title, setTitle }) => {
  const [expanded, setExpanded] = useState(false)

  const changeExpanded = () => {
    setExpanded(!expanded)
  }

  return (
    <div className="flex items-center justify-between relative bg-primary py-2 px-4 rounded-lg w-[95vw] xl:w-full mx-auto">
      <div className="hidden lg:flex items-center gap-2 bg-primary rounded-lg">
        <img
          className="w-14 rounded-lg"
          src={avatar || defaultAvatar}
          alt="avatar"
        />
        <div>
          <h3 className="text-lg font-bold">{username}</h3>
          <p className="text-sm text-gray-400">User since {formattedDate}</p>
        </div>
      </div>
      <div className="bg-primary rounded-lg xl:absolute xl:left-[43%] w-full xl:w-auto text-center">
        <p className="text-sm text-gray-300">You are seeing</p>
        <h1 className="text-2xl font-semibold">{title}</h1>

        <div className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${expanded ? "max-h-40 opacity-100" : "max-h-0 opacity-0"}`}>
          <div className="py-4 mt-4 border-t-2 flex gap-6 md:gap-20 items-center justify-center">
            <button onClick={() => setTitle("Anime List")} className={`text-sm md:text-lg rounded-lg p-2 ${title === "Anime List" ? "bg-btn_pink border-black border-4 text-black font-semibold" : "text-btn_pink border-2 border-btn_pink"}`}>Anime List</button>
            <button onClick={() => setTitle("Favourites")} className={`text-sm md:text-lg rounded-lg p-2 ${title === "Favourites" ? "bg-btn_pink border-black border-4 text-black font-semibold" : "text-btn_pink border-2 border-btn_pink"}`}>Favourites</button>
          </div>
        </div>

        <MdKeyboardArrowDown onClick={changeExpanded} className={`mx-auto text-xl lg:hidden transition-transform duration-300 cursor-pointer ${expanded ? "rotate-180" : "rotate-0 floaty"}`} />

      </div>
      <div className="hidden lg:flex items-center gap-4">
        <button
          onClick={() => setTitle("Anime List")}
          className={`hover:bg-btn_pink hover:text-secondary transition-colors duration-200 px-6 py-2 font-semibold rounded-lg ${title === "Anime List" ? "border-black bg-btn_pink text-black font-semibold border-4" : "border-2 border-btn_pink text-btn_pink"}`}
        >
          Anime List
        </button>
        <button
          onClick={() => setTitle("Favourites")}
          className={`hover:bg-btn_pink hover:text-secondary transition-colors duration-200 px-6 py-2 font-semibold rounded-lg ${title === "Favourites" ? "border-black bg-btn_pink text-black font-semibold border-4" : "border-2 border-btn_pink text-btn_pink"}`}
        >
          Favourites
        </button>
      </div>
    </div>
  );
};

export default ListBar;
