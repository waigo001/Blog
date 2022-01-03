import { GitHub, Info, Instagram, Today, Twitter } from "@mui/icons-material";
import { Stack, Typography } from "@mui/material";
import React from "react";
import { PageLink, SocialLink, Title } from "src/components/uiParts";

type Props = {
  children?: React.ReactNode;
};

const HomeLayout: React.VFC<Props> = ({ children }) => {
  return (
    <Stack
      alignItems="center"
      justifyContent="center"
      spacing={4}
      sx={{ minHeight: "100vh" }}
    >
      <header>
        <Typography
          variant="h2"
          component="h1"
          align="center"
          sx={{
            m: 3,
            pt: 2,
          }}
        >
          <Title />
        </Typography>
      </header>
      <nav>
        <Stack direction="row" spacing={2} justifyContent="center">
          <PageLink icon={<Today />} to="/blog">
            Blog
          </PageLink>

          <PageLink icon={<Info />} to="/about">
            About
          </PageLink>
        </Stack>
      </nav>
      <main>{children}</main>
      <footer>
        <Stack spacing={4}>
          <Stack direction="row" spacing={2} justifyContent="center">
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
          <Typography
            align="center"
            sx={{
              fontSize: "0.8rem",
              fontWeight: 700,
              letterSpacing: "1px",
            }}
          >
            Copyright &copy; 2021 <Title />
          </Typography>
          <Typography
            align="center"
            sx={{
              fontSize: "0.8rem",
              fontWeight: 700,
              letterSpacing: "1px",
              pb: 4,
            }}
          >
            All rights reserved.
          </Typography>
        </Stack>
      </footer>
    </Stack>
  );
};

export default HomeLayout;
