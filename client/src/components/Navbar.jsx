import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { MdKeyboardArrowDown } from "react-icons/md";
import logo from "../assets/images/anisync-logo.png";
import bannerImage from "../assets/images/AniSync-user-default-banner.png";
import defaultAvatar from "../assets/images/user-default-avatar.png";
import { AnimatePresence } from "motion/react";
import Modal from "./Modal";
import ProfileSection from "./ProfileSection";

const Navbar = ({ home = false, details = false, list = false }) => {
  const [show, setShow] = useState(true);
  const [lastScrollY, setLastScrollY] = useState("");
  const [showModal, setShowModal] = useState(false);
  const { user, userAvatar, logoutUser, isLoading } = useAuth();

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
      className={`top-0 w-full z-40 ${
        home || details || list
          ? lastScrollY > 30
            ? "bg-primary fixed"
            : "bg-opacity-65 bg-black fixed"
          : "bg-primary sticky"
      } text-white font-montserrat transition-all ${
        show ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <AnimatePresence>
        {showModal && (
          <Modal open={showModal} onClose={() => setShowModal(false)}>
            <ProfileSection
              name={user.name}
              bannerImage={
                user.bannerImage || user.anilistBannerImage || bannerImage
              }
              avatar={userAvatar || user.anilistAvatar || defaultAvatar}
              setShowModal={setShowModal}
              logoutUser={logoutUser}
            />
          </Modal>
        )}
      </AnimatePresence>
      <div className="navbar-container">
        <div className="flex flex-col items-center justify-center w-20">
          <Link to="/">
            <img src={logo} alt="logo" />
          </Link>
          {/* <h1 className=" text-[1.8rem] italic">AniSync</h1> */}
        </div>
        <div>
          <ul className="flex space-x-6 text-lg">
            <li className="cursor-pointer hover:scale-[1.02] tranistion-all duration-75">
              <Link to="/">Home</Link>
            </li>
            <li className="cursor-pointer hover:scale-[1.02] tranistion-all duration-75">
              <Link to="/animeList">Anime List</Link>
            </li>
            <li className="cursor-pointer hover:scale-[1.02] tranistion-all duration-75">
              <Link to="/mangaList">Manga List</Link>
            </li>
            <li className="cursor-pointer hover:scale-[1.02] tranistion-all duration-75">
              <Link to="/browse">Browse</Link>
            </li>
          </ul>
        </div>
        {isLoading && <div className="text-gray-400">loading...</div>}
        {user && !isLoading && (
          <div
            onClick={() => setShowModal(true)}
            className="border-2 rounded-lg flex items-center gap-3 py-2 px-3 cursor-pointer"
          >
            <img
              className="w-8 h-8 object-cover object-center rounded-full"
              src={userAvatar || user.anilistAvatar || defaultAvatar}
              alt=""
            />

            <div className="flex flex-col items-start justify-center">
              <h5 className="text-sm">Hi, {user.name}</h5>
              <span className="text-gray-400 text-xs flex items-center">
                Your account{<MdKeyboardArrowDown className=" -rotate-90" />}
              </span>
            </div>
          </div>
        )}
        {!user && !isLoading && (
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
