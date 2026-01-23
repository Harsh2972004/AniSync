import { animeAPI } from "./api";

export const getTrendingAnime = (perPage, page) =>
  animeAPI.get(`/anime/trending-anime?perPage=${perPage}&page=${page}`);

export const getAllTimePopularAnime = (perPage, page) =>
  animeAPI.get(`/anime/popular/all-time-anime?perPage=${perPage}&page=${page}`);

export const getPopularThisSeasonAnime = (perPage, page) =>
  animeAPI.get(`/anime/popular/this-season?perPage=${perPage}&page=${page}`);

export const getUpcomingNextSeasonAnime = (perPage, page) =>
  animeAPI.get(`/anime/upcoming/next-season?perPage=${perPage}&page=${page}`);

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
  return animeAPI.get(url);
};

export const filterEnums = () => {
  return animeAPI.get("/filters");
};

export const getAnimeDetails = (id) => {
  return animeAPI.get(`/anime/animeDetails/${id}`);
};
