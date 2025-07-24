import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import HomeSection from "../components/HomeSection";

const Home = () => {
  return (
    <div className="flex flex-col relative">
      <HeroSection />
      <div className="flex-1 max-w-container space-y-6 mx-auto relative z-10">
        <HomeSection title={"TRENDING NOW"} />
      </div>
    </div>
  );
};

export default Home;
