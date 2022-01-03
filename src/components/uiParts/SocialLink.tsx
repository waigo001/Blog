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
  return <>{icon}</>;
};

export default SocialLink;
