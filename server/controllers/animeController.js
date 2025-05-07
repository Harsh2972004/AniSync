import axios from "axios";

export const searchAnime = async (req, res) => {
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
                        };
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
};

export const getTrendingAnime = async (req, res) => {
  const graphqlQuery = {
    query: `
            query {
                Page(perPage: 10) {
                    media(sort: TRENDING_DESC, type: ANIME) {
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
};

export const getAllTimePopularAnime = async (req, res) => {
  const graphqlQuery = {
    query: `
            query {
                Page(perPage: 10) {
                    media(sort: POPULARITY_DESC, type: ANIME) {
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
};

export const getPopularThisSeasonAnime = async (req, res) => {
  // determine the current season and year
  const month = new Date().getMonth() + 1;
  const year = new Date().getFullYear();

  let season;
  if (month >= 1 && month <= 3) {
    season = "WINTER";
  }
  if (month >= 4 && month <= 6) {
    season = "SPRING";
  }
  if (month >= 7 && month <= 9) {
    season = "SUMMER";
  }
  if (month >= 10 && month <= 12) {
    season = "FALL";
  }

  console.log(season, year);
  const graphqlQuery = {
    query: `
            query($season: MediaSeason, $year: Int) {
                Page(perPage: 10) {
                    media(sort: POPULARITY_DESC, type: ANIME, season: $season, seasonYear: $year) {
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
    variables: {
      season: season,
      year: year,
    },
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
};

export const getUpcomingNextSeasonAnime = async (req, res) => {
  // determine the current season and year
  const month = new Date().getMonth() + 1;
  const year = new Date().getFullYear();

  let nextSeason;
  let nextYear = year;
  if (month >= 1 && month <= 3) {
    nextSeason = "SPRING";
  }
  if (month >= 4 && month <= 6) {
    nextSeason = "SUMMER";
  }
  if (month >= 7 && month <= 9) {
    nextSeason = "FALL";
  }
  if (month >= 10 && month <= 12) {
    nextSeason = "WINTER";
    nextYear = year + 1;
  }

  console.log(nextSeason, year);
  const graphqlQuery = {
    query: `
            query($season: MediaSeason, $year: Int) {
                Page(perPage: 10) {
                    media(sort: POPULARITY_DESC, type: ANIME, season: $season, seasonYear: $year) {
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
    variables: {
      season: nextSeason,
      year: nextYear,
    },
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
};
