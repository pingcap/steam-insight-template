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

import Header, { HeaderProps } from "@/components/Layout/Header";
import SEO from "@/components/Layout/SEO";
import LeftNav from "@/components/Layout/LeftNav";
import { TOP_NAV_HEIGHT, SIDE_NAV_WIDTH } from "@/utils/constants";

export interface LayoutProps {
  children: React.ReactNode;
  headerProps?: HeaderProps;
}

export default function Layout(props: LayoutProps) {
  const { headerProps } = props;

  return (
    <>
      <Header {...headerProps} />
      <SEO />
      <LeftNav />
      <Box
        sx={{
          backgroundColor: (theme) => theme.palette.background.default,
          paddingTop: `${TOP_NAV_HEIGHT}px`,
          paddingBottom: `${TOP_NAV_HEIGHT}px`,
          ml: {
            lg: `${SIDE_NAV_WIDTH}px`,
          },
          width: {
            lg: `calc(100% - ${SIDE_NAV_WIDTH}px)`,
          },
        }}
      >
        <Container
          sx={
            {
              // minHeight: `calc(100vh - ${TOP_NAV_HEIGHT}px)`,
            }
          }
        >
          {props.children}
        </Container>
      </Box>
    </>
  );
}
