import * as React from "react";
import dynamic from "next/dynamic";
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
} from "@mui/material";

import { stringToColor } from "@/utils";
import { ChartLine } from "@/components/Chart/LineChart";
import ChartCardTemplate from "@/components/Card/ChartCard";

const DynamicBarChart = dynamic(() => import("@/components/Chart/BarChart"), {
  loading: () => <>Loading...</>,
  ssr: false,
});

const MOCK_DATA = [
  {
    title: "Top 10 Developer Companies",
    sql: `SELECT
    c.company_name,
    SUM(CAST(SUBSTRING_INDEX(g.estimated_owners, ' - ', -1) AS SIGNED) + g.peak_ccu * 20) AS score
FROM developer d
LEFT JOIN games g ON d.app_id = g.app_id
LEFT JOIN company c ON c.company_id = d.company_id
GROUP BY c.company_id
ORDER BY score DESC
LIMIT 10`,
    x: "company_name",
    y: "score",
    data: [
      { company_name: "Valve", score: 803840900 },
      { company_name: "Feral Interactive (Mac)", score: 142131400 },
      { company_name: "Hidden Path Entertainment", score: 128099500 },
      { company_name: "Feral Interactive (Linux)", score: 116444600 },
      { company_name: "KRAFTON, Inc.", score: 106507980 },
      { company_name: "Facepunch Studios", score: 102844260 },
      { company_name: "Amazon Games", score: 100333760 },
      { company_name: "Ubisoft Montreal", score: 98589480 },
      { company_name: "CAPCOM Co., Ltd.", score: 71976140 },
      { company_name: "Gearbox Software", score: 68129940 },
    ],
  },
  {
    title: "Top 10 Publisher Companies",
    sql: `SELECT
    c.company_name,
    SUM(CAST(SUBSTRING_INDEX(g.estimated_owners, ' - ', -1) AS SIGNED) + g.peak_ccu * 20) AS score
FROM publisher p
LEFT JOIN games g ON p.app_id = g.app_id
LEFT JOIN company c ON c.company_id = p.company_id
GROUP BY c.company_id
ORDER BY score DESC
LIMIT 10`,
    x: "company_name",
    y: "score",
    data: [
      { company_name: "Valve", score: 883695140 },
      { company_name: "Electronic Arts", score: 238033940 },
      { company_name: "Ubisoft", score: 235029920 },
      { company_name: "SEGA", score: 197368500 },
      { company_name: "2K", score: 171355260 },
      { company_name: "Amazon Games", score: 156083780 },
      { company_name: "Square Enix", score: 148963620 },
      { company_name: "Bethesda Softworks", score: 148822180 },
      { company_name: "Xbox Game Studios", score: 148754840 },
      { company_name: "Feral Interactive (Mac)", score: 132123380 },
    ],
  },
  {
    title: "Top 10 Time Killers",
    sql: `SELECT name, average_playtime_forever
    FROM games
    ORDER BY average_playtime_forever DESC
    LIMIT 10`,
    x: "name",
    y: "average_playtime_forever",
    data: [
      { name: "Boom 3D", average_playtime_forever: 145727 },
      {
        name: "Energy Engine PC Live Wallpaper",
        average_playtime_forever: 104238,
      },
      { name: "副作用之瞳-Tlicolity Eyes-", average_playtime_forever: 90351 },
      { name: "Defense Clicker", average_playtime_forever: 76068 },
      { name: "Relive", average_playtime_forever: 68357 },
      { name: "Sisyphus Reborn", average_playtime_forever: 68159 },
      { name: "YoloMouse", average_playtime_forever: 64973 },
      { name: "WARRIORS ALL-STARS", average_playtime_forever: 51388 },
      {
        name: "拯救大魔王2 Rescue the Great Demon 2",
        average_playtime_forever: 49555,
      },
      { name: "Combat Mission Shock Force 2", average_playtime_forever: 47336 },
    ],
  },
  {
    title: "Top 10 Games Worthy Paying",
    sql: `SELECT 
    name,
    (metacritic_score - 80) / price AS unit_price
FROM games
WHERE metacritic_score > 80
AND price > 0
ORDER BY unit_price DESC
LIMIT 10`,
    x: "name",
    y: "unit_price",
    data: [
      { name: "Tumblestone", unit_price: 5.5 },
      { name: "Silent Hunter® III", unit_price: 5.0 },
      { name: "Disciples II: Gallean's Return", unit_price: 4.0 },
      { name: "Max Payne", unit_price: 3.0 },
      { name: "Her Story", unit_price: 3.0 },
      { name: "The Longest Journey", unit_price: 2.75 },
      { name: "Super Hexagon", unit_price: 2.6667 },
      { name: "Star Control III", unit_price: 2.25 },
      { name: "Sid Meier's Civilization® III Complete", unit_price: 2.0 },
      { name: "Shatter", unit_price: 2.0 },
    ],
  },
];

export default function TopTenCardGroup(props: {}) {
  return (
    <>
      {MOCK_DATA.map((item) => (
        <Grid key={item.title} xs={12} md={6}>
          <TopTenCardTemplate
            title={item.title}
            data={item.data}
            x={item.x}
            y={item.y}
            // syncId={item.syncId}
            sql={item.sql}
          />
        </Grid>
      ))}
    </>
  );
}

function TopTenCardTemplate(props: {
  title: string;
  sql: string;
  data: any[];
  x: string;
  y: string;
}) {
  const { title, sql, data, x, y } = props;

  return (
    <ChartCardTemplate title={title} sql={sql}>
      <DynamicBarChart data={data} xDataKey={x} barDataKey={y} />
    </ChartCardTemplate>
  );
}
