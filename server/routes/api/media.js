import express from "express";
import {
  getMedia,
  searchMedia,
  getTrendingMedia,
  getAllTimePopularMedia,
  getPopularThisSeasonMedia,
  getUpcomingNextSeasonMedia,
  getListAnime,
} from "../../controllers/mediaController.js";

const mediaRouter = express.Router();

// Define routes for media-related endpoints
// Note for myself: The order of these routes matters for how they are matched
mediaRouter.get("/search-anime", searchMedia("ANIME"));
mediaRouter.get("/search-manga", searchMedia("MANGA"));
mediaRouter.get("/trending-anime", getTrendingMedia("ANIME"));
mediaRouter.get("/trending-manga", getTrendingMedia("MANGA"));
mediaRouter.get("/popular/all-time-anime", getAllTimePopularMedia("ANIME"));
mediaRouter.get("/popular/all-time-manga", getAllTimePopularMedia("MANGA"));
mediaRouter.get("/popular/this-season", getPopularThisSeasonMedia("ANIME"));
mediaRouter.get("/upcoming/next-season", getUpcomingNextSeasonMedia("ANIME"));
mediaRouter.get("/animeList", getListAnime);
mediaRouter.get("/animeDetails/:id", getMedia("ANIME")); // <-- always last!
mediaRouter.get("/mangaDetails/:id", getMedia("MANGA")); // <-- always last!

export default mediaRouter;
