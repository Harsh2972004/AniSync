import { useRef, useCallback, useState, useEffect } from "react";

const sectionCache = {};
const CACHE_DURATION_MS = 5 * 60 * 1000; // 5 minutes

const useInfiniteScroll = (
  fetchFunction,
  deps = [],
  cacheKey = null,
  mode = "default"
) => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  const observer = useRef();
  const isCacheLoaded = useRef(false);

  const lastAnimeRef = useCallback(
    (node) => {
      if (isLoading) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((enteries) => {
        if (enteries[0].isIntersecting && !isLoading && hasMore) {
          setPage((prev) => prev + 1);
        }
      });

      if (node) observer.current.observe(node);
    },
    [isLoading, hasMore]
  );

  useEffect(() => {
    const loadData = async () => {
      if (cacheKey && sectionCache[cacheKey] && mode === "default") {
        const cached = sectionCache[cacheKey];
        const isExpired = Date.now() - cached.timestamp > CACHE_DURATION_MS;

        if (!isExpired) {
          setData(cached.data);
          setPage(cached.page);
          setHasMore(cached.hasMore);
          setIsLoading(false);
          isCacheLoaded.current = true;
          return;
        } else {
          delete sectionCache[cacheKey];
        }
      }

      if (!hasMore) return;

      setIsLoading(true);
      try {
        const newData = await fetchFunction(page);
        if (!newData || newData.length === 0) {
          setHasMore(false);
        } else {
          setData((prev) => {
            const combined = [...prev, ...newData];

            if (cacheKey && mode === "default") {
              sectionCache[cacheKey] = {
                data: combined,
                page: page + 1,
                hasMore: true,
                timestamp: Date.now(),
              };
            }
            return combined;
          });
        }
      } catch (error) {
        console.error("Error fetching anime:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [page, ...deps]);

  useEffect(() => {
    if (!(cacheKey && sectionCache[cacheKey])) {
      setData([]);
      setPage(1);
      setHasMore(true);
      setIsLoading(true);
    }
    isCacheLoaded.current = false;
  }, deps);

  return { data, lastAnimeRef, isLoading };
};

export default useInfiniteScroll;
