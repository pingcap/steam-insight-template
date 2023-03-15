export const apRouteCfg: {
  id: string;
  sql: string;
  title?: string;
  chartType?: "line" | "bar" | "pie";
  chartCfg?: {
    x: string;
    y: string;
    line?: string;
  };
  fullWidth?: boolean;
}[] = [
  {
    // [AP] Time Series of Game Released Number
    id: "time_series_of_game_released_number",
    title: "Time Series of Game Released Number",
    chartType: "line",
    sql: `SELECT 
    YEAR (games.release_date) AS release_year,
    count(*) AS num
FROM games
WHERE games.release_date < '2023-01-01'
GROUP BY YEAR (games.release_date)`,
    chartCfg: {
      x: "release_year",
      y: "num",
    },
  },
  {
    // [AP] Time Series of Good Game Released Number
    id: "time_series_of_good_game_released_number",
    title: "Time Series of Good Game Released Number",
    chartType: "line",
    chartCfg: {
      x: "release_year",
      y: "num",
    },
    sql: `SELECT 
    YEAR (games.release_date) AS release_year,
    count(*) AS num
FROM games
WHERE games.release_date < '2023-01-01'
AND games.metacritic_score > 85
GROUP BY YEAR (games.release_date)`,
  },
  {
    // [AP] Time Series of Game Released Number Divided by Top 10 Language
    id: "time_series_of_game_released_number_divided_by_top_10_language",
    title: "Time Series of Game Released Number Divided by Top 10 Language",
    chartType: "line",
    sql: `WITH top10_languages AS (
      SELECT 
          language_id,
          COUNT(app_id) AS num
      FROM supported_language
      GROUP BY language_id
      ORDER BY num DESC
      LIMIT 10
  )
  SELECT 
      l.language_name AS language_name,
      YEAR(g.release_date) AS release_year,
      COUNT(*) AS num
  FROM supported_language AS sl
  LEFT JOIN games g ON g.app_id = sl.app_id
  LEFT JOIN language l ON l.language_id = sl.language_id
  INNER JOIN top10_languages top10 ON top10.language_id = sl.language_id
  WHERE g.release_date < '2023-01-01'
  GROUP BY l.language_name, YEAR(g.release_date)
  `,
    chartCfg: {
      x: "release_year",
      y: "num",
      line: "language_name",
    },
  },
  {
    // [AP] Time Series of Game Released Number Divided by Genre
    id: "time_series_of_game_released_number_divided_by_genre",
    title: "Time Series of Game Released Number Divided by Genre",
    chartType: "line",
    chartCfg: {
      x: "release_year",
      y: "num",
      line: "genre_name",
    },
    sql: `SELECT 
    genre.genre_name AS genre_name,
    YEAR(g.release_date) AS release_year,
    COUNT(*) AS num
FROM game_genre AS gg
LEFT JOIN games g ON g.app_id = gg.app_id
LEFT JOIN genre ON genre.genre_id = gg.genre_id
WHERE g.release_date < '2023-01-01'
GROUP BY genre.genre_name, YEAR(g.release_date)
ORDER BY num DESC
`,
  },
  {
    // [AP] Estimated Owners of Games
    id: "estimated_owners_of_games",
    title: "Estimated Owners of Games",
    chartType: "bar",
    chartCfg: {
      x: "estimated_owners",
      y: "COUNT(*)",
    },
    sql: `SELECT 
    CAST(SUBSTRING_INDEX(estimated_owners, ' - ', -1) AS SIGNED) AS floor_bound, 
    estimated_owners, 
    COUNT(*)
FROM games
GROUP BY estimated_owners
ORDER BY floor_bound`,
  },
  {
    // [AP] Top 10 Developer Companies
    id: "top_10_developer_companies",
    title: "Top 10 Developer Companies",
    chartType: "bar",
    chartCfg: {
      x: "company_name",
      y: "score",
    },
    sql: `SELECT
    c.company_name,
    SUM(CAST(SUBSTRING_INDEX(g.estimated_owners, ' - ', -1) AS SIGNED) + g.peak_ccu * 20) AS score
FROM developer d
LEFT JOIN games g ON d.app_id = g.app_id
LEFT JOIN company c ON c.company_id = d.company_id
GROUP BY c.company_id
ORDER BY score DESC
LIMIT 10`,
  },
  {
    // [AP] Top 10 Publisher Companies
    id: "top_10_publisher_companies",
    title: "Top 10 Publisher Companies",
    chartType: "bar",
    chartCfg: {
      x: "company_name",
      y: "score",
    },
    sql: `SELECT
    c.company_name,
    SUM(CAST(SUBSTRING_INDEX(g.estimated_owners, ' - ', -1) AS SIGNED) + g.peak_ccu * 20) AS score
FROM publisher p
LEFT JOIN games g ON p.app_id = g.app_id
LEFT JOIN company c ON c.company_id = p.company_id
GROUP BY c.company_id
ORDER BY score DESC
LIMIT 10`,
  },
  {
    // [AP] Top 10 Time Killers
    id: "top_10_time_killers",
    title: "Top 10 Time Killers",
    chartType: "bar",
    chartCfg: {
      x: "name",
      y: "average_playtime_forever",
    },
    sql: `SELECT name, average_playtime_forever
    FROM games
    ORDER BY average_playtime_forever DESC
    LIMIT 10`,
  },
  {
    // [AP] Top 10 Games Worthy Paying
    id: "top_10_games_worthy_paying",
    title: "Top 10 Games Worthy Paying",
    chartType: "bar",
    chartCfg: {
      x: "name",
      y: "unit_price",
    },
    sql: `SELECT 
    name,
    (metacritic_score - 80) / price AS unit_price
FROM games
WHERE metacritic_score > 80
AND price > 0
ORDER BY unit_price DESC
LIMIT 10`,
  },
  {
    // [AP] [Indestory] Peak CCU <-> Owner Upper Bound
    id: "peak_ccu_owner_upper_bound",
    title: "Peak CCU <-> Owner Upper Bound",
    chartType: "line",
    chartCfg: {
      x: "estimated_owners",
      y: "per_ccu_owners",
    },
    sql: `SELECT 
    CAST(SUBSTRING_INDEX(estimated_owners, ' - ', -1) AS SIGNED) AS upper_bound,
    AVG(peak_ccu) AS avg_peak_ccu, 
    AVG(CAST(SUBSTRING_INDEX(estimated_owners, ' - ', -1) AS SIGNED) / peak_ccu) AS per_ccu_owners, 
    estimated_owners
FROM games
GROUP BY estimated_owners
ORDER BY upper_bound`,
  },
  {
    // [AP] Time Series of DLC Number
    id: "time_series_of_dlc_number",
    title: "Time Series of DLC Number",
    chartType: "line",
    chartCfg: {
      x: "release_year",
      y: "num",
    },
    sql: `SELECT 
    YEAR (games.release_date) AS release_year,
    count(dlc_count) AS num
FROM games
WHERE games.release_date < '2023-01-01'
GROUP BY YEAR (games.release_date)`,
  },
  {
    // [AP] Top 10 Highest-Rate Developer Companies
    id: "top_10_highest_rate_developer_companies",
    title: "Top 10 Highest-Rate Developer Companies",
    chartType: "bar",
    chartCfg: {
      x: "company_name",
      y: "score",
    },
    sql: `SELECT
    c.company_name,
    SUM(g.metacritic_score) AS score
FROM developer d
LEFT JOIN games g ON d.app_id = g.app_id
LEFT JOIN company c ON c.company_id = d.company_id
GROUP BY c.company_id
ORDER BY score DESC
LIMIT 10`,
  },
  {
    // [AP] Most Diversity Game
    id: "most_diversity_game",
    title: "Most Diversity Game",
    chartType: "pie",
    chartCfg: {
      x: "tag_name",
      y: "agree_num",
    },
    fullWidth: true,
    sql: `WITH most_diverce_game AS (
      SELECT app_id, count(*) num
      FROM game_tag
      GROUP BY app_id
      ORDER BY num DESC
      LIMIT 1
  )
  SELECT tag.tag_name, gt.agree_num
  FROM game_tag gt
  LEFT JOIN tag ON tag.tag_id = gt.tag_id
  WHERE app_id = (SELECT m.app_id FROM most_diverce_game m)`,
  },
  {
    // [AP] Top 5 Rate Games in Each Genre
    id: "top_5_rate_games_in_each_genre",
    title: "Top 5 Rate Games in Each Genre",
    sql: `With r AS (
      SELECT 
          games.name,
          genre.genre_name,
          rank() over (partition by genre.genre_id order by games.metacritic_score desc) as ranking
      FROM game_genre gg
      LEFT JOIN genre ON genre.genre_id = gg.genre_id
      LEFT JOIN games ON games.app_id = gg.app_id
      WHERE games.metacritic_score != 0
  )
  SELECT *
  FROM r
  WHERE r.ranking <= 5`,
  },
];
