import * as React from "react";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Stack,
  SvgIcon,
  Typography,
  Unstable_Grid2 as Grid,
  Button,
  TextField,
  Autocomplete,
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";

import { CodeBlock } from "@atlaskit/code";

import GamePanelCardTemplate from "@/components/Card/GamePanelCard";
import { sleep } from "@/utils";

export default function GamePanelGroup(props: {}) {
  return (
    <>
      <Grid xs={12}>
        <GamePanelCardTemplate title="Game Panel">
          <Content />
        </GamePanelCardTemplate>
      </Grid>
    </>
  );
}

const Content = () => {
  // const [gameName, setGameName] = React.useState<string>("");
  const [selectedGame, setSelectedGame] = React.useState<{
    name: string;
    id: number;
  } | null>(null);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [result, setResult] = React.useState<any>(null);

  const MOCK_SQL = `-- developers
SELECT c.company_name
FROM developer d
LEFT JOIN company c ON c.company_id = d.company_id
WHERE d.app_id = $\{app_id}

-- publishers
SELECT c.company_name
FROM publisher p
LEFT JOIN company c ON c.company_id = p.company_id
WHERE p.app_id = $\{app_id}

-- genres
SELECT g.genre_name 
FROM game_genre gg 
LEFT JOIN genre g ON g.genre_id = gg.genre_id 
WHERE gg.app_id = $\{app_id}

-- categories
SELECT c.category_name 
FROM game_category gc
LEFT JOIN category c ON gc.category_id  = c.category_id 
WHERE gc.app_id = $\{app_id}

-- supported_languages
SELECT l.language_name 
FROM supported_language sl 
LEFT JOIN \`language\` l ON l.language_id = sl.language_id 
WHERE sl.app_id = $\{app_id}

-- all_audio_languages
SELECT l.language_name 
FROM all_audio_language aal 
LEFT JOIN \`language\` l ON l.language_id = aal.language_id 
WHERE aal.app_id = $\{app_id}

-- tags
SELECT t.tag_name, gt.agree_num
FROM game_tag gt 
LEFT JOIN tag t ON t.tag_id = gt.tag_id 
WHERE gt.app_id = $\{app_id}`;

  // const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   // console.log(e.target.value);
  //   setGameName(e.target.value || "");
  // };

  const handleQuery = async () => {
    setLoading(true);
    try {
      await sleep(2000);
      setResult("result");
    } catch (error) {
      // TODO: handle error
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 2,
        }}
      >
        {/* <TextField
          variant="outlined"
          size="small"
          placeholder="Input Game Name"
          onChange={handleInput}
        /> */}
        <Autocomplete
          size="small"
          disablePortal
          options={MOCK_GAME_LIST}
          getOptionLabel={(option) => `[${option.id}]${option.name}`}
          sx={{ width: 300 }}
          onChange={(e, value) => {
            if (value) {
              setSelectedGame(value);
            }
          }}
          renderInput={(params) => (
            <TextField
              variant="outlined"
              placeholder="Input Game Name"
              {...params}
            />
          )}
        />
        <LoadingButton
          size="small"
          variant="contained"
          endIcon={<PlayArrowIcon />}
          disabled={!selectedGame}
          loading={loading}
          onClick={handleQuery}
        >
          Query
        </LoadingButton>
        <Typography variant="body2" color="text.secondary">
          {selectedGame?.name}
        </Typography>
      </Box>
      <Box
        sx={{
          height: 200,
          overflow: "auto",
        }}
      >
        <CodeBlock
          language="sql"
          text={
            selectedGame
              ? MOCK_SQL.replaceAll("${app_id}", `${selectedGame.id}`)
              : MOCK_SQL
          }
        />
      </Box>
      {result && <CodeBlock showLineNumbers={false} text={result} />}
    </Box>
  );
};

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
