import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { FaRegUserCircle } from "react-icons/fa";
import { MdKeyboardArrowDown } from "react-icons/md";

const Navbar = ({ home = false, details = false }) => {
  const [show, setShow] = useState(true);
  const [lastScrollY, setLastScrollY] = useState("");
  const { user, logoutUser, isLoading } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 30) {
        // scrolling down
        setShow(false);
      } else {
        // scrolling up
        setShow(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  });
  return (
    <nav
      className={`top-0 w-full z-50 ${
        home || details
          ? lastScrollY > 30
            ? "bg-primary fixed"
            : "bg-opacity-40 bg-black fixed"
          : "bg-primary sticky"
      } text-white font-montserrat transition-all ${
        show ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="navbar-container">
        <div>
          <h1 className=" text-[1.8rem] italic">AniSync</h1>
        </div>
        <div>
          <ul className="flex space-x-6 text-lg">
            <li className="cursor-pointer">
              <Link to="/">Home</Link>
            </li>
            <li className="cursor-pointer">
              <Link to="/animeList">Anime List</Link>
            </li>
            <li className="cursor-pointer">
              <Link to="/mangaList">Manga List</Link>
            </li>
            <li className="cursor-pointer">
              <Link to="/browse">Browse</Link>
            </li>
          </ul>
        </div>
        {user ? (
          <div>
            <button
              className="border-2 rounded-lg flex items-center gap-3 py-2 px-3"
              onClick={logoutUser}
            >
              {user.avatar || user.anilistAvatar ? (
                <img
                  className="w-8 h-8 rounded-full"
                  src={user.avatar || user.anilistAvatar}
                  alt=""
                />
              ) : (
                <FaRegUserCircle size={30} />
              )}
              <div className="flex flex-col items-start justify-center">
                <h5 className="text-sm">Hi, {user.name}</h5>
                <span className="text-gray-400 text-xs flex items-center">
                  Your account{<MdKeyboardArrowDown className=" -rotate-90" />}
                </span>
              </div>
            </button>
          </div>
        ) : (
          <div className="flex space-x-4 font-semibold">
            <Link to="/login">
              <button className="border-2 border-btn_pink rounded-lg px-4 py-2 text-btn_pink hover:bg-btn_pink hover:text-secondary transition-colors">
                Login
              </button>
            </Link>
            <Link to="/register">
              <button className="bg-btn_pink text-secondary px-4 py-2 rounded-lg">
                Sign Up
              </button>
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
