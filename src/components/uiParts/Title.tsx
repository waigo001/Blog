import React from "react";
import Link from "next/link";

type Props = {};

const Title: React.VFC<Props> = ({}) => {
  return (
    <Link href="/" passHref>
      K.W. info
    </Link>
  );
};

export default Title;
