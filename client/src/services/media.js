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
  const params = new URLSearchParams({
    perPage,
    page,
    search: query,
  });

  Object.entries(filters).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      value.forEach((val) => params.append(key, val));
    } else if (value !== undefined && value !== "") {
      params.append(key, value);
    }
  });

  return API.get(`/anime/search-anime?${params.toString()}`);
};
