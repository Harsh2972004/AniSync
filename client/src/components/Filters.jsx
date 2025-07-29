import { MdKeyboardArrowDown } from "react-icons/md";
import { FaSearch, FaSlidersH } from "react-icons/fa";

const Filters = () => {
  return (
    <div className="flex items-end justify-between gap-10">
      <div className="flex flex-col gap-2 w-[15%]">
        <label htmlFor="search">Search</label>
        <div className="flex items-center relative w-full">
          <input
            type="text"
            id="search"
            name="search"
            placeholder="Search"
            className="px-4 py-2 rounded-md bg-primary w-full"
          />
          <button className="absolute right-2 top-1/5">
            <FaSearch size={20} />
          </button>
        </div>
      </div>
      <div className="flex flex-col gap-2 w-[15%]">
        <label htmlFor="genres">Genres</label>
        <div className="flex items-center justify-between relative w-full">
          <input
            type="text"
            id="genres"
            name="genres"
            placeholder="Genres"
            className="px-4 py-2 rounded-md w-full bg-primary"
          />
          <button className="absolute right-1 top-1/5">
            <MdKeyboardArrowDown size={24} />
          </button>
        </div>
      </div>
      <div className="flex flex-col gap-2 w-[15%]">
        <label htmlFor="year">Year</label>
        <div className="flex items-center justify-between relative w-full">
          <input
            type="text"
            id="year"
            name="year"
            placeholder="Year"
            className="px-4 py-2 rounded-md w-full bg-primary"
          />
          <button className="absolute right-1 top-1/5">
            <MdKeyboardArrowDown size={24} />
          </button>
        </div>
      </div>
      <div className="flex flex-col gap-2 w-[15%]">
        <label htmlFor="season">Season</label>
        <div className="flex items-center justify-between relative w-full">
          <input
            type="text"
            id="season"
            name="season"
            placeholder="Season"
            className="px-4 py-2 rounded-md w-full bg-primary"
          />
          <button className="absolute right-1 top-1/5">
            <MdKeyboardArrowDown size={24} />
          </button>
        </div>{" "}
      </div>
      <div className="flex flex-col gap-2 w-[15%]">
        <label htmlFor="format">Format</label>
        <div className="flex items-center justify-between relative w-full">
          <input
            type="text"
            id="format"
            name="format"
            placeholder="Format"
            className="px-4 py-2 rounded-md w-full bg-primary"
          />
          <button className="absolute right-1 top-1/5">
            <MdKeyboardArrowDown size={24} />
          </button>
        </div>{" "}
      </div>
      <button className="flex items-center justify-center bg-primary p-2 h-10 mt-auto rounded-md">
        <FaSlidersH size={20} />
      </button>
    </div>
  );
};

export default Filters;
