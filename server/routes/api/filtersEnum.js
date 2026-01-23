import express from "express";
import { getFiltersEnum } from "../../controllers/filtersEnumController.js";
const filterRouter = express.Router();

filterRouter.get("/", async (req, res, next) => {
  try {
    const data = await getFiltersEnum();
    if (!data) {
      const error = new Error("Failed to fetch filter data");
      error.statusCode = 500;
      return next(error);
    }
    res.json(data);
  } catch (error) {
    next(error);
  }
});

export default filterRouter;
