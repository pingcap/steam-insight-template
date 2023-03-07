import * as React from "react";
import NextLink from "next/link";
import { useRouter as useNextRouter } from "next/router";
import {
  Box,
  Button,
  Divider,
  Drawer,
  Stack,
  SvgIcon,
  SvgIconProps,
  Typography,
  useMediaQuery,
  IconButton,
} from "@mui/material";
import Bars3Icon from "@heroicons/react/24/solid/Bars3Icon";

import {
  LEFT_NAV_ITEMS,
  LeftNavItemProps,
} from "@/components/Layout/LeftNavConfig";
import { TOP_NAV_HEIGHT } from "@/utils/constants";

export interface LeftNavProps {
  open?: boolean;
  onClose?: () => void;
}

export default function LeftNav(props: LeftNavProps) {
  const { open, onClose } = props;

  const lgUp = useMediaQuery((theme: any) => theme.breakpoints.up("lg"));

  return (
    <>
      <Drawer
        anchor="left"
        onClose={onClose}
        open={open}
        PaperProps={{
          sx: {
            backgroundColor: "neutral.800",
            color: "common.white",
            width: 280,
          },
        }}
        sx={{ zIndex: (theme) => theme.zIndex.appBar + 100 }}
        variant={lgUp ? "permanent" : "temporary"}
      >
        <LeftNavContent />
      </Drawer>
    </>
  );
}

function LeftNavContent() {
  return (
    <Box>
      <Box
        sx={{
          height: `${TOP_NAV_HEIGHT}px`,
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
          px: 2,
        }}
      >
        <Typography variant="h6">Steam Insight</Typography>
      </Box>
      <LeftNavItems />
    </Box>
  );
}

export function LeftNavItem(props: LeftNavItemProps) {
  const { active, href, icon, disabled, title } = props;

  return (
    <Box component="li">
      <Button
        component={NextLink}
        href={href}
        sx={{
          alignItems: "center",
          borderRadius: 1,
          display: "flex",
          justifyContent: "flex-start",
          pl: "16px",
          pr: "16px",
          py: "6px",
          textAlign: "left",
          width: "100%",
          ...(active && {
            backgroundColor: "rgba(255, 255, 255, 0.04)",
          }),
          "&:hover": {
            backgroundColor: "rgba(255, 255, 255, 0.04)",
          },
        }}
        variant="text"
        disabled={disabled}
      >
        {icon && (
          <Box
            component="span"
            sx={{
              alignItems: "center",
              color: "neutral.400",
              display: "inline-flex",
              justifyContent: "center",
              mr: 2,
              ...(active && {
                color: "primary.main",
              }),
            }}
          >
            {icon}
          </Box>
        )}
        <Box
          component="span"
          sx={{
            color: "neutral.400",
            flexGrow: 1,
            fontFamily: (theme) => theme.typography.fontFamily,
            fontSize: 14,
            fontWeight: 600,
            lineHeight: "24px",
            whiteSpace: "nowrap",
            ...(active && {
              color: "common.white",
            }),
            ...(disabled && {
              color: "neutral.500",
            }),
          }}
        >
          {title}
        </Box>
      </Button>
    </Box>
  );
}

export function LeftNavItems() {
  const { pathname } = useNextRouter();

  return (
    <Stack
      component="ul"
      spacing={0.5}
      sx={{
        listStyle: "none",
        p: 0,
        m: 0,
      }}
    >
      {LEFT_NAV_ITEMS.map((item) => (
        <LeftNavItem
          key={item.title}
          title={item.title}
          href={item.href}
          icon={item.icon}
          active={pathname === item.href}
          disabled={item.disabled}
        />
      ))}
    </Stack>
  );
}

export function LeftNavBtn(props: { onClick: () => void }) {
  const { onClick } = props;

  return (
    <IconButton onClick={onClick}>
      <SvgIcon fontSize="small">
        <Bars3Icon />
      </SvgIcon>
    </IconButton>
  );
}
