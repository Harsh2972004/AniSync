import API from "./api";

export const getTrendingAnime = (perPage, page) =>
  API.get(`/anime/trending-anime?perPage=${perPage}&page=${page}`);
export const getAllTimePopularAnime = (perPage, page) =>
  API.get(`/anime/popular/all-time-anime?perPage=${perPage}&page=${page}`);
export const getPopularThisSeasonAnime = (perPage, page) =>
  API.get(`/anime/popular/this-season?perPage=${perPage}&page=${page}`);
export const getUpcomingNextSeasonAnime = (perPage, page) =>
  API.get(`/anime/upcoming/next-season?perPage=${perPage}&page=${page}`);
export const getSearchedAnime = (perPage, page, query) =>
  API.get(
    `/anime/search-anime?perPage=${perPage}&page=${page}&search=${query}`
  );
