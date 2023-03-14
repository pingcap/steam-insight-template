export type RouteItemType = {
  id: string;
  method: "GET" | "POST";
  path: string;
  query?: RouteQueryType[];
};

export type RouteQueryType = {
  id: string;
  field: string;
  required?: boolean;
};

const COMMON_QUERY_APP_ID: RouteQueryType = {
  id: "game_name",
  field: "game_name",
  required: true,
};

const COMMON_QUERY_CATEGORY_ID: RouteQueryType = {
  id: "category_id",
  field: "category_id",
  required: true,
};

const COMMON_QUERY_GENRE_ID: RouteQueryType = {
  id: "genre_id",
  field: "genre_id",
  required: true,
};

const COMMON_QUERY_TAG_ID: RouteQueryType = {
  id: "tag_id",
  field: "tag_id",
  required: true,
};

const COMMON_QUERY_AGREE_THRESHOLD_NUM: RouteQueryType = {
  id: "agree_threshold",
  field: "agree_threshold",
  required: true,
};

const COMMON_PAGING_QUERY_LIST: RouteQueryType[] = [
  {
    id: "offset",
    field: "offset",
    required: true,
  },
  {
    id: "size",
    field: "size",
    required: true,
  },
];

export const gameRoutes: RouteItemType[] = [
  {
    // [TP][Game] Search
    id: "search",
    method: "GET",
    path: "/search",
    query: [
      {
        id: "game_name",
        field: "game_name",
        required: true,
      },
    ],
  },
  {
    // [TP][Game] Developer
    id: "developer",
    method: "GET",
    path: "/developer",
    query: [COMMON_QUERY_APP_ID],
  },
  {
    // [TP][Game] Publisher
    id: "publisher",
    method: "GET",
    path: "/publisher",
    query: [COMMON_QUERY_APP_ID],
  },
  {
    // [TP][Game] Genre
    id: "genre",
    method: "GET",
    path: "/genre",
    query: [COMMON_QUERY_APP_ID],
  },
  {
    // [TP][Game] Category
    id: "category",
    method: "GET",
    path: "/category",
    query: [COMMON_QUERY_APP_ID],
  },
  {
    // [TP][Game] Supported Language
    id: "supported_language",
    method: "GET",
    path: "/supported_language",
    query: [COMMON_QUERY_APP_ID],
  },
  {
    // [TP][Game] All Audio Language
    id: "all_audio_language",
    method: "GET",
    path: "/all_audio_language",
    query: [COMMON_QUERY_APP_ID],
  },
  {
    // [TP][Game] Tag
    id: "tag",
    method: "GET",
    path: "/tag",
    query: [COMMON_QUERY_APP_ID],
  },
];

export const categoryRoutes: RouteItemType[] = [
  {
    // [TP][Category] List
    id: "list",
    method: "GET",
    path: "/list",
  },
  {
    // [TP][Category] Count
    id: "count",
    method: "GET",
    path: "/count",
    query: [COMMON_QUERY_CATEGORY_ID],
  },
  {
    // [TP][Category] Paging
    id: "paging",
    method: "GET",
    path: "/paging",
    query: [COMMON_QUERY_CATEGORY_ID, ...COMMON_PAGING_QUERY_LIST],
  },
];

export const genreRoutes: RouteItemType[] = [
  {
    // [TP][Genre] List
    id: "list",
    method: "GET",
    path: "/list",
  },
  {
    // [TP][Genre] Count
    id: "count",
    method: "GET",
    path: "/count",
    query: [COMMON_QUERY_GENRE_ID],
  },
  {
    // [TP][Genre] Paging
    id: "paging",
    method: "GET",
    path: "/paging",
    query: [COMMON_QUERY_GENRE_ID, ...COMMON_PAGING_QUERY_LIST],
  },
];

