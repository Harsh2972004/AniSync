import { FaSearch } from "react-icons/fa";
import characters from "../assets/images/characters.png";
import useSearchHandler from "../hooks/useSearchHandler";
import { useBrowse } from "../context/BrowseContext";

const HeroSection = () => {
  const { searchTerm, setSearchTerm } = useBrowse();
  const { handleSearch } = useSearchHandler();

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    handleSearch(searchTerm);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch(searchTerm);
    }
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (!value.trim()) setSearchTerm("");
  };

  return (
    <div
      className="bg-[url('../assets/images/landingBg.jpg')] 
    bg-cover h-[550px] xl:h-screen relative"
    >
      <img
        className="w-[45%] absolute left-0 bottom-0 z-0 hidden mdl:block"
        src={characters}
        alt="anime-characters"
      />
      <div className=" h-full mdl:px-14 xl:px-0 flex items-center max-w-container mx-auto">
        <div className="mdl:flex-1"></div>
        <div className="py-2 mdl:mt-20 xl:mt-0 mdl:flex-1 overflow-x-hidden">
          <div className="px-8 mdl:px-10 xl:px-0 mdl:w-full ml-auto xl:text-right flex flex-col gap-6">
            <h1 className="font-bold text-5xl mdl:text-3xl xl:text-5xl">
              Track, Discover and Stay in Sync with{" "}
              <span className="text-btn_pink">Anime</span>
            </h1>
            <p className="font-sans font-semibold mdl:text-sm xl:text-base">
              AniSync is your ultimate anime tracking companion. Easily track
              your watch progress, discover personalized recommendations, and
              stay updated with the latest anime releases—all in one place.
            </p>
            <div className="w-full xl:w-[95%] xl:ml-auto flex items-center justify-between gap-2 xl:gap-4">
              <input
                className="bg-primary w-3/4 xl:w-auto h-16 mdl:h-14 rounded-lg px-6 xl:flex-1"
                type="text"
                placeholder="Search anime..."
                value={searchTerm}
                onChange={handleSearchChange}
                onKeyDown={handleKeyPress}
              />
              <button
                type="button"
                onClick={handleSearchSubmit}
                className="w-16 h-16 mdl:w-14 mdl:h-14 bg-primary flex items-center justify-center rounded-lg"
              >
                <FaSearch size={24} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
