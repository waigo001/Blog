import {
  Today,
  Info,
  Menu,
  GitHub,
  Instagram,
  Twitter,
} from "@mui/icons-material";
import { AppBar, Toolbar, IconButton, Stack, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import PageLink from "src/components/PageLink";
import SocialLink from "src/components/SocialLink";
import Title from "src/components/Title";
import BlogDrawer from "./drawer";

type Props = {
  children?: React.ReactNode;
};

const BlogLayout: React.VFC<Props> = ({ children }) => {
  const [isOpen, setDrawerState] = useState<boolean>(false);

  const openDrawer = () => {
    setDrawerState(true);
  };

  const closeDrawer = () => {
    setDrawerState(false);
  };
  return (
    <div>
      <AppBar color="inherit" position="fixed">
        <Toolbar>
          <IconButton
            aria-label="menu"
            sx={{ mr: 1, display: { xs: "inline-flex", sm: "none" } }}
            edge="start"
            onClick={openDrawer}
          >
            <Menu />
          </IconButton>
          <Title sx={{ fontSize: "1.75rem", mt: 0.75 }} />
          <Box sx={{ flexGrow: 1 }} />
          <Stack
            direction="row"
            spacing={2}
            justifyContent="center"
            sx={{ display: { sm: "flex", xs: "none" } }}
            component="nav"
          >
            <PageLink icon={<Today />} to="/blog">
              Blog
            </PageLink>

            <PageLink icon={<Info />} to="/about">
              About
            </PageLink>
          </Stack>
        </Toolbar>
      </AppBar>
      <BlogDrawer open={isOpen} onOpen={openDrawer} onClose={closeDrawer} />
      <main>{children}</main>
      <AppBar
        component="footer"
        position="fixed"
        color="inherit"
        sx={{ top: "auto", bottom: 0 }}
      >
        <Toolbar variant="dense">
          <Typography
            sx={{
              fontSize: "0.75rem",
              fontWeight: 700,
              letterSpacing: "1px",
              flexGrow: 1,
            }}
          >
            <Box
              component="span"
              sx={{ display: { xs: "none", sm: "inline" } }}
            >
              Copyright{" "}
            </Box>
            &copy; 2021 <Title />
            <Box
              component="span"
              sx={{ display: { xs: "none", sm: "inline" } }}
            >
              {" "}
              All rights reserved.
            </Box>
          </Typography>
          <Stack direction="row" spacing={1} alignItems="center">
            <SocialLink
              aria-label="Github Link"
              href={"https://github.com/" + process.env.ID_GITHUB}
              icon={<GitHub />}
            />
            <SocialLink
              aria-label="Twitter Link"
              href={"https://twitter.com/" + process.env.ID_TWITTER}
              icon={<Twitter />}
            />
            <SocialLink
              aria-label="Instagram Link"
              href={"https://www.instagram.com/" + process.env.ID_INSTAGRAM}
              icon={<Instagram />}
            />
          </Stack>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default BlogLayout;
