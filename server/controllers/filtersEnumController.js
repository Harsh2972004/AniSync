import { fetchFromAnilist } from "./anilistHelper.js";
import { introspectionQuery } from "./anilistQueries.js";

let cachedFilters = null;
let lastFetched = null;
const CACHE_DURATION = 1000 * 60 * 60 * 12;

export const getFiltersEnum = async () => {
  const now = Date.now();

  if (cachedFilters && lastFetched && now - lastFetched < CACHE_DURATION) {
    return cachedFilters;
  }

  try {
    const data = await fetchFromAnilist({ query: introspectionQuery });
    if (!data) throw new Error("no data in response");
    lastFetched = now;
    return (cachedFilters = {
      genres: data._genres.map((v) => v),
      formats: data.format.enumValues.map((v) => v.name),
      statuses: data.status.enumValues.map((v) => v.name),
      seasons: data.season.enumValues.map((v) => v.name),
    });
  } catch (error) {
    console.error("Error fetching introspection data:", error.message);
    // fallback to cache if available
    if (cachedFilters) return cachedFilters;
    return null;
  }
};
