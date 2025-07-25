import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import HomeSection from "../components/HomeSection";

const Home = () => {
  return (
    <div className="w-full flex flex-col relative space-y-10">
      <HeroSection />
      <div className="flex-1 w-full max-w-container space-y-6 mx-auto relative z-10">
        <HomeSection title={"TRENDING NOW"} />
        <HomeSection title={"ALL TIME POPULAR"} />
        <HomeSection title={"POPULAR THIS SEASON"} />
        <HomeSection title={"UPCOMING NEXT SEASON"} />
      </div>
    </div>
  );
};

export default Home;
