import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { MdKeyboardArrowDown } from "react-icons/md";
import { GiHamburgerMenu } from "react-icons/gi";
import logo from "../assets/images/anisync-logo.png";
import bannerImage from "../assets/images/AniSync-user-default-banner.png";
import defaultAvatar from "../assets/images/user-default-avatar.png";
import { AnimatePresence } from "motion/react";
import Modal from "./Modal";
import ProfileSection from "./ProfileSection";
import SlideInNav from "./SlideInNav";

const Navbar = ({
  home = false,
  details = false,
  list = false,
  banner = true,
}) => {
  const [show, setShow] = useState(true);
  const [hide, setHide] = useState(false);
  const [lastScrollY, setLastScrollY] = useState("");
  const [showModal, setShowModal] = useState(false);
  const { user, userAvatar, userBanner, logoutUser, isLoading } = useAuth();
  const [activeTab, setActiveTab] = useState(() => {
    return localStorage.getItem("activeTab") || "home";
  });

  useEffect(() => {
    localStorage.setItem("activeTab", activeTab);
  }, [activeTab]);

  const createdAt = new Date(user?.createdAt);

  const options = { day: "numeric", month: "short", year: "numeric" };
  const formattedDate = createdAt.toLocaleDateString("en-GB", options);

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
      className={`${hide ? "hidden" : ""} top-0 w-screen xl:w-full z-40 ${home
        ? "bg-[#292742] sticky"
        : (details && banner) || list
          ? lastScrollY > 30
            ? "bg-[#292742] fixed"
            : "bg-opacity-65 bg-black fixed"
          : "bg-[#292742] sticky"
        } text-white font-montserrat transition-all ${show ? "translate-y-0" : "-translate-y-full"
        }`}

    >
      <AnimatePresence>
        {showModal && (
          <Modal open={showModal} onClose={() => setShowModal(false)}>
            <ProfileSection
              name={user.name}
              email={user.email}
              bannerImage={userBanner || user.anilistBannerImage || bannerImage}
              createdAt={formattedDate}
              avatar={userAvatar || user.anilistAvatar || defaultAvatar}
              setShowModal={setShowModal}
              logoutUser={logoutUser}
            />
          </Modal>
        )}
      </AnimatePresence>

      <SlideInNav hide={hide} setHide={setHide} />

      <div className="navbar-container">
        <div className="flex flex-col items-center justify-center">
          <Link className="flex flex-col justify-center items-center" to="/">
            <img className="w-14" src={logo} alt="logo" />
            <h3 className="-mt-[10px] font-semibold text-sm xl:text-base">
              AniSync
            </h3>
          </Link>
        </div>
        <div className="hidden xl:block">
          <ul className="flex space-x-6 text-lg font-semibold">
            <li onClick={() => setActiveTab("home")} className={`cursor-pointer hover:scale-[1.05] tranistion-all duration-75 ${activeTab === "home" ? "underline" : ""}`}>
              <Link to="/">Home</Link>
            </li>
            <li onClick={() => setActiveTab("list")} className={`cursor-pointer hover:scale-[1.05] tranistion-all duration-75 ${activeTab === "list" ? "underline" : ""}`}>
              <Link to="/animeList">Anime List</Link>
            </li>
            {/* <li className="cursor-pointer hover:scale-[1.05] tranistion-all duration-75">
              <Link to="/mangaList">Manga List</Link>
            </li> */}
            <li onClick={() => setActive("browse")} className={`cursor-pointer hover:scale-[1.05] tranistion-all duration-75 ${activeTab === "browse" ? "underline" : ""}`}>
              <Link to="/browse">Browse</Link>
            </li>
          </ul>
        </div>
        {isLoading && (
          <div className="text-gray-400 hidden xl:block">loading...</div>
        )}
        {user && !isLoading && (
          <div
            onClick={() => setShowModal(true)}
            className="hidden xl:flex border-2 rounded-lg items-center gap-3 py-2 px-3 cursor-pointer"
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
          <div className="hidden xl:flex space-x-4 font-semibold">
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
        <div className="xl:hidden" onClick={() => setHide(true)}>
          <GiHamburgerMenu size={32} />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
