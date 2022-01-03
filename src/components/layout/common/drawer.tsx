import { Today, Info } from "@mui/icons-material";
import {
  SwipeableDrawer,
  Stack,
  Typography,
  SwipeableDrawerProps,
} from "@mui/material";
import React from "react";
import { PageLink, Title } from "src/components/uiParts";

interface Props extends SwipeableDrawerProps {}

const BlogDrawer: React.VFC<Props> = ({ onClose, ...props }) => {
  return (
    <SwipeableDrawer onClose={onClose} {...props}>
      <Stack
        component="nav"
        direction="column"
        alignItems="flex-start"
        minWidth={200}
        m={1}
        spacing={1}
      >
        <Title sx={{ mx: 1, my: 2 }} />
        <Typography variant="subtitle2" color="text.secondary" pl={1} pb={1}>
          Links
        </Typography>
        <PageLink
          icon={<Today />}
          to="/blog"
          sx={{ width: "100%", justifyContent: "flex-start" }}
          onClick={onClose}
        >
          Blog
        </PageLink>
        <PageLink
          icon={<Info />}
          to="/about"
          sx={{ width: "100%", justifyContent: "flex-start" }}
          onClick={onClose}
        >
          About
        </PageLink>
      </Stack>
    </SwipeableDrawer>
  );
};

export default BlogDrawer;
