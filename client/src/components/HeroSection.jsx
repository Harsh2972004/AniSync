import { FaSearch } from "react-icons/fa";

const HeroSection = () => {
  return (
    <div className="h-full flex items-center">
      <div className="h-full flex-1"></div>
      <div className="flex-1">
        <div className="w-4/5 ml-auto text-right flex flex-col gap-6">
          <h1 className="font-bold text-5xl">
            Track, Discover and Stay in Sync with{" "}
            <span className="text-btn_pink">Anime</span>
          </h1>
          <p className="font-sans font-semibold">
            AniSync is your ultimate anime tracking companion. Easily your watch
            progress, get AI-powered recommendations, and stay updated with
            latest anime releases— All in one place.
          </p>
          <div className="w-[95%] ml-auto flex items-center justify-between gap-3">
            <input
              className="bg-primary h-14 rounded-lg px-6 flex-1"
              type="text"
              placeholder="Search"
            />
            <button
              type="button"
              className="w-14 h-14 bg-primary flex items-center justify-center rounded-lg"
            >
              <FaSearch size={24} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