export const tagRoutes: RouteItemType[] = [
  {
    // [TP][Tag] Tag Count
    id: "tag_count",
    method: "GET",
    path: "/tag_count",
  },
  {
    // [TP][Tag] Tag Paging
    id: "tag_paging",
    method: "GET",
    path: "/tag_paging",
    query: [...COMMON_PAGING_QUERY_LIST],
  },
  {
    // [TP][Tag] Game Count
    id: "game_count",
    method: "GET",
    path: "/game_count",
    query: [COMMON_QUERY_TAG_ID],
  },
  {
    // [TP][Tag] Tag Threshold Count
    id: "tag_threshold_count",
    method: "GET",
    path: "/threshold/count",
    query: [COMMON_QUERY_AGREE_THRESHOLD_NUM],
  },
  {
    // [TP][Tag] Tag Threshold Paging
    id: "tag_threshold_paging",
    method: "GET",
    path: "/threshold/paging",
    query: [COMMON_QUERY_AGREE_THRESHOLD_NUM, ...COMMON_PAGING_QUERY_LIST],
  },
];

export const apRoutes: RouteItemType[] = [
  {
    // [AP] Time Series of Game Released Number
    id: "time_series_of_game_released_number",
    method: "GET",
    path: "/timeseries/release_num",
  },
  {
    // [AP] Time Series of Good Game Released Number
    id: "time_series_of_good_game_released_number",
    method: "GET",
    path: "/timeseries/good_release_num",
  },
  {
    // [AP] Time Series of Game Released Number Divided by Top 10 Language
    id: "time_series_of_game_released_number_divided_by_top_10_language",
    method: "GET",
    path: "/timeseries/release_num_by_language",
  },
  {
    // [AP] Time Series of Game Released Number Divided by Genre
    id: "time_series_of_game_released_number_divided_by_genre",
    method: "GET",
    path: "/timeseries/release_num_by_genre",
  },
  {
    // [AP] Estimated Owners of Games
    id: "estimated_owners_of_games",
    method: "GET",
    path: "/estimated_owners",
  },
  {
    // [AP] Top 10 Developer Companies
    id: "top_10_developer_companies",
    method: "GET",
    path: "/top10/developer",
  },
  {
    // [AP] Top 10 Publisher Companies
    id: "top_10_publisher_companies",
    method: "GET",
    path: "/top10/publisher",
  },
  {
    // [AP] Top 10 Time Killers
    id: "top_10_time_killers",
    method: "GET",
    path: "/top10/time_killer",
  },
  {
    // [AP] Top 10 Games Worthy Paying
    id: "top_10_games_worthy_paying",
    method: "GET",
    path: "/top10/worth_paying",
  },
  {
    // [AP] [Indestory] Peak CCU <-> Owner Upper Bound
    id: "peak_ccu_owner_upper_bound",
    method: "GET",
    path: "/indestory/peak_ccu_owner_upper_bound",
  },
  {
    // [AP] Time Series of DLC Number
    id: "time_series_of_dlc_number",
    method: "GET",
    path: "/timeseries/dlc_num",
  },
  {
    // [AP] Top 10 Highest-Rate Developer Companies
    id: "top_10_highest_rate_developer_companies",
    method: "GET",
    path: "/top10/highest_rate_developer",
  },
  {
    // [AP] Most Diversity Game
    id: "most_diversity_game",
    method: "GET",
    path: "/most_diversity_game",
  },
  {
    // [AP] Top 5 Rate Games in Each Genre
    id: "top_5_rate_games_in_each_genre",
    method: "GET",
    path: "/top5_rate_games_in_each_genre",
  },
];

export const routes = {
  game: {
    path: "/game",
    routes: gameRoutes,
  },
  category: {
    path: "/category",
    routes: categoryRoutes,
  },
  genre: {
    path: "/genre",
    routes: genreRoutes,
  },
  tag: {
    path: "/tag",
    routes: tagRoutes,
  },
  ap: {
    path: "/ap",
    routes: apRoutes,
  },
};
