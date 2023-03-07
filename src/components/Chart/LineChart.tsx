import * as React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export interface ChartLine {
  dataKey: string;
  stroke: string;
  type?:
    | "basis"
    | "basisClosed"
    | "basisOpen"
    | "linear"
    | "linearClosed"
    | "natural"
    | "monotoneX"
    | "monotoneY"
    | "monotone"
    | "step"
    | "stepBefore"
    | "stepAfter";
  activeDot?: {
    r: number;
  };
  strokeWidth?: number;
  dot?: boolean;
}

export interface LineChartProps {
  xDataKey?: string;
  data: {
    name?: string;
    [key: string]: string | number | undefined;
  }[];
  lines: ChartLine[];
  syncId?: string;
}

export default function LineChartComponent(props: LineChartProps) {
  const { data, lines, xDataKey, syncId } = props;

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        width={500}
        height={300}
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
        syncId={syncId}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey={xDataKey || "name"} />
        <YAxis />
        <Tooltip
          itemSorter={(i) => {
            return -(i?.value || 1);
          }}
        />
        {/* <Legend /> */}
        {/* <Line
        type="monotone"
        dataKey="pv"
        stroke="#8884d8"
        activeDot={{ r: 8 }}
      />
      <Line type="monotone" dataKey="uv" stroke="#82ca9d" /> */}
        {lines.map((line) => (
          <Line
            key={line.dataKey}
            type={line.type || "monotone"}
            dataKey={line.dataKey}
            stroke={line.stroke}
            activeDot={line.activeDot}
          />
        ))}
      </LineChart>
    </ResponsiveContainer>
  );
}
