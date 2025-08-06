import { MdKeyboardArrowDown } from "react-icons/md";
import { IoCloseSharp } from "react-icons/io5";
import { FaSearch } from "react-icons/fa";
import { useState } from "react";

const FilterInput = ({
  text,
  width = true,
  search = false,
  setFilters,
  filterValues,
  filterKeys,
  handleChange,
  onInputSubmit,
  inputValue,
  handleKeyPress,
  close,
  setClose,
  onSearchClose,
  submittedSearchTerm,
}) => {
  const [show, setShow] = useState(false);
  const capitalizeLetter = (string) => {
    if (!string) {
      return "";
    }
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  return (
    <div className={`relative flex flex-col gap-2 ${width && "w-[15%]"}`}>
      <label htmlFor={text}>
        {capitalizeLetter(text === "seasonYear" ? "year" : text)}
      </label>
      <div className="flex items-center justify-between relative w-full">
        <input
          type="text"
          id={text}
          name={text}
          value={inputValue}
          onKeyDown={handleKeyPress}
          onChange={handleChange}
          onClick={
            !search
              ? () => {
                  setShow(true);
                }
              : null
          }
          placeholder={capitalizeLetter(text === "seasonYear" ? "year" : text)}
          autoComplete="off"
          className={`px-4 py-2 rounded-md w-full ${
            width ? "bg-primary" : "bg-secondary"
          }`}
        />
        <button
          onClick={onInputSubmit}
          className={`absolute ${search ? "right-2" : "right-1"} top-1/5`}
        >
          {search ? (
            submittedSearchTerm || close ? (
              <IoCloseSharp
                onClick={(e) => {
                  e.stopPropagation();
                  onSearchClose();
                  setClose(false);
                }}
                size={22}
              />
            ) : (
              <FaSearch onClick={() => setClose(true)} size={20} />
            )
          ) : inputValue ? (
            <IoCloseSharp
              size={22}
              onClick={(e) =>
                setFilters((prev) => ({ ...prev, [filterKeys]: "" }))
              }
            />
          ) : (
            <MdKeyboardArrowDown
              onClick={(e) => {
                e.stopPropagation();
                setShow(!show);
              }}
              size={24}
              className=" transition-transform duration-200"
              style={
                show && {
                  transform: "rotate(180deg)",
                }
              }
            />
          )}
        </button>
      </div>
      {!search && (
        <div
          className={`w-full hide-scrollbar flex flex-col gap-2 absolute top-[120%] z-10 bg-primary rounded-lg dropdown ${
            show ? "open" : ""
          }`}
        >
          {filterValues?.map((value, index) => (
            <span
              onClick={() => {
                setFilters((prev) => ({ ...prev, [text]: value }));
                setShow(!show);
                onInputSubmit();
              }}
              key={index}
              className="cursor-pointer px-4"
            >
              {value}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

export default FilterInput;
