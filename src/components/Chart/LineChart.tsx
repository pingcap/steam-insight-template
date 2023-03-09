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

import {
  CustomizedAxisTick,
  CommonChartProps,
} from "@/components/Chart/Common";

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

export interface LineChartProps extends CommonChartProps {
  xDataKey?: string;
  data: {
    name?: string;
    [key: string]: string | number | undefined;
  }[];
  lines: ChartLine[];
}

export default function LineChartComponent(props: LineChartProps) {
  const {
    data,
    lines,
    xDataKey,
    syncId,
    width,
    height,
    margin,
    disableCartesianGrid,
    cartesianGridProps,
    xAxisProps,
    yAxisProps,
    tooltipProps,
    legendProps,
  } = props;

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        width={width || 500}
        height={height || 300}
        data={data}
        margin={{
          top: 5,
          right: 30,
          // left: 20,
          bottom: 5,
          ...margin,
        }}
        syncId={syncId}
      >
        {!disableCartesianGrid && (
          <CartesianGrid strokeDasharray="3 3" {...cartesianGridProps} />
        )}
        <XAxis
          dataKey={xDataKey || "name"}
          tick={CustomizedAxisTick}
          height={50}
          // interval={0}
          {...xAxisProps}
        />
        <YAxis {...yAxisProps} />
        <Tooltip
          itemSorter={(i) => {
            return -(i?.value || 1);
          }}
          {...tooltipProps}
        />
        {!!legendProps && <Legend {...legendProps} />}
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
