import Navbar from "../components/Navbar";
import characters from "../assets/images/characters.png";
import HeroSection from "../components/HeroSection";

const Home = () => {
  return (
    <div className="flex flex-col bg-[url('../assets/images/landingBg.jpg')] bg-cover h-screen relative">
      <Navbar />
      <img
        className="w-[45%] absolute left-0 bottom-0 z-0"
        src={characters}
        alt="anime-characters"
      />
      <main className="flex-1 max-w-container mx-auto relative z-10">
        <HeroSection />
        <div></div>
      </main>
    </div>
  );
};

export default Home;
