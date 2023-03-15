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

import { stringToColor, str2num } from "@/utils";
import { ChartLine } from "@/components/Chart/LineChart";
import ChartCardTemplate from "@/components/Card/ChartCard";
import { apRouteCfg } from "@/services/dataService/config";

const DynamicLineChart = dynamic(() => import("@/components/Chart/LineChart"), {
  loading: () => <>Loading...</>,
  ssr: false,
});

const DynamicBarChart = dynamic(() => import("@/components/Chart/BarChart"), {
  loading: () => <>Loading...</>,
  ssr: false,
});

const DynamicPieChart = dynamic(() => import("@/components/Chart/PieChart"), {
  loading: () => <>Loading...</>,
  ssr: false,
});

export default function CardGroup(props: {
  data: { id: string; data: any }[];
}) {
  const { data } = props;

  const dataMemo = React.useMemo(() => {
    return data.map((item) => {
      const target = apRouteCfg.find((cfg) => cfg.id === item.id);
      return {
        id: item.id,
        title: target?.title || item.id,
        data: item.data.data[0],
        sql: target?.sql,
        chartType: target?.chartType,
        chartCfg: target?.chartCfg,
        fullWidth: target?.fullWidth,
      };
    });
  }, [data]);

  return (
    <>
      {dataMemo.map((item) => (
        <Grid key={item.id} xs={12} md={item?.fullWidth ? 12 : 6}>
          <CardTemplate {...item} />
        </Grid>
      ))}
    </>
  );
}

type DataServiceResultItemType = {
  columns: {
    col: string;
    data_type: string;
    nullable: boolean;
  }[];
  rows: string[][];
  limit: number;
  latency: string;
};

const CardTemplate = (props: {
  chartType?: string;
  title: string;
  data: DataServiceResultItemType;
  sql?: string;
  chartCfg?: {
    x: string;
    y: string;
    line?: string;
  };
}) => {
  const { chartType } = props;

  switch (chartType) {
    case "line":
      return <LineCardTemplate {...props} />;
    case "bar":
      return <BarCardTemplate {...props} />;
    case "pie":
      return <PieCardTemplate {...props} />;
    default:
      return <></>;
  }
};

function getValByKeyFrom2List(
  nameList: string[],
  valList: string[],
  key: string
) {
  const index = nameList.findIndex((item) => item === key);
  return valList[index];
}

const LineCardTemplate = (props: {
  title: string;
  data: DataServiceResultItemType;
  sql?: string;
  chartCfg?: {
    x: string;
    y: string;
    line?: string;
  };
}) => {
  const { title, data, sql, chartCfg } = props;

  const XAXIS_KEY_NAME = "release_year";
  const YAXIS_KEY_NAME = "num";

  const xAxisKey = chartCfg?.x || XAXIS_KEY_NAME;
  const yAxisKey = chartCfg?.y || YAXIS_KEY_NAME;
  const lineKey = chartCfg?.line || "";

  const columnsMemo = React.useMemo(() => {
    return data.columns.map((item) => item.col);
  }, [data]);

  const [dataDemo, linesMemo] = React.useMemo(() => {
    const lines: ChartLine[] = [];
    const newLineObj: { [x: string]: ChartLine } = {};
    const newDataObj: {
      [x: string]: { [x: string]: string | number };
    } = {};
    if (!chartCfg?.line) {
      lines.push({
        dataKey: yAxisKey,
        stroke: stringToColor(yAxisKey),
      });
      return [
        data.rows.map((row) => ({
          [xAxisKey]: getValByKeyFrom2List(columnsMemo, row, xAxisKey),
          [yAxisKey]: str2num(getValByKeyFrom2List(columnsMemo, row, yAxisKey)),
        })),
        lines,
      ];
    }
    data.rows.forEach((row) => {
      const lineKeyName =
        getValByKeyFrom2List(columnsMemo, row, lineKey) || "num";
      if (!newLineObj[lineKeyName]) {
        newLineObj[lineKeyName] = {
          dataKey: lineKeyName,
          stroke: stringToColor(lineKeyName),
        };
      }
      if (!newDataObj[getValByKeyFrom2List(columnsMemo, row, xAxisKey)]) {
        newDataObj[getValByKeyFrom2List(columnsMemo, row, xAxisKey)] = {};
      }
      newDataObj[getValByKeyFrom2List(columnsMemo, row, xAxisKey)][
        lineKeyName
      ] = str2num(getValByKeyFrom2List(columnsMemo, row, yAxisKey));
    });
    Object.values(newLineObj).forEach((line) => {
      lines.push(line);
    });
    return [
      Object.keys(newDataObj).map((key) => ({
        [xAxisKey]: key,
        ...newDataObj[key],
      })),
      lines,
    ];
  }, [data, chartCfg]);

  return (
    <>
      <ChartCardTemplate title={title} sql={sql}>
        <DynamicLineChart
          xDataKey={chartCfg?.x || XAXIS_KEY_NAME}
          data={dataDemo}
          lines={linesMemo}
        />
      </ChartCardTemplate>
    </>
  );
};

const BarCardTemplate = (props: {
  title: string;
  data: DataServiceResultItemType;
  sql?: string;
  chartCfg?: {
    x: string;
    y: string;
    line?: string;
  };
}) => {
  const { title, data, sql, chartCfg } = props;

  const dataMemo = React.useMemo(() => {
    return data.rows.map((row) => ({
      [chartCfg?.x || ""]: getValByKeyFrom2List(
        data.columns.map((item) => item.col),
        row,
        chartCfg?.x || ""
      ),
      [chartCfg?.y || ""]: str2num(
        getValByKeyFrom2List(
          data.columns.map((item) => item.col),
          row,
          chartCfg?.y || ""
        )
      ),
    }));
  }, [data, chartCfg]);

  return (
    <>
      <ChartCardTemplate title={title} sql={sql}>
        <DynamicBarChart
          xDataKey={chartCfg?.x || ""}
          barDataKey={chartCfg?.y || ""}
          data={dataMemo}
        />
      </ChartCardTemplate>
    </>
  );
};

const PieCardTemplate = (props: {
  title: string;
  data: DataServiceResultItemType;
  sql?: string;
  chartCfg?: {
    x: string;
    y: string;
  };
}) => {
  const { title, data, sql, chartCfg } = props;

  const dataMemo = React.useMemo(() => {
    return data.rows.map((row) => ({
      [data.columns.map((item) => item.col)[0]]: getValByKeyFrom2List(
        data.columns.map((item) => item.col),
        row,
        data.columns.map((item) => item.col)[0]
      ),
      [data.columns.map((item) => item.col)[1]]: str2num(
        getValByKeyFrom2List(
          data.columns.map((item) => item.col),
          row,
          data.columns.map((item) => item.col)[1]
        )
      ),
    }));
  }, [data]);

  return (
    <>
      <ChartCardTemplate title={title} sql={sql} height={500}>
        <DynamicPieChart
          data={dataMemo}
          dataKey={chartCfg?.y || ""}
          xDataKey={chartCfg?.x || ""}
        />
      </ChartCardTemplate>
    </>
  );
};
