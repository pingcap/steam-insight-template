import * as React from "react";
import { Box, Card, CardContent, Typography } from "@mui/material";

import SQLDialog from "@/components/Dialog/SQLDialog";

export default function ChartCardTemplate(props: {
  title: string;
  sql?: string;
  children: React.ReactNode;
}) {
  const { title, sql, children } = props;

  return (
    <Card
      sx={{
        minWidth: 475,
      }}
    >
      <CardContent>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="h6" component="div">
            {title}
          </Typography>
          {sql && <SQLDialog title={title} sql={sql} />}
        </Box>
        <Box
          sx={{
            height: 300,
            mt: 2,

            "& *": {
              fontFamily: `"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji"`,
              fontSize: "14px",
            },
          }}
        >
          {children}
        </Box>
      </CardContent>
    </Card>
  );
}
