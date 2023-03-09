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
import ChartCardTemplate from "@/components/Card/ChartCard";

const DynamicPieChart = dynamic(() => import("@/components/Chart/PieChart"), {
  loading: () => <>Loading...</>,
  ssr: false,
});

const MOCK_DATA = [
  {
    title: "Most Diversity Game",
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
    x: "tag_name",
    y: "agree_num",
    data: [
      { tag_name: "Sports", agree_num: 46 },
      { tag_name: "Indie", agree_num: 43 },
      { tag_name: "Casual", agree_num: 42 },
      { tag_name: "Action", agree_num: 42 },
      { tag_name: "VR", agree_num: 30 },
      { tag_name: "Rhythm", agree_num: 15 },
      { tag_name: "Music", agree_num: 14 },
      { tag_name: "Early Access", agree_num: 12 },
      { tag_name: "Fast-Paced", agree_num: 12 },
      { tag_name: "Great Soundtrack", agree_num: 12 },
      { tag_name: "Atmospheric", agree_num: 12 },
      { tag_name: "Singleplayer", agree_num: 12 },
      { tag_name: "Boxing", agree_num: 11 },
      { tag_name: "Music-Based Procedural Generation", agree_num: 11 },
      { tag_name: "Immersive", agree_num: 10 },
      { tag_name: "Level Editor", agree_num: 10 },
      { tag_name: "Modern", agree_num: 10 },
      { tag_name: "Replay Value", agree_num: 10 },
      { tag_name: "Difficult", agree_num: 10 },
      { tag_name: "Competitive", agree_num: 10 },
      { tag_name: "VR Only", agree_num: 1 },
    ],
  },
];

export default function PieCardGroup(props: {}) {
  return (
    <>
      {MOCK_DATA.map((item) => (
        <Grid key={item.title} xs={12} >
          <PieCardTemplate
            title={item.title}
            data={item.data}
            x={item.x}
            y={item.y}
            sql={item.sql}
          />
        </Grid>
      ))}
    </>
  );
}

function PieCardTemplate(props: {
  title: string;
  sql: string;
  data: any[];
  x: string;
  y: string;
}) {
  const { title, sql, data, x, y } = props;

  return (
    <ChartCardTemplate title={title} sql={sql}>
      <DynamicPieChart data={data} dataKey={y} xDataKey={x}  />
    </ChartCardTemplate>
  );
}
