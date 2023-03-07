import * as React from "react";
import {
  Avatar,
  Badge,
  Box,
  IconButton,
  Stack,
  SvgIcon,
  Tooltip,
  useMediaQuery,
  Container,
} from "@mui/material";
import { alpha } from "@mui/material/styles";

import Header from "@/components/Layout/Header";
import SEO from "@/components/Layout/SEO";
import { TOP_NAV_HEIGHT } from "@/utils/constants";

export interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout(props: LayoutProps) {
  return (
    <>
      <Header />
      <SEO />
      <Box
        sx={{
          backgroundColor: (theme) => theme.palette.background.default,
          paddingTop: `${TOP_NAV_HEIGHT}px`,
          paddingBottom: `${TOP_NAV_HEIGHT}px`,
        }}
      >
        <Container
          sx={{
            // minHeight: `calc(100vh - ${TOP_NAV_HEIGHT}px)`,
          }}
        >
          {props.children}
        </Container>
      </Box>
    </>
  );
}
