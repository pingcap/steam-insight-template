export interface CommonChartProps {
  syncId?: string;
  width?: number;
  height?: number;
  margin?: {
    top?: number;
    right?: number;
    left?: number;
    bottom?: number;
  };
  disableCartesianGrid?: boolean;
  cartesianGridProps?: {
    stroke?: string;
  };
  xAxisProps?: {
    tick?: any;
    height?: number;
  };
  yAxisProps?: {};
  tooltipProps?: {};
  legendProps?: {};
}

export function CustomizedAxisTick(props: any) {
  const { x, y, stroke, payload } = props;

  return (
    <g transform={`translate(${x},${y})`}>
      <text
        x={0}
        y={0}
        dy={16}
        textAnchor="end"
        fill="#666"
        transform="rotate(-35)"
      >
        {payload.value}
      </text>
    </g>
  );
}
