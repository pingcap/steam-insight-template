import * as React from "react";
import {
  Avatar,
  Badge,
  Box,
  IconButton,
  Stack,
  SvgIcon,
  Tooltip,
  Typography,
  useMediaQuery,
  Container,
} from "@mui/material";
import { alpha } from "@mui/material/styles";

import { SIDE_NAV_WIDTH, TOP_NAV_HEIGHT } from "@/utils/constants";

export default function Header() {
  return (
    <>
      <Box
        component="header"
        sx={{
          backdropFilter: "blur(6px)",
          backgroundColor: (theme) =>
            alpha(theme.palette.background.default, 0.8),
          // position: "sticky",
          position: "fixed",
          // left: {
          //   lg: `${SIDE_NAV_WIDTH}px`,
          // },
          top: 0,
          // width: {
          //   lg: `calc(100% - ${SIDE_NAV_WIDTH}px)`,
          // },
          width: "100%",
          zIndex: (theme) => theme.zIndex.appBar,
        }}
      >
        <Container>
          <Stack
            alignItems="center"
            direction="row"
            justifyContent="space-between"
            spacing={2}
            sx={{
              minHeight: TOP_NAV_HEIGHT,
              // px: 2,
            }}
          >
            <Typography variant="h6">Steam Insight</Typography>
          </Stack>
        </Container>
      </Box>
    </>
  );
}
