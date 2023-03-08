import * as React from "react";
import {
  PieChart,
  Pie,
  Sector,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";

import { stringToColor } from "@/utils";

const data = [
  { name: "A1", value: 100 },
  { name: "A2", value: 300 },
  { name: "B1", value: 100 },
  { name: "B2", value: 80 },
  { name: "B3", value: 40 },
  { name: "B4", value: 30 },
  { name: "B5", value: 50 },
  { name: "C1", value: 100 },
  { name: "C2", value: 200 },
  { name: "D1", value: 150 },
  { name: "D2", value: 50 },
];
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

export interface PieChartProps { 
  data: { [key: string]: string | number | undefined }[];
  xDataKey: string;
  dataKey: string;
}

export default function PieChartComponent(props: PieChartProps) {
  const { data, xDataKey, dataKey } = props;
  
  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart width={400} height={400}>
        <Pie
          data={data}
          dataKey={dataKey}
          nameKey={xDataKey}
          cx="50%"
          cy="50%"
          innerRadius={70}
          outerRadius={90}
          // fill="#82ca9d"
          // label
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={stringToColor(entry[xDataKey] as string)} />
          ))}
        </Pie>
        <Legend />
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  );
}
