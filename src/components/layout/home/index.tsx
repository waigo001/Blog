import React from "react";
import { Title } from "src/components/uiParts";

type Props = {
  children?: React.ReactNode;
};

const HomeLayout: React.VFC<Props> = ({ children }) => {
  return (
    <div>
      <header>
        <Title />
      </header>
      <nav></nav>
      <main>{children}</main>
      <footer>
        Copyright &copy; 2021 <Title />
        All rights reserved.
      </footer>
    </div>
  );
};

export default HomeLayout;
