import { User } from "../models/userModel.js";

export const addAnime = async (req, res, next) => {
  const { animeId, status, progress, score, notes } = req.body;
  const userId = req.user._id;

  try {
    const user = await User.findById(userId);
    const alreadyExist = user.animeList.some(
      (item) => item.animeId.toString() === animeId.toString()
    );

    if (alreadyExist) {
      const error = new Error("Anime Already in list");
      error.statusCode = 400;
      return next(error);
    }

    user.animeList.push({ animeId, status, progress, score, notes });
    await user.save();
    res.json({ succes: true, animeList: user.animeList });
  } catch (error) {
    next(error);
  }
};

export const getFullAnimeList = async (req, res, next) => {
  const userId = req.user._id;

  try {
    const user = await User.findById(userId);
    res.json({ animeList: user.animeList });
  } catch (error) {
    next(error);
  }
};

export const updateAnime = async (req, res, next) => {
  const { animeId, status, progress, score, notes } = req.body;
  const userId = req.user._id;

  try {
    const user = await User.findById(userId);
    const anime = user.animeList.find(
      (item) => item.animeId.toString() === animeId.toString()
    );

    if (!anime) {
      const error = new Error("Anime not found in the list.");
      error.statusCode = 404;
      return next(error);
    }

    // Update fields
    anime.status = status ?? anime.status;
    anime.progress = progress ?? anime.progress;
    anime.score = score ?? anime.score;
    anime.notes = notes ?? anime.notes;

    await user.save();
    res.json({ success: true, animeList: user.animeList });
  } catch (error) {
    next(error);
  }
};

export const deleteAnime = async (req, res, next) => {
  const userId = req.user._id;
  const { animeId } = req.body;

  try {
    const user = await User.findById(userId);
    user.animeList = user.animeList.filter((item) => item.animeId !== animeId);
    await user.save();
    res.json({ succes: true });
  } catch (error) {
    next(error);
  }
};

export const deleteAllAnime = async (req, res, next) => {
  const userId = req.user._id;

  try {
    const user = await User.findById(userId);

    user.animeList = [];
    await user.save();
    res.json({ success: true, message: "Anime list cleared" });
  } catch (error) {
    next(error);
  }
};

export const addToFavourite = async (req, res, next) => {
  const userId = req.user._id;
  const { animeId } = req.body;

  try {
    const user = await User.findById(userId);
    const alreadyExist = user.favourites.some(
      (id) => id.toString() === animeId.toString()
    );

    if (alreadyExist) {
      const error = new Error("Anime already in list");
      error.statusCode = 400;
      return next(error);
    }

    user.favourites.push(animeId);
    await user.save();
    res.json({ success: true, favourites: user.favourites });
  } catch (error) {
    next(error);
  }
};

export const getFavourites = async (req, res, next) => {
  const userId = req.user._id;

  try {
    const user = await User.findById(userId);
    res.json({ success: true, favourites: user.favourites });
  } catch (error) {
    next(error);
  }
};

export const deleteFavourite = async (req, res, next) => {
  const userId = req.user._id;
  const { animeId } = req.body;

  try {
    const user = await User.findById(userId);

    user.favourites = user.favourites.filter((id) => id !== Number(animeId));
    await user.save();

    res.json({ success: true, favourites: user.favourites });
  } catch (error) {
    next(error);
  }
};

export const deleteAllFavourites = async (req, res, next) => {
  const userId = req.user._id;

  try {
    const user = await User.findById(userId);
    user.favourites = [];
    await user.save();

    res.json({ success: true, message: "favourites cleared" });
  } catch (error) {
    next(error);
  }
};
