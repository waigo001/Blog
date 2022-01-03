import { format, isAfter, parseISO } from "date-fns";
import React from "react";

type Props = {
  createdAt: string;
  updatedAt?: string;
  enableItemProp?: boolean;
};

const PostTime: React.VFC<Props> = ({
  createdAt = "19700101T000000Z",
  updatedAt = "19700101T000000Z",
  enableItemProp = false,
}) => {
  const createdTime = parseISO(createdAt);
  const updatedTime = parseISO(updatedAt);
  const isUpdated = isAfter(updatedTime, createdTime);

  return (
    <div>
      <time
        dateTime={updatedAt}
        itemProp={enableItemProp ? "datemodified" : undefined}
      >
        {format(updatedTime, "yyyy/MM/dd")}
      </time>

      <time
        dateTime={createdAt}
        itemProp={enableItemProp ? "datepublished" : undefined}
      >
        {format(createdTime, "yyyy/MM/dd")}
      </time>
    </div>
  );
};

export default PostTime;
