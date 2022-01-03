import React from "react";

type Props = {
  tags?: string[];
};

const Tags: React.VFC<Props> = ({ tags }) => {
  return (
    <ul
    >
      {tags &&
        tags.map((tag) => (
          <li key={tag} >
            {tag}
          </li>
        ))}
    </ul>
  );
};

export default Tags;
