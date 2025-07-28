import HeroSection from "../components/HeroSection";
import HomeSection from "../components/HomeSection";

const Home = () => {
  return (
    <div className="w-full flex flex-col relative space-y-10">
      <HeroSection />
      <div className="flex-1 w-full max-w-container space-y-6 mx-auto relative z-10">
        <HomeSection title={"TRENDING NOW"} fetchType={"trending"} limit={4} />
        <HomeSection
          title={"POPULAR THIS SEASON"}
          fetchType={"thisSeason"}
          limit={4}
        />
        <HomeSection
          title={"UPCOMING NEXT SEASON"}
          fetchType={"upcoming"}
          limit={4}
        />
        <HomeSection
          title={"ALL TIME POPULAR"}
          fetchType={"allTimePopular"}
          limit={4}
        />
      </div>
    </div>
  );
};

export default Home;
