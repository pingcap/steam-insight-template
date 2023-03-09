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

import { stringToColor, nFormatter } from "@/utils";
import {
  CustomizedAxisTick,
  CommonChartProps,
} from "@/components/Chart/Common";

export interface BarChartProps extends CommonChartProps {
  data: { [key: string]: string | number | undefined }[];
  xDataKey: string;
  barDataKey: string;
}

export default function BarChartComponent(props: BarChartProps) {
  const {
    data,
    xDataKey,
    barDataKey,
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
      <BarChart
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
      >
        {!disableCartesianGrid && (
          <CartesianGrid strokeDasharray="3 3" {...cartesianGridProps} />
        )}
        <XAxis
          dataKey={xDataKey}
          tick={<CustomizedAxisTick />}
          height={120}
          interval={0}
          {...xAxisProps}
        />
        <YAxis
          // scale="log"
          // label={{
          //   value: "Collision Probability / -",
          //   position: "insideLeft",
          //   angle: -90,
          //   dx: -3,
          //   fill: "#808080",
          //   dy: 70,
          //   fontSize: "105%",
          // }}
          // domain={['0', 'auto']}
          // type="number"
          tickFormatter={(value) => `${nFormatter(value, 1)}`}
          dataKey={barDataKey}
          {...yAxisProps}
        />
        <Tooltip {...tooltipProps} />
        <Bar dataKey={barDataKey} fill={stringToColor(barDataKey)} />
      </BarChart>
    </ResponsiveContainer>
  );
}
