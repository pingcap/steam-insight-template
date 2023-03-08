import * as React from "react";
import { Box } from "@mui/material";

import "github-markdown-css";

export interface MarkdownContainerProps {
  children: React.ReactNode;
}

export default function MarkdownContainer(props: MarkdownContainerProps) {
  const { children } = props;

  return (
    <Box component="div" className="markdown-body" id="markdown-body">
      {children}
    </Box>
  );
}
