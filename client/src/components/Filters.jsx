import { FaSlidersH } from "react-icons/fa";
import FilterInput from "./FilterInput";
import { useEffect, useState } from "react";
import useSearchHandler from "../hooks/useSearchHandler";
import { useBrowse } from "../context/BrowseContext";
import { filterEnums } from "../services/media";
// TODO: add filters functionality
const Filters = () => {
  const [close, setClose] = useState(false);
  const { reset, searchTerm, setSearchTerm, filters, setFilters } = useBrowse();
  const { handleSearch } = useSearchHandler();
  const [filterValues, setFilterValues] = useState(null);

  const onSearchSubmimit = (e) => {
    e.preventDefault();
    handleSearch(searchTerm);
  };

  const handleSearchKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch(searchTerm);
      setClose(true);
    }
  };
  const handleFilterKeyPress = (e) => {
    if (e.key === "Enter") {
      const { name, value } = e.target;

      setFilters((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (!value.trim()) setSearchTerm("");
  };

  const onSearchClose = () => {
    const isEmpty = Object.values(filters).every((value) => value === "");
    if (isEmpty) {
      reset();
    } else {
      setSearchTerm("");
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    const getFliters = async () => {
      const data = await filterEnums();
      console.log("fetched data:", data.data);
      setFilterValues(data.data);
    };

    getFliters();
  }, []);

  return (
    <div className="flex items-end justify-between gap-10">
      <FilterInput
        text="search"
        search={true}
        filters={filters}
        handleChange={handleSearchChange}
        inputValue={searchTerm}
        onInputSubmit={onSearchSubmimit}
        handleKeyPress={handleSearchKeyPress}
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
        handleKeyPress={handleFilterKeyPress}
      />
      <FilterInput
        text="year"
        handleChange={handleFilterChange}
        filters={filters}
        setFilters={setFilters}
        inputValue={filters.year}
        handleKeyPress={handleFilterKeyPress}
      />
      <FilterInput
        text="season"
        handleChange={handleFilterChange}
        filters={filters}
        setFilters={setFilters}
        inputValue={filters.season}
        handleKeyPress={handleFilterKeyPress}
      />
      <FilterInput
        text="format"
        handleChange={handleFilterChange}
        filters={filters}
        setFilters={setFilters}
        inputValue={filters.format}
        handleKeyPress={handleFilterKeyPress}
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
