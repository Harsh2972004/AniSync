import { User } from "../models/userModel.js";

export const addAnime = async (req, res) => {
  const { animeId, status, progress, score, notes } = req.body;
  const userId = req.user._id;

  try {
    const user = await User.findById(userId);
    const alreadyExist = user.animeList.some(
      (item) => item.animeId.toString() === animeId.toString()
    );

    if (alreadyExist) {
      return res.status(400).json({ error: "Anime Already in list" });
    }

    user.animeList.push({ animeId, status, progress, score, notes });
    await user.save();
    res.json({ succes: true, animeList: user.animeList });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getFullAnimeList = async (req, res) => {
  const userId = req.user._id;

  try {
    const user = await User.findById(userId);
    res.json({ animeList: user.animeList });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateAnime = async (req, res) => {
  const { animeId, status, progress, score, notes } = req.body;
  const userId = req.user._id;

  try {
    const user = await User.findById(userId);
    const anime = user.animeList.find(
      (item) => item.animeId.toString() === animeId.toString()
    );

    if (!anime) {
      return res.status(404).json({ error: "Anime not found in the list." });
    }

    // Update fields
    anime.status = status ?? anime.status;
    anime.progress = progress ?? anime.progress;
    anime.score = score ?? anime.score;
    anime.notes = notes ?? anime.notes;

    await user.save();
    res.json({ success: true, animeList: user.animeList });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteAnime = async (req, res) => {
  const userId = req.user._id;
  const { animeId } = req.body;

  try {
    const user = await User.findById(userId);
    user.animeList = user.animeList.filter((item) => item.animeId !== animeId);
    await user.save();
    res.json({ succes: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteAllAnime = async (req, res) => {
  const userId = req.user._id;

  try {
    const user = await User.findById(userId);

    user.animeList = [];
    await user.save();
    res.json({ success: true, message: "Anime list cleared" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const addToFavourite = async (req, res) => {
  const userId = req.user._id;
  const { animeId } = req.body;

  try {
    const user = await User.findById(userId);
    const alreadyExist = user.favourites.some(
      (id) => id.toString() === animeId.toString()
    );

    if (alreadyExist) {
      return res.status(400).json({ error: "Anime already in list" });
    }

    user.favourites.push(animeId);
    await user.save();
    res.json({ success: true, favourites: user.favourites });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getFavourites = async (req, res) => {
  const userId = req.user._id;

  try {
    const user = await User.findById(userId);
    res.json({ success: true, favourites: user.favourites });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteFavourite = async (req, res) => {
  const userId = req.user._id;
  const { animeId } = req.body;

  try {
    const user = await User.findById(userId);

    user.favourites = user.favourites.filter((id) => id !== animeId);
    await user.save();

    res.json({ success: true, favourites: user.favourites });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteAllFavourites = async (req, res) => {
  const userId = req.user._id;

  try {
    const user = await User.findById(userId);
    user.favourites = [];
    await user.save();

    res.json({ success: true, message: "favourites cleared" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
