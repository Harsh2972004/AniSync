import { FaSlidersH } from "react-icons/fa";
import FilterInput from "./FilterInput";
import { useState } from "react";
import useSearchHandler from "../hooks/useSearchHandler";
import { useBrowse } from "../context/BrowseContext";
// TODO: add filters functionality
const Filters = () => {
  const [close, setClose] = useState(false);
  const { searchTerm, setSearchTerm, reset, filters, setFilters } = useBrowse();
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

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (!value.trim()) setSearchTerm("");
  };

  const onSearchClose = () => {
    setSearchTerm("");
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="flex items-end justify-between gap-10">
      <FilterInput
        text="search"
        search={true}
        filters={filters}
        handleChange={handleSearchChange}
        inputValue={searchTerm}
        onSearchSubmit={onSearchSubmimit}
        handleKeyPress={handleKeyPress}
        close={close}
        setClose={setClose}
        onSearchClose={onSearchClose}
      />
      <FilterInput
        text="genres"
        handleChange={handleFilterChange}
        filters={filters}
        setFilters={setFilters}
        inputValue={filters.genres}
      />
      <FilterInput
        text="year"
        handleChange={handleFilterChange}
        filters={filters}
        setFilters={setFilters}
        inputValue={filters.year}
      />
      <FilterInput
        text="season"
        handleChange={handleFilterChange}
        filters={filters}
        setFilters={setFilters}
        inputValue={filters.season}
      />
      <FilterInput
        text="format"
        handleChange={handleFilterChange}
        filters={filters}
        setFilters={setFilters}
        inputValue={filters.format}
      />
      <div className="relative">
        <button className="flex items-center justify-center bg-primary p-2 h-10 mt-auto rounded-md">
          <FaSlidersH size={20} />
        </button>
        <div className="hidden grid-cols-3 gap-8 absolute right-0 top-[150%] rounded-lg p-6 bg-primary w-[45vw] z-10">
          {/* <FilterInput width={false} text="streaming on" />
          <FilterInput width={false} text="Country of origin" />
          <FilterInput width={false} text="Sources" />
          <FilterInput width={false} text="streaming on" />
          <FilterInput width={false} text="Country of origin" />
          <FilterInput width={false} text="Sources" /> */}
        </div>
      </div>
    </div>
  );
};

export default Filters;
