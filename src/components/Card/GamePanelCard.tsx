import * as React from "react";
import { Box, Card, CardContent, Typography } from "@mui/material";

export default function GamePanelCardTemplate(props: {
  title: string;
  children: React.ReactNode;
  height?: number;
}) {
  const { title, children, height } = props;

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
        </Box>
        <Box
          sx={{
            height: height || 300,
            mt: 2,
          }}
        >
          {children}
        </Box>
      </CardContent>
    </Card>
  );
}
