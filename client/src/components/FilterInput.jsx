import { MdKeyboardArrowDown } from "react-icons/md";
import { FaSearch } from "react-icons/fa";

const FilterInput = ({ text, width = true, search = false }) => {
  const capitalizeLetter = (string) => {
    if (!string) {
      return "";
    }
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  return (
    <div className={`flex flex-col gap-2 ${width && "w-[15%]"}`}>
      <label htmlFor={text}>{capitalizeLetter(text)}</label>
      <div className="flex items-center justify-between relative w-full">
        <input
          type="text"
          id={text}
          name={text}
          placeholder={capitalizeLetter(text)}
          className={`px-4 py-2 rounded-md w-full ${
            width ? "bg-primary" : "bg-secondary"
          }`}
        />
        <button
          className={`absolute ${search ? "right-2" : "right-1"} top-1/5`}
        >
          {search ? <FaSearch size={20} /> : <MdKeyboardArrowDown size={24} />}
        </button>
      </div>
    </div>
  );
};

export default FilterInput;
