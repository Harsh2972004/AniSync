import { useState } from "react";
import { MdKeyboardArrowDown } from "react-icons/md";
import { useUserContext } from "../context/UserListContext";

const SelectedAnimeInput = ({
  id,
  title,
  value,
  selectedEnums,
  onClick,
  setAnimeProgress,
  progress = false,
}) => {
  const [show, setShow] = useState(false);

  const { setAnimeInfo } = useUserContext();

  const filteredEnums = selectedEnums.filter((selectedEnum) => {
    if (!value) return true;
    return selectedEnum
      .toString()
      .toLowerCase()
      .includes(value.toString().toLowerCase());
  });

  return (
    <div className="flex flex-col gap-2 w-[200px] relative">
      <label className="font-semibold" htmlFor={title}>
        {title[0].toUpperCase() + title.slice(1)}
      </label>
      <div className="relative">
        <input
          className="rounded-md h-10 p-3 w-full bg-secondary"
          name={title}
          id={title}
          type="text"
          placeholder={title[0].toUpperCase() + title.slice(1)}
          value={value || ""}
          onChange={(e) =>
            setAnimeProgress((prev) => ({ ...prev, [title]: e.target.value }))
          }
          onFocus={() => setShow(true)}
          autoComplete="off"
        />
        <button
          onClick={() => setShow(!show)}
          className="absolute top-1/2 right-2 -translate-y-1/2"
        >
          <MdKeyboardArrowDown
            size={24}
            className=" transition-transform duration-200"
            style={
              show && {
                transform: "rotate(180deg)",
              }
            }
          />
        </button>
      </div>

      <div
        className={`w-full h-32 hide-scrollbar  border-gray-500 flex flex-col gap-2 absolute top-[110%] z-20 bg-secondary rounded-lg dropdown ${
          show ? "open border-[2px]" : ""
        }`}
      >
        {progress ? (
          filteredEnums.length > 0 ? (
            filteredEnums.map((selectedEnum, i) => (
              <span
                key={i}
                onClick={() => {
                  onClick(title, selectedEnum);
                  setShow(false);
                }}
                className="cursor-pointer px-4"
              >
                {selectedEnum}
              </span>
            ))
          ) : (
            <span className="w-full h-full flex items-center justify-center">
              no matches
            </span>
          )
        ) : (
          selectedEnums.map((selectedEnum, i) => (
            <span
              key={i}
              onClick={() => {
                onClick(title, selectedEnum);
                setShow(false);
              }}
              className="cursor-pointer px-4"
            >
              {selectedEnum}
            </span>
          ))
        )}
      </div>
    </div>
  );
};

export default SelectedAnimeInput;
