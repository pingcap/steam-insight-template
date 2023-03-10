export function retriveGameListByName(name: string) {
  const MOCK_GAME_LIST = [
    { id: 10, name: "Counter-Strike" },
    { id: 20, name: "Team Fortress Classic" },
    { id: 30, name: "Day of Defeat" },
    { id: 40, name: "Deathmatch Classic" },
    { id: 50, name: "Half-Life: Opposing Force" },
    { id: 60, name: "Ricochet" },
    { id: 70, name: "Half-Life" },
    { id: 80, name: "Counter-Strike: Condition Zero" },
    { id: 100, name: "Counter-Strike: Condition Zero" },
    { id: 130, name: "Half-Life: Blue Shift" },
    { id: 220, name: "Half-Life 2" },
    { id: 240, name: "Counter-Strike: Source" },
    { id: 280, name: "Half-Life: Source" },
    { id: 300, name: "Day of Defeat: Source" },
    { id: 320, name: "Half-Life 2: Deathmatch" },
    { id: 340, name: "Half-Life 2: Lost Coast" },
    { id: 360, name: "Half-Life Deathmatch: Source" },
    { id: 380, name: "Half-Life 2: Episode One" },
    { id: 400, name: "Portal" },
    { id: 420, name: "Half-Life 2: Episode Two" },
    { id: 440, name: "Team Fortress 2" },
    { id: 500, name: "Left 4 Dead" },
    { id: 550, name: "Left 4 Dead 2" },
    { id: 570, name: "Dota 2" },
    { id: 620, name: "Portal 2" },
    { id: 630, name: "Alien Swarm" },
    { id: 659, name: "Portal 2" },
    { id: 730, name: "Counter-Strike: Global Offensive" },
    { id: 1002, name: "Rag Doll Kung Fu" },
    { id: 1200, name: "Red Orchestra: Ostfront 41-45" },
    { id: 1250, name: "Killing Floor" },
    { id: 1300, name: "SiN Episodes: Emergence" },
    { id: 1313, name: "SiN: Gold" },
    { id: 1500, name: "Darwinia" },
    { id: 1510, name: "Uplink" },
    { id: 1520, name: "DEFCON" },
  ];

  return MOCK_GAME_LIST;
}

export const ALLOWED_GAME_FIELDS = [
  {
    id: "developer",
    field: "developer",
    getSql: (app_id: string) => `SELECT c.company_name
FROM developer d
LEFT JOIN company c ON c.company_id = d.company_id
WHERE d.app_id = ${app_id}`,
  },
  {
    id: "publisher",
    field: "publisher",
    getSql: (app_id: string) => `SELECT c.company_name
FROM publisher p
LEFT JOIN company c ON c.company_id = p.company_id
WHERE p.app_id = ${app_id}`,
  },
  {
    id: "genres",
    field: "game_genre",
    getSql: (app_id: string) => `SELECT g.genre_name 
FROM game_genre gg 
LEFT JOIN genre g ON g.genre_id = gg.genre_id 
WHERE gg.app_id = ${app_id}`,
  },
  {
    id: "categories",
    field: "game_category",
    getSql: (app_id: string) => `
    SELECT c.category_name 
FROM game_category gc
LEFT JOIN category c ON gc.category_id  = c.category_id 
WHERE gc.app_id = ${app_id}`,
  },
  {
    id: "supported_languages",
    field: "supported_language",
    getSql: (app_id: string) => `SELECT l.language_name 
FROM supported_language sl 
LEFT JOIN \`language\` l ON l.language_id = sl.language_id 
WHERE sl.app_id = ${app_id}`,
  },
  {
    id: "all_audio_languages",
    field: "all_audio_language",
    getSql: (app_id: string) => `SELECT l.language_name 
FROM all_audio_language aal 
LEFT JOIN \`language\` l ON l.language_id = aal.language_id 
WHERE aal.app_id = ${app_id}`,
  },
  {
    id: "tags",
    field: "game_tag",
    getSql: (app_id: string) => `SELECT t.tag_name, gt.agree_num
FROM game_tag gt 
LEFT JOIN tag t ON t.tag_id = gt.tag_id 
WHERE gt.app_id = ${app_id}`,
  },
];
