import { IconButton } from "@mui/material";
import React from "react";

type Props = {
  "aria-label": string;
  href: string;
  icon: React.ReactNode;
};

const SocialLink: React.VFC<Props> = ({
  "aria-label": ariaLabel,
  href,
  icon,
}) => {
  return (
    <IconButton
      aria-label={ariaLabel}
      href={href}
      target="_blank"
      rel="noopener"
      size="large"
    >
      {icon}
    </IconButton>
  );
};

export default SocialLink;
