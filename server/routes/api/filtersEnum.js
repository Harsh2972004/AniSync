import express from "express";
import { getFiltersEnum } from "../../controllers/filtersEnumController.js";
const filterRouter = express.Router();

filterRouter.get("/", async (req, res) => {
  const data = await getFiltersEnum();
  if (!data)
    return res.status(500).json({ error: "Failed to fetch filter data" });
  res.json(data);
  console.log(data);
});

export default filterRouter;
