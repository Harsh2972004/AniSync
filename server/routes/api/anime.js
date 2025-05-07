import express from "express";
import {
  searchAnime,
  getTrendingAnime,
  getAllTimePopularAnime,
  getPopularThisSeasonAnime,
  getUpcomingNextSeasonAnime,
} from "../../controllers/animeController.js";

const animeRouter = express.Router();

animeRouter.get("/search", searchAnime);
animeRouter.get("/trending", getTrendingAnime);
animeRouter.get("/popular/all-time", getAllTimePopularAnime);
animeRouter.get("/popular/this-season", getPopularThisSeasonAnime);
animeRouter.get("/upcoming/next-season", getUpcomingNextSeasonAnime);

export default animeRouter;
