import { FaSearch, FaSlidersH } from "react-icons/fa";
import FilterInput from "./FilterInput";

const Filters = () => {
  return (
    <div className="flex items-end justify-between gap-10">
      <FilterInput text="search" search={true} />
      <FilterInput text="genres" />
      <FilterInput text="year" />
      <FilterInput text="season" />
      <FilterInput text="format" />
      <div className="relative">
        <button className="flex items-center justify-center bg-primary p-2 h-10 mt-auto rounded-md">
          <FaSlidersH size={20} />
        </button>
        <div className="hidden grid-cols-3 gap-8 absolute right-0 top-[150%] rounded-lg p-6 bg-primary w-[45vw] z-10">
          <FilterInput width={false} text="streaming on" />
          <FilterInput width={false} text="Country of origin" />
          <FilterInput width={false} text="Sources" />
          <FilterInput width={false} text="streaming on" />
          <FilterInput width={false} text="Country of origin" />
          <FilterInput width={false} text="Sources" />
        </div>
      </div>
    </div>
  );
};

export default Filters;
