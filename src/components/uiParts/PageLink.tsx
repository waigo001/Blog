import { Button } from "@mui/material";
import type { SxProps, Theme } from "@mui/system";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

type Props = {
  children?: React.ReactNode;
  icon: React.ReactNode;
  to: string;
  sx?: SxProps<Theme>;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
};

const PageLink: React.VFC<Props> = ({ children, icon, to, sx, onClick }) => {
  const router = useRouter();

  return (
    <Link href={to} passHref>
      <Button
        sx={{
          color: router.pathname.startsWith(to) ? "primary" : "text.primary",
          px: 2,
          ...sx,
        }}
        variant="text"
        size="large"
        startIcon={icon}
        onClick={onClick}
      >
        {children}
      </Button>
    </Link>
  );
};

export default PageLink;
