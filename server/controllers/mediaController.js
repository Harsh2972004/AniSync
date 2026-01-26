import { fetchFromAnilist } from "../utils/anilistHelper.js";
import { paginatedMediaQuery } from "../utils/anilistQueries.js";
import axios from "axios";

export const searchMedia = (mediaType) => async (req, res, next) => {
  const query = req.query.search;
  const page = parseInt(req.query.page, 10) || 1; // Default to page 1 if not provided
  const perPage = parseInt(req.query.perPage, 10) || 10; // Use perPage from request or default to 10
  const genre = req.query.genre;
  const format = req.query.format;
  const seasonYear = req.query.seasonYear;
  const season = req.query.season;

  try {
    const data = await fetchFromAnilist({
      query: paginatedMediaQuery,
      variables: {
        page,
        perPage,
        search: query,
        type: mediaType,
        sort: ["SEARCH_MATCH"],
        genre,
        format,
        season,
        seasonYear,
      },
    });

    const mediaList = data.Page.media.map((media) => ({
      id: media.id,
      title: media.title,
      coverImage: media.coverImage,
      description: media.description,
      genres: media.genres,
      startDate: media.startDate,
    }));

    const pageInfo = data.Page.pageInfo;
    res.json({ mediaList, pageInfo });
  } catch (error) {
    next(error);
  }
};

export const getTrendingMedia = (mediaType) => async (req, res, next) => {
  const page = parseInt(req.query.page, 10) || 1; // Default to page 1 if not provided
  const perPage = parseInt(req.query.perPage, 10) || 10;
  try {
    const data = await fetchFromAnilist({
      query: paginatedMediaQuery,
      variables: {
        page,
        perPage,
        type: mediaType,
        sort: ["TRENDING_DESC"],
      },
    });

    const mediaList = data.Page.media.map((media) => ({
      id: media.id,
      title: media.title,
      coverImage: media.coverImage,
      description: media.description,
      genres: media.genres,
      startDate: media.startDate,
    }));

    const pageInfo = data.Page.pageInfo;
    res.json({ mediaList, pageInfo });
  } catch (error) {
    next(error);
  }
};

export const getAllTimePopularMedia = (mediaType) => async (req, res) => {
  const page = parseInt(req.query.page, 10) || 1; // Default to page 1 if not provided
  const perPage = parseInt(req.query.perPage, 10) || 10;

  try {
    const data = await fetchFromAnilist({
      query: paginatedMediaQuery,
      variables: {
        page,
        perPage,
        type: mediaType,
        sort: ["POPULARITY_DESC"],
      },
    });

    const mediaList = data.Page.media.map((media) => ({
      id: media.id,
      title: media.title,
      coverImage: media.coverImage,
      description: media.description,
      genres: media.genres,
      startDate: media.startDate,
    }));

    const pageInfo = data.Page.pageInfo;
    res.json({ mediaList, pageInfo });
  } catch (error) {
    console.error("Error fetching data from Anilist API:", error.message);
    res.status(500).json({ error: "Failed to fetch data" });
  }
};

export const getPopularThisSeasonMedia = (mediaType) => async (req, res, next) => {
  const page = parseInt(req.query.page, 10) || 1; // Default to page 1 if not provided
  const perPage = parseInt(req.query.perPage, 10) || 10;
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

  try {
    const data = await fetchFromAnilist({
      query: paginatedMediaQuery,
      variables: {
        page,
        perPage,
        type: mediaType,
        sort: ["POPULARITY_DESC"],
        season,
        seasonYear: year,
      },
    });

    const mediaList = data.Page.media.map((media) => ({
      id: media.id,
      title: media.title,
      coverImage: media.coverImage,
      description: media.description,
      genres: media.genres,
      startDate: media.startDate,
    }));

    const pageInfo = data.Page.pageInfo;
    res.json({ mediaList, pageInfo });
  } catch (error) {
    next(error);
  }
};

