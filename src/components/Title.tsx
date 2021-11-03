import { Link as MuiLink } from "@mui/material";
import React from "react";
import type { SxProps } from "@mui/system/styleFunctionSx";
import type { Theme } from "@mui/system/createTheme";
import Link from "next/link";

type Props = {
  sx?: SxProps<Theme>;
};

const Title: React.VFC<Props> = ({ sx }) => {
  return (
    <Link href="/" passHref>
      <MuiLink
        sx={{
          fontFamily: "Josefin Sans",
          fontWeight: 700,
          textDecoration: "none",
          boxShadow: "none",
          textAlign: "center",
          color: "text.primary",
          letterSpacing: "normal",
          ...sx,
        }}
      >
        K.W. info
      </MuiLink>
    </Link>
  );
};

export default Title;
