import anilist from "../assets/anilist.svg";

const BACKEND_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

const OAuthSection = ({ title }) => {
  return (
    <div className="grid grid-cols-3 gap-2 items-center justify-center">
      <h3 className="col-span-3 text-center font-semibold">{`or ${title} using:`}</h3>
      <div className="flex items-center justify-center gap-2 col-span-3">
        <a
          href={`${BACKEND_URL}/user/auth/google`}
          className="w-10 h-10 flex items-center justify-center border border-gray-300 rounded-md shadow-sm hover:shadow transition bg-white"
        >
          <img
            src="https://developers.google.com/identity/images/g-logo.png"
            alt="Google"
            className="w-7 h-7"
          />
        </a>
        <a
          href={`${BACKEND_URL}/user/auth/anilist`}
          className="w-10 h-10 flex items-center justify-center rounded-md shadow-sm hover:shadow transition bg-secondary border border-gray-500"
        >
          <img src={anilist} alt="anilist" className="w-7 h-7" />
        </a>
        {/* <a
        href={`${BACKEND_URL}/user/auth/anilist`}
        className="w-10 h-10 flex items-center justify-center rounded-md shadow-sm hover:shadow transition bg-secondary border border-gray-500"
      >
        <img src={anilist} alt="anilist" className="w-7 h-7" />
      </a> */}
      </div>
    </div>
  );
};

export default OAuthSection;
