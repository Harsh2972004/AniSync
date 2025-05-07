import express from "express";
import axios from "axios";

const animeRouter = express.Router();

animeRouter.get("/search", async (req, res) => {
  const query = req.query.search;

  const graphqlQuery = {
    query: `
            query ($search: String) {
                Page(perPage: 10) {
                    media(search: $search, type: ANIME) {
                        id
                        title {
                            romaji
                            english
                            native
                        }
                        coverImage {
                            large
                            medium
                        }
                            description
                    }
                }
            }`,
    variables: { search: query },
  };

  try {
    const response = await axios.post(
      "https://graphql.anilist.co",
      graphqlQuery,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const animeList = response.data.data.Page.media.map((anime) => ({
      id: anime.id,
      title: anime.title,
      coverImage: anime.coverImage,
      description: anime.description,
    }));

    res.json(animeList);
  } catch (error) {
    console.error("Error fetching data from Anilist API:", error);
    res.status(500).json({ error: "Failed to fetch data" });
  }
});

export default animeRouter;
