export const paginatedMediaQuery = `
  query ($page: Int, $perPage: Int, $search: String, $season: MediaSeason, $year: Int, $type: MediaType, $sort: [MediaSort], $genres: [String]), $format: MediaFormat {
    Page(page: $page, perPage: $perPage) {
      pageInfo {
        total
        perPage
        currentPage
        lastPage
        hasNextPage
      }
      media(isAdult: false, search: $search, type: $type, season: $season, seasonYear: $year, sort: $sort, genres: $genres, format: $format) {
        id
        title { romaji english native }
        coverImage { large medium }
        description
        genres
        startDate{year month day}
      }
    }
  }
`;