export const getUpcomingNextSeasonMedia = (mediaType) => async (req, res) => {
  const page = parseInt(req.query.page, 10) || 1; // Default to page 1 if not provided
  const perPage = parseInt(req.query.perPage, 10) || 10;

  // determine upcoming season
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

  try {
    const data = await fetchFromAnilist({
      query: paginatedMediaQuery,
      variables: {
        page,
        perPage,
        type: mediaType,
        sort: ["POPULARITY_DESC"],
        season: nextSeason,
        seasonYear: nextYear,
      },
    });

    const mediaList = data.Page.media.map((media) => ({
      id: media.id,
      title: media.title,
      coverImage: media.coverImage,
      description: media.description,
      genres: media.genres,
      startDate: media.startDate,
    }));

    const pageInfo = data.Page.pageInfo;
    res.json({ mediaList, pageInfo });
  } catch (error) {
    console.error("Error fetching data from Anilist API:", error.message);
    res.status(500).json({ error: "Failed to fetch data" });
  }
};

export const getMedia = (mediaType) => async (req, res, next) => {
  const animeId = parseInt(req.params.id, 10);
  if (isNaN(animeId)) {
    const error = new Error("Invalid anime ID");
    error.statusCode = 400;
    return next(error);
  }
  const graphqlQuery = {
    query: `
    query ($id: Int, $type: MediaType) {
  Media(id: $id, type: $type) {
    id
    title {
      romaji
      english
      native
    }
    coverImage {
      extraLarge
      large
      medium
    }
    bannerImage
    description
    episodes
    duration
    genres
    averageScore
    popularity
    status
    season
    seasonYear
    format
    favourites
    episodes   
          nextAiringEpisode { 
          episode
          airingAt
      }
    recommendations(sort: RATING_DESC, page: 1, perPage: 6) {
      edges {
        node {
          mediaRecommendation {
            id
            title {
              romaji
              english
              native
            }
            coverImage {
              large
            }
            siteUrl
          }
        }
      }
    }
    streamingEpisodes {
      title
      thumbnail
      url
      site
    }
    startDate {
      year
      month
      day
    }
    endDate {
      year
      month
      day
    }
    studios {
      edges {
        isMain
        node {
          name
        }
      }
    }
    trailer {
      id
      site
    }
    characters( sort: [ROLE, RELEVANCE, ID], page: 1, perPage: 6) {
      edges {
      role
        node {
          name {
            full
          }
          image {
            large
          }
        }
        voiceActors {
          name {
            full
          }
          image {
            large
          }
            language
        }
      }
    }
    siteUrl   
    relations {
      edges {
        relationType
        node {
          id
          title {
            romaji
            english
            native
          }
          type
          siteUrl
          coverImage {
            large
          }
        }
      }
    }
  }
}
  `,
    variables: {
      id: animeId,
      type: mediaType,
    },
  };
  try {
    const response = await axios.post(
      "https://graphql.anilist.co",
      graphqlQuery,
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    res.json(response.data.data.Media);
  } catch (error) {
    next(error);
  }
};

export const getListAnime = async (req, res, next) => {
  const perPage = parseInt(req.query.perPage, 10) || 10;
  if (!req.query.id_in) {
    const error = new Error("Missing 'id_in' query parameter");
    error.statusCode = 400;
    return next(error);
  }
  const ids = req.query.id_in?.split(",").map(Number);

  const graphqlQuery = {
    query: `
    query ($ids: [Int], $perPage: Int) {
    Page(perPage: $perPage) {
      media(id_in: $ids, type: ANIME) {
        id
        title {
          romaji
          english
        }
        coverImage {
          large
        }
          bannerImage
          episodes   
          nextAiringEpisode { 
          episode
          airingAt
      }
      }
    }
}`,
    variables: {
      perPage,
      ids,
    },
  };

  try {
    const response = await axios.post(
      "https://graphql.anilist.co",
      graphqlQuery,
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    res.json(response.data.data.Page.media);
  } catch (error) {
    next(error);
  }
};
