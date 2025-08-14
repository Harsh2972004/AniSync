import API from "./api";

export const addToList = (animeId, status, progress = 1, score = 1, notes) =>
  API.post("/list/addAnime", { animeId, status, progress, score, notes });

export const addToFavourite = (animeId) =>
  API.post("/list/addFavourite", { animeId });

export const getAnimeForList = (animeId) => {
  const queryParams = animeId.join(",");
  return API.get(`/anime/animeList?id_in=${queryParams}`);
};

export const getList = () => API.get("/list/getAnimeList");

export const getFavourites = () => API.get("/list/getFavourites");
