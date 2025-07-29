import AnimeSection from "./AnimeSection";

const ResultsSection = ({ searchTerm, filters, sectionType, title }) => {
  const findHeading = () => {
    if (searchTerm) {
      return "search";
    } else if (filters) {
      return "filters";
    } else if (sectionType && title) {
      return title;
    }
  };
  const heading = findHeading();
  return (
    <div className="">
      <AnimeSection inBrowse={true} title={heading} fetchType={sectionType} />
    </div>
  );
};

export default ResultsSection;
