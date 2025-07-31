import { useRef, useCallback, useState, useEffect } from "react";

const useInfiniteScroll = (fetchFunction, deps = []) => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  const observer = useRef();
  const lastAnimeRef = useCallback(
    (node) => {
      console.log(node);
      if (isLoading) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((enteries) => {
        if (enteries[0].isIntersecting && !isLoading && hasMore) {
          console.log("setting page from the observer");
          setPage((prev) => {
            console.log("setting page:", prev);

            return prev + 1;
          });
        }
      });

      if (node) observer.current.observe(node);
    },
    [isLoading, hasMore]
  );

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      try {
        const newData = await fetchFunction(page);
        console.log(page, newData);
        if (!newData || newData.length === 0) {
          setHasMore(false);
        } else {
          setData((prev) => [...prev, ...newData]);
        }
      } catch (error) {
        console.log({ "an error occurred fetching anime": error });
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [page, ...deps]);

  useEffect(() => {
    setData([]);
    setPage(1);
    setHasMore(true);
    setIsLoading(false);
  }, deps);

  return { data, lastAnimeRef, isLoading };
};

export default useInfiniteScroll;
