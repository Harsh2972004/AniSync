import { MdKeyboardArrowDown } from "react-icons/md";
import { FaHeart, FaRegHeart } from "react-icons/fa";

const SelectedAnimeEdit = ({
  title,
  coverImage,
  bannerImage,
  status,
  progress,
  score,
  show,
  setShow,
}) => {
  return (
    <div>
      <img
        className="w-full h-1/3 bg-cover rounded-t-lg"
        src={bannerImage}
        alt={`
          ${title}-bannerImage`}
      />
      <div className="w-[90%] mx-auto mt-8 flex">
        <div className="flex gap-4 basis-1/2">
          <img
            className="w-40 max-h-[220px]"
            src={coverImage}
            alt={`${title}-coverImage`}
          />
          <div className="space-y-4">
            <h1 className="text-xl font-bold max-w-[75%] border-b-2">
              {title}
            </h1>
            <div className="space-y-1">
              <p className="text-gray-300">
                Status: <span className="font-semibold">{status}</span>
              </p>
              <p className="text-gray-300">
                Progress: <span className="font-semibold">{progress}</span>
              </p>
              <p className="text-gray-300">
                Score: <span className="font-semibold">{score}</span>
              </p>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 grid-rows-3 gap-8 justify-between items-start basis-1/2">
          <div className="flex flex-col gap-2 w-[200px] relative">
            <label className="font-semibold" htmlFor="status">
              Status
            </label>
            <div className="relative">
              <input
                className="rounded-md h-10 p-3 w-full bg-secondary"
                name="status"
                id="status"
                type="text"
                placeholder="Status"
                onFocus={() => setShow(true)}
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
              className={`w-full hide-scrollbar flex flex-col gap-2 absolute top-[110%] z-10 bg-secondary rounded-lg dropdown ${
                show ? "open" : ""
              }`}
            >
              <span className="cursor-pointer px-4">Watching</span>
              <span className="cursor-pointer px-4">Completed</span>
              <span className="cursor-pointer px-4">Planning</span>
              <span className="cursor-pointer px-4">Dropped</span>
            </div>
          </div>
          <div className="flex flex-col gap-2 w-[200px]">
            <label className="font-semibold" htmlFor="progress">
              Progress
            </label>
            <input
              className="rounded-md h-10 p-3 bg-secondary"
              name="progress"
              id="progress"
              type="text"
              placeholder="Episode number"
            />
          </div>
          <div className="flex flex-col gap-2 w-[200px]">
            <label className="font-semibold" htmlFor="score">
              Score
            </label>
            <input
              className="rounded-md h-10 p-3 bg-secondary"
              name="score"
              id="score"
              type="text"
              placeholder="Score"
            />
          </div>
          <div className="flex flex-col gap-2 w-[200px] row-span-2">
            <label className="font-semibold" htmlFor="notes">
              notes
            </label>
            <textarea
              className="rounded-md w-full min-h-10 max-h-28 px-3 py-2 bg-secondary hide-scrollbar"
              name="notes"
              id="notes"
              type="text"
              placeholder="Write your experience"
            />
          </div>
          <div className="flex gap-2">
            <button className=" p-2 border-2 rounded-md  font-semibold text-sm">
              <FaRegHeart size={24} />
            </button>
            <button className="px-4 py-2 border-2 rounded-md font-semibold text-sm">
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelectedAnimeEdit;
