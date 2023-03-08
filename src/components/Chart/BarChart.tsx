import * as React from "react";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

import { stringToColor } from "@/utils";

export interface BarChartProps {
  data: { [key: string]: string | number | undefined }[];
  xDataKey: string;
  barDataKey: string;
}

export default function BarChartComponent(props: BarChartProps) {
  const { data, xDataKey, barDataKey } = props;

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        width={500}
        height={300}
        data={data}
        margin={{
          top: 5,
          right: 30,
          // left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey={xDataKey} />
        <YAxis />
        <Tooltip />
        <Bar dataKey={barDataKey} fill={stringToColor(barDataKey)} />
      </BarChart>
    </ResponsiveContainer>
  );
}
