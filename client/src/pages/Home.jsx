import HeroSection from "../components/HeroSection";
import AnimeSection from "../components/AnimeSection";

const Home = () => {
  return (
    <div className="w-full flex flex-col relative space-y-10">
      <HeroSection />
      <div className="flex-1 px-8 mdl:px-14 xl:px-0 w-full max-w-container space-y-6 mx-auto relative z-10">
        <AnimeSection title={"TRENDING NOW"} fetchType={"trending"} limit={4} />
        <AnimeSection
          title={"POPULAR THIS SEASON"}
          fetchType={"thisSeason"}
          limit={4}
        />
        <AnimeSection
          title={"UPCOMING NEXT SEASON"}
          fetchType={"upcoming"}
          limit={4}
        />
        <AnimeSection
          title={"ALL TIME POPULAR"}
          fetchType={"allTimePopular"}
          limit={4}
        />
      </div>
    </div>
  );
};

export default Home;
