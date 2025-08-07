import express from "express";
import {
  getFullAnimeList,
  addAnime,
  updateAnime,
  deleteAnime,
  deleteAllAnime,
  addToFavourite,
  getFavourites,
  deleteFavourite,
  deleteAllFavourites,
} from "../../controllers/listController.js";
import isAuthenticated from "../../middleware/isAuthenticated.js";

const listRouter = express.Router();

listRouter.use(isAuthenticated);

listRouter.post("/addAnime", addAnime);
listRouter.get("/getAnimeList", getFullAnimeList);
listRouter.put("/updateAnime", updateAnime);
listRouter.delete("/removeAnime", deleteAnime);
listRouter.delete("/removeAllAnime", deleteAllAnime);
listRouter.post("/addFavourite", addToFavourite);
listRouter.get("/getFavourites", getFavourites);
listRouter.delete("/deleteFavourite", deleteFavourite);
listRouter.delete("/deleteAllFavourite", deleteAllFavourites);

export default listRouter;
