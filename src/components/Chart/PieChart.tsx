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

export interface PieChartProps {
  data: { [key: string]: string | number | undefined }[];
  xDataKey: string;
  dataKey: string;
}

export default function PieChartComponent(props: PieChartProps) {
  const { data, xDataKey, dataKey } = props;

  const [activeIndex, setActiveIndex] = React.useState(0);

  const onPieEnter = (data: any, index: number) => {
    setActiveIndex(index);
  };

  const renderActiveShape = (props: any) => {
    const RADIAN = Math.PI / 180;
    const {
      cx,
      cy,
      midAngle,
      innerRadius,
      outerRadius,
      startAngle,
      endAngle,
      fill,
      payload,
      percent,
      value,
    } = props;
    const sin = Math.sin(-RADIAN * midAngle);
    const cos = Math.cos(-RADIAN * midAngle);
    const sx = cx + (outerRadius + 10) * cos;
    const sy = cy + (outerRadius + 10) * sin;
    const mx = cx + (outerRadius + 30) * cos;
    const my = cy + (outerRadius + 30) * sin;
    const ex = mx + (cos >= 0 ? 1 : -1) * 22;
    const ey = my;
    const textAnchor = cos >= 0 ? "start" : "end";

    return (
      <g>
        <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
          {payload[xDataKey]}
        </text>
        <Sector
          cx={cx}
          cy={cy}
          innerRadius={innerRadius}
          outerRadius={outerRadius}
          startAngle={startAngle}
          endAngle={endAngle}
          fill={fill}
        />
        <Sector
          cx={cx}
          cy={cy}
          startAngle={startAngle}
          endAngle={endAngle}
          innerRadius={outerRadius + 6}
          outerRadius={outerRadius + 10}
          fill={fill}
        />
        <path
          d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
          stroke={fill}
          fill="none"
        />
        <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
        <text
          x={ex + (cos >= 0 ? 1 : -1) * 12}
          y={ey}
          textAnchor={textAnchor}
          fill="#333"
        >{`${dataKey} ${value}`}</text>
        <text
          x={ex + (cos >= 0 ? 1 : -1) * 12}
          y={ey}
          dy={18}
          textAnchor={textAnchor}
          fill="#999"
        >
          {`(Rate ${(percent * 100).toFixed(2)}%)`}
        </text>
      </g>
    );
  };

  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart width={400} height={400}>
        <Pie
          data={data}
          dataKey={dataKey}
          nameKey={xDataKey}
          cx="50%"
          cy="50%"
          innerRadius={100}
          outerRadius={120}
          // fill="#82ca9d"
          // label
          activeIndex={activeIndex}
          onMouseEnter={onPieEnter}
          activeShape={renderActiveShape}
        >
          {data.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={stringToColor(entry[xDataKey] as string)}
            />
          ))}
        </Pie>
        <Legend
          formatter={renderPercentageLegendText}
          // wrapperStyle={{
          //   left: 0,
          //   top: 0,
          //   bottom: `auto`,
          //   width: 200,
          // }}
        />
        {/* <Tooltip /> */}
      </PieChart>
    </ResponsiveContainer>
  );
}

const renderPercentageLegendText = (value: string, entry: any) => {
  const { color, payload } = entry;

  return (
    <span style={{ color }}>{`${value}(${(payload.percent * 100).toFixed(
      2
    )}%)`}</span>
  );
};
