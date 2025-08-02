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
    bg-cover h-screen relative"
    >
      <img
        className="w-[45%] absolute left-0 bottom-0 z-0"
        src={characters}
        alt="anime-characters"
      />
      <div className=" h-full flex items-center max-w-container mx-auto">
        <div className="flex-1"></div>
        <div className="flex-1">
          <div className="w-4/5 ml-auto text-right flex flex-col gap-6">
            <h1 className="font-bold text-5xl">
              Track, Discover and Stay in Sync with{" "}
              <span className="text-btn_pink">Anime</span>
            </h1>
            <p className="font-sans font-semibold">
              AniSync is your ultimate anime tracking companion. Easily your
              watch progress, get AI-powered recommendations, and stay updated
              with latest anime releases— All in one place.
            </p>
            <div className="w-[95%] ml-auto flex items-center justify-between gap-3">
              <input
                className="bg-primary h-14 rounded-lg px-6 flex-1"
                type="text"
                placeholder="Search anime..."
                value={searchTerm}
                onChange={handleSearchChange}
                onKeyDown={handleKeyPress}
              />
              <button
                type="button"
                onClick={handleSearchSubmit}
                className="w-14 h-14 bg-primary flex items-center justify-center rounded-lg"
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
