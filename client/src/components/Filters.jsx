import FilterInput from "./FilterInput";
import { FaFilter } from "react-icons/fa";
import { useEffect, useState } from "react";
import useSearchHandler from "../hooks/useSearchHandler";
import { useBrowse } from "../context/BrowseContext";
import { filterEnums } from "../services/media";

const Filters = () => {
  const [close, setClose] = useState(false);
  const {
    setSubmittedSearchTerm,
    submittedSearchTerm,
    searchTerm,
    setSearchTerm,
    filters,
    setFilters,
  } = useBrowse();
  const { handleSearch, handleFilters } = useSearchHandler();
  const [filterValues, setFilterValues] = useState(null);
  const [filteredValues, setFilteredValues] = useState(filterValues);
  const [expanded, setExpanded] = useState(false)

  const currentYear = new Date().getFullYear();
  const filterYears = Array.from(
    { length: currentYear - 1940 + 1 },
    (_, i) => currentYear - i
  );

  const onSearchSubmimit = (e) => {
    e.preventDefault();
    handleSearch(searchTerm);
  };

  const onFiltersSubmit = () => {
    handleFilters();
    console.log("filters", filters);
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
    setSubmittedSearchTerm("");
    setSearchTerm("");
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    const newFilters = { ...filters, [name]: value };
    setFilters(newFilters);

    if (value === "") {
      // Reset to full original values
      setFilteredValues((prev) => ({ ...prev, [name]: filterValues[name] }));
      return;
    }

    const filtered = filterValues[name].filter((item) =>
      item.toString().toLowerCase().includes(value.toLowerCase())
    );

    setFilteredValues((prev) => ({ ...prev, [name]: filtered }));
  };

  useEffect(() => {
    const getFliters = async () => {
      const data = await filterEnums();
      setFilterValues(data.data);
      setFilteredValues(data.data);
    };

    getFliters();
  }, []);

  return (
    <>
      <div className="hidden xl:flex items-end justify-between gap-10">
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
          submittedSearchTerm={submittedSearchTerm}
        />
        <FilterInput
          text="genre"
          handleChange={handleFilterChange}
          filters={filters}
          setFilters={setFilters}
          inputValue={filters.genre}
          handleKeyPress={handleFilterKeyPress}
          filterValues={filteredValues?.genres}
          filterKeys={"genre"}
          onInputSubmit={onFiltersSubmit}
        />
        <FilterInput
          text="seasonYear"
          handleChange={handleFilterChange}
          filters={filters}
          setFilters={setFilters}
          inputValue={filters.seasonYear}
          handleKeyPress={handleFilterKeyPress}
          filterValues={filterYears}
          filterKeys={"seasonYear"}
          onInputSubmit={onFiltersSubmit}
        />
        <FilterInput
          text="season"
          handleChange={handleFilterChange}
          filters={filters}
          setFilters={setFilters}
          inputValue={filters.season}
          handleKeyPress={handleFilterKeyPress}
          filterValues={filteredValues?.season}
          filterKeys={"season"}
          onInputSubmit={onFiltersSubmit}
        />
        <FilterInput
          text="format"
          handleChange={handleFilterChange}
          filters={filters}
          setFilters={setFilters}
          inputValue={filters.format}
          handleKeyPress={handleFilterKeyPress}
          filterValues={filteredValues?.format}
          filterKeys={"format"}
          onInputSubmit={onFiltersSubmit}
        />
      </div>
      <div className="flex xl:hidden items-center justify-between py-2 rounded-md gap 2">
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
          submittedSearchTerm={submittedSearchTerm}
          onSmallerScreen={true}
          width={false}
          widthValue="w-[85%] mdl:w-[90%]"
        />
        <button onClick={() => setExpanded(!expanded)} className="bg-primary p-2 rounded-md">
          <FaFilter size={20} />
        </button>
      </div>
      <div className={`xl:hidden flex flex-wrap justify-between gap-y-4 bg-[#262535] rounded-md p-4 transition-all duration-300 ${expanded ? "opacity-100 max-h-60 mt-6" : "opacity-0 max-h-0 mt-0"}`}>
        <FilterInput
          text="genre"
          handleChange={handleFilterChange}
          filters={filters}
          setFilters={setFilters}
          inputValue={filters.genre}
          handleKeyPress={handleFilterKeyPress}
          filterValues={filteredValues?.genres}
          filterKeys={"genre"}
          onInputSubmit={onFiltersSubmit}
          width={false}
        />
        <FilterInput
          text="seasonYear"
          handleChange={handleFilterChange}
          filters={filters}
          setFilters={setFilters}
          inputValue={filters.seasonYear}
          handleKeyPress={handleFilterKeyPress}
          filterValues={filterYears}
          filterKeys={"seasonYear"}
          onInputSubmit={onFiltersSubmit}
          width={false}
        />
        <FilterInput
          text="season"
          handleChange={handleFilterChange}
          filters={filters}
          setFilters={setFilters}
          inputValue={filters.season}
          handleKeyPress={handleFilterKeyPress}
          filterValues={filteredValues?.season}
          filterKeys={"season"}
          onInputSubmit={onFiltersSubmit}
          width={false}
        />
        <FilterInput
          text="format"
          handleChange={handleFilterChange}
          filters={filters}
          setFilters={setFilters}
          inputValue={filters.format}
          handleKeyPress={handleFilterKeyPress}
          filterValues={filteredValues?.format}
          filterKeys={"format"}
          onInputSubmit={onFiltersSubmit}
          width={false}
        /></div>
    </>
  );
};

export default Filters;
