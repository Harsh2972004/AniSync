import axios from "axios";

export const fetchFromAnilist = async ({ query, variables }) => {
  const graphqlQuery = {
    query,
    variables,
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
    return response.data.data;
  } catch (error) {
    throw error;
  }
};
