export const paginatedMediaQuery = `
  query ($page: Int, $perPage: Int, $search: String, $season: MediaSeason, $year: Int, $type: MediaType, $sort: [MediaSort]) {
    Page(page: $page, perPage: $perPage) {
      pageInfo {
        total
        perPage
        currentPage
        lastPage
        hasNextPage
      }
      media(search: $search, type: $type, season: $season, seasonYear: $year, sort: $sort) {
        id
        title { romaji english native }
        coverImage { large medium }
        description
      }
    }
  }
`;
