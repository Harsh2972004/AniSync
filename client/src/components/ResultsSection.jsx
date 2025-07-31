import AnimeSection from "./AnimeSection";
import SearchResults from "./SearchResults";

const ResultsSection = ({ searchTerm, filters, sectionType, title }) => {
  const findHeading = () => {
    if (searchTerm) {
      return `Search Results for "${searchTerm}"`;
    } else if (filters) {
      return "Filtered Results";
    } else if (sectionType && title) {
      return title;
    }
  };
  const heading = findHeading();

  // If it's a search, use SearchResults component
  if (searchTerm) {
    return <SearchResults searchTerm={searchTerm} title={heading} />;
  }

  // For other cases, use AnimeSection
  return (
    <div className="">
      <AnimeSection inBrowse={true} title={heading} fetchType={sectionType} />
    </div>
  );
};

export default ResultsSection;
