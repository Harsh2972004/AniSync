import API from "./api";

export const getTrendingAnime = (perPage, page) =>
  API.get(`/anime/trending-anime?perPage=${perPage}&page=${page}`);

export const getAllTimePopularAnime = (perPage, page) =>
  API.get(`/anime/popular/all-time-anime?perPage=${perPage}&page=${page}`);

export const getPopularThisSeasonAnime = (perPage, page) =>
  API.get(`/anime/popular/this-season?perPage=${perPage}&page=${page}`);

export const getUpcomingNextSeasonAnime = (perPage, page) =>
  API.get(`/anime/upcoming/next-season?perPage=${perPage}&page=${page}`);

export const getSearchedAnime = (perPage, page, query, filters) => {
  const cleanedFilters = Object.fromEntries(
    Object.entries(filters).filter(
      ([_, value]) => value !== "" && value != null
    )
  );

  const params = new URLSearchParams({
    perPage,
    page,
    ...(query !== "" && { search: query }),
    ...cleanedFilters,
  });

  const url = `/anime/search-anime?${params.toString()}`;
  console.log(url, filters);
  return API.get(url);
};

export const filterEnums = () => {
  return API.get("/filters");
};

export const getAnimeDetails = (id) => {
  return API.get(`/anime/animeDetails/${id}`);
};
