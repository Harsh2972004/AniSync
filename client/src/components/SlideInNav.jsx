import React, { useEffect, useLayoutEffect, useState } from "react";
import ReactDOM from "react-dom";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import logo from "../assets/images/anisync-logo.png";
import { IoCloseSharp } from "react-icons/io5";
import { MdKeyboardArrowDown } from "react-icons/md";
import { AnimatePresence } from "motion/react";
import Modal from "./Modal";
import ProfileSection from "./ProfileSection";
import defaultAvatar from "../assets/images/user-default-avatar.png";
import bannerImage from "../assets/images/AniSync-user-default-banner.png";


const SlideInNav = ({ hide, setHide }) => {
  const [isMounted, setIsMounted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const { user, logoutUser, isLoading } = useAuth();

  const createdAt = new Date(user?.createdAt);

  const options = { day: "numeric", month: "short", year: "numeric" };
  const formattedDate = createdAt.toLocaleDateString("en-GB", options);



  useEffect(() => {
    if (hide) {
      setIsMounted(true);
    } else {
      setIsVisible(false);

      const timer = setTimeout(() => {
        setIsMounted(false);
      }, 300);

      return () => clearTimeout(timer);
    }
  }, [hide]);

  useLayoutEffect(() => {
    if (isMounted && hide) {
      // force the browser to commit layout
      requestAnimationFrame(() => {
        setIsVisible(true);
      });
    }
  }, [isMounted, hide]);

  useEffect(() => {
    document.body.style.overflow = isMounted ? "hidden" : "";
  }, [isMounted]);

  if (!isMounted) return null;

  return ReactDOM.createPortal(
    <>
      <AnimatePresence>
        {showModal && (
          <Modal open={showModal} onClose={() => setShowModal(false)}>
            <ProfileSection
              name={user.name}
              email={user.email}
              bannerImage={user?.profileBannerUrl || user.anilistBannerImage || bannerImage}
              createdAt={formattedDate}
              avatar={user?.avatarUrl || user.anilistAvatar || defaultAvatar}
              setShowModal={setShowModal}
              logoutUser={logoutUser}
            />
          </Modal>
        )}
      </AnimatePresence>

      <div className={`fixed inset-0 xl:hidden z-30 `}>
        {/* backdrop for the slide in nav */}
        <div
          className={`absolute inset-0 bg-black/50 backdrop-blur-xl transition-opacity duration-300 ${isVisible
            ? "opacity-100 pointer-events-auto"
            : " opacity-0 pointer-events-none"
            }`}
        />

        {/* slide in nav content */}
        <nav
          className={`absolute w-full top-0 left-0 flex flex-col p-10 md:px-20 h-full duration-300 transition-transform ease-out ${isVisible ? "translate-x-0" : "translate-x-full"
            }`}
        >
          {/* header */}
          <div className="text-4xl mb-14 flex items-center justify-between gap-2 tranistion-all duration-75">
            <img className="w-20" src={logo} alt="logo" />
            <IoCloseSharp onClick={() => setHide(false)} size={40} />
          </div>

          {/* Links */}
          <ul className="flex flex-col flex-1 space-y-4 font-semibold">
            <li className="cursor-pointer text-4xl hover:scale-[1.05] tranistion-all duration-75">
              <Link onClick={() => setHide(false)} to="/">
                Home
              </Link>
            </li>
            <li className="cursor-pointer text-4xl hover:scale-[1.05] tranistion-all duration-75">
              <Link onClick={() => setHide(false)} to="/animeList">
                Anime List
              </Link>
            </li>
            {/* <li className="cursor-pointer text-4xl hover:scale-[1.05] tranistion-all duration-75">
          <Link onClick={() => setHide(false)} to="/mangaList">
            Manga List
          </Link>
        </li> */}
            <li className="cursor-pointer text-4xl hover:scale-[1.05] tranistion-all duration-75">
              <Link onClick={() => setHide(false)} to="/browse">
                Browse
              </Link>
            </li>
          </ul>

          {/* footer */}
          {isLoading && (
            <div className="text-gray-400 hidden xl:block">loading...</div>
          )}

          {user && !isLoading && (
            <div
              onClick={() => setShowModal(true)}
              className="max-w-[75%] md:max-w-[40%] lg:max-w-[30%] flex border-2 rounded-lg items-center gap-3 py-2 px-3 cursor-pointer"
            >
              <img
                className="w-12 h-12 object-cover object-center rounded-full"
                src={user?.avatarUrl || user.anilistAvatar || defaultAvatar}
                alt=""
              />

              <div className="flex flex-col items-start justify-center">
                <h5 className="">Hi, {user.name}</h5>
                <span className="text-gray-400 text-sm flex items-center">
                  Your account{<MdKeyboardArrowDown className=" -rotate-90" />}
                </span>
              </div>
            </div>
          )}

          {!user && !isLoading && <div className="flex flex-col font-semibold gap-4 ">
            <Link
              className="cursor-pointer text-3xl hover:scale-[1.05] tranistion-all border-2 rounded-lg px-4 py-2 border-btn_pink text-btn_pink w-fit"
              onClick={() => setHide(false)}
              to="/login"
            >
              Login
            </Link>

            <Link
              className="cursor-pointer text-3xl hover:scale-[1.05] tranistion-all border-2 rounded-lg px-4 py-2 border-btn_pink bg-btn_pink text-black w-fit"
              onClick={() => setHide(false)}
              to="/register"
            >
              Sign Up
            </Link>
          </div>}
        </nav>
      </div>
    </>,
    document.getElementById("slide-in-nav-root")
  );
};

export default SlideInNav;
