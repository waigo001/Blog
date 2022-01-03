import React from "react";

type Props = {
  children?: React.ReactNode;
};

const CommonLayout: React.VFC<Props> = ({ children }) => {
  return (
    <div>
      <main>{children}</main>
    </div>
  );
};

export default CommonLayout;
