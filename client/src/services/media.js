import API from "./api";

export const getTrendingAnime = (perPage) =>
  API.get(`/anime/trending-anime?perPage=${perPage}`);
export const getAllTimePopularAnime = (perPage) =>
  API.get(`/anime/popular/all-time-anime?perPage=${perPage}`);
export const getPopularThisSeasonAnime = (perPage) =>
  API.get(`/anime/popular/this-season?perPage=${perPage}`);
export const getUpcomingNextSeasonAnime = (perPage) =>
  API.get(`/anime/upcoming/next-season?perPage=${perPage}`);
