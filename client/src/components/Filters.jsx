import { FaSlidersH } from "react-icons/fa";
import FilterInput from "./FilterInput";
import { useState } from "react";
import useSearchHandler from "../hooks/useSearchHandler";
import { useBrowse } from "../context/BrowseContext";

const Filters = () => {
  const [initialFilter, setInitialFilter] = useState({
    genres: "",
  });
  const { searchTerm, setSearchTerm, reset } = useBrowse();
  const { handleSearch } = useSearchHandler();

  const onSearchSubmimit = (e) => {
    e.preventDefault();
    handleSearch(searchTerm);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch(searchTerm);
    }
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (!value.trim()) reset();
  };

  return (
    <div className="flex items-end justify-between gap-10">
      <FilterInput
        text="search"
        search={true}
        setInitialFilter={setInitialFilter}
        initialFilter={initialFilter}
        handleChange={handleChange}
        searchTerm={searchTerm}
        onClick={onSearchSubmimit}
        handleKeyPress={handleKeyPress}
      />
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
