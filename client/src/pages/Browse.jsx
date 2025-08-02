import { useEffect } from "react";
import Filters from "../components/Filters";
import AnimeSection from "../components/AnimeSection";
import ResultsSection from "../components/ResultsSection";
import { useBrowse } from "../context/BrowseContext";
import { useSearchParams } from "react-router-dom";

const Browse = () => {
  const [searchParams] = useSearchParams();
  const {
    mode,
    setMode,
    submittedSearchTerm,
    filters,
    sectionType,
    setSectionType,
    reset,
    title,
    setTitle,
  } = useBrowse();

  useEffect(() => {
    const queryMode = searchParams.get("mode");
    const querySectionType = searchParams.get("sectionType");
    const queryTitle = searchParams.get("title");

    if (queryMode === "sectionViewAll" && querySectionType) {
      setMode("sectionViewAll");
      setSectionType(querySectionType);
      setTitle(queryTitle);
    } else if (!queryMode && !querySectionType && !queryTitle) {
      reset();
    }
  }, [searchParams]);

  return (
    <div className="container-spacing space-y-6">
      <Filters />

      {mode === "default" && (
        <>
          <AnimeSection
            title={"TRENDING NOW"}
            fetchType={"trending"}
            limit={4}
          />
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
        </>
      )}
      {mode === "search" && <ResultsSection searchTerm={submittedSearchTerm} />}
      {mode === "filtered" && (
        <ResultsSection filters={filters} searchTerm={submittedSearchTerm} />
      )}
      {mode === "sectionViewAll" && (
        <ResultsSection
          searchTerm={searchTerm}
          title={title}
          sectionType={sectionType}
        />
      )}
    </div>
  );
};

export default Browse;
