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

export const updateAnimeProgress = (animeId, status, progress, score, notes) =>
  API.put("/list/updateAnime", { animeId, status, progress, score, notes });

export const getFavourites = () => API.get("/list/getFavourites");

export const deleteFavourite = (animeId) =>
  API.delete("/list/deleteFavourite", { data: { animeId } });

export const deleteAnime = (animeId) =>
  API.delete("/list/removeAnime", { data: { animeId } });
