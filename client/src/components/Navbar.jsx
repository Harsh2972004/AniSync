import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-primary text-white font-mono">
      <div className="navbar-container">
        <div>
          <h1 className=" text-[1.8rem] italic">AniSync</h1>
        </div>
        <div>
          <ul className="flex space-x-6 text-lg">
            <li className="cursor-pointer">
              <Link to="/">Home</Link>
            </li>
            <li className="cursor-pointer">
              <Link>Anime List</Link>
            </li>
            <li className="cursor-pointer">
              <Link>Manga List</Link>
            </li>
            <li className="cursor-pointer">
              <Link>Genres</Link>
            </li>
            <li className="cursor-pointer">
              <Link>Platforms</Link>
            </li>
          </ul>
        </div>
        <div className="flex space-x-4 font-semibold">
          <button className="border-2 border-btn_pink rounded-lg px-4 py-2 text-btn_pink hover:bg-btn_pink hover:text-secondary transition-colors">
            <Link to="/login">Login</Link>
          </button>
          <button className="bg-btn_pink text-secondary px-4 py-2 rounded-lg">
            <Link to="/register">Sign Up</Link>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
