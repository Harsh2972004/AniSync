export const paginatedMediaQuery = `
  query ($page: Int, $perPage: Int, $search: String, $season: MediaSeason, $seasonYear: Int, $type: MediaType, $sort: [MediaSort], $genre: String, $format: MediaFormat)  {
    Page(page: $page, perPage: $perPage) {
      pageInfo {
        total
        perPage
        currentPage
        lastPage
        hasNextPage
      }
      media(isAdult: false, search: $search, type: $type, season: $season, seasonYear: $seasonYear, sort: $sort, genre: $genre, format: $format) {
        id
        title { romaji english native }
        coverImage { extraLarge large medium }
        description
        genres
        seasonYear
        startDate{year month day}
      }
    }
  }
`;

export const introspectionQuery = `
{
  
  format: __type(name: "MediaFormat") {
    enumValues {
      name
    }
  }
  status: __type(name: "MediaStatus") {
    enumValues {
      name
    }
  }
  season: __type(name: "MediaSeason") {
    enumValues {
      name
    }
  }
  _genres: GenreCollection

}`;
