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
};
