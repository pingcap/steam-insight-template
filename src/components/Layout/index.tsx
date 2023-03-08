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
import LeftNav, { LeftNavBtn } from "@/components/Layout/LeftNav";
import MarkdownContainer from "@/components/Layout/MarkdownContainer";
import { TOP_NAV_HEIGHT, SIDE_NAV_WIDTH } from "@/utils/constants";

export interface LayoutProps {
  children: React.ReactNode;
  headerProps?: HeaderProps;
  markdown?: boolean;
}

export default function Layout(props: LayoutProps) {
  const { headerProps, markdown } = props;

  const [leftNavOpen, setLeftNavOpen] = React.useState(false);

  const lgUp = useMediaQuery((theme: any) => theme.breakpoints.up("lg"));

  const handleLeftNavClose = () => {
    setLeftNavOpen(false);
  };

  const handleLeftNavOpen = () => {
    setLeftNavOpen(true);
  };

  const LeftNavMenuBtnCallback = React.useCallback(() => {
    if (lgUp) {
      return null;
    } else {
      return <LeftNavBtn onClick={handleLeftNavOpen} />;
    }
  }, [lgUp]);

  return (
    <>
      <Header {...headerProps} leftNavAction={<LeftNavMenuBtnCallback />} />
      <SEO />
      <LeftNav open={leftNavOpen} onClose={handleLeftNavClose} />
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
              minHeight: `calc(100vh - ${TOP_NAV_HEIGHT * 2}px)`,
            }
          }
        >
          {markdown ? (
            <MarkdownContainer>{props.children}</MarkdownContainer>
          ) : (
            <>{props.children}</>
          )}
        </Container>
      </Box>
    </>
  );
}
