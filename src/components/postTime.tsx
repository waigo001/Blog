import { Update, WatchLater } from "@mui/icons-material";
import { Box, Theme } from "@mui/material";
import { SxProps } from "@mui/system";
import { format, isAfter, parseISO } from "date-fns";
import React from "react";

type Props = {
  createdAt: string;
  updatedAt?: string;
  sx?: SxProps<Theme>;
  enableItemProp?: boolean;
};

const PostTime: React.VFC<Props> = ({
  createdAt = "19700101T000000Z",
  updatedAt = "19700101T000000Z",
  sx,
  enableItemProp = false,
}) => {
  const createdTime = parseISO(createdAt);
  const updatedTime = parseISO(updatedAt);
  const isUpdated = isAfter(updatedTime, createdTime);

  return (
    <Box sx={sx}>
      <Box
        alignItems="center"
        display={isUpdated ? "flex" : "none"}
        fontSize="small"
      >
        <Update sx={{ fontSize: "1rem", mr: 0.5 }} />
        <time
          dateTime={updatedAt}
          itemProp={enableItemProp ? "datemodified" : undefined}
        >
          {format(updatedTime, "yyyy/MM/dd")}
        </time>
      </Box>
      <Box
        alignItems="center"
        display={!isUpdated ? "flex" : "none"}
        fontSize="small"
      >
        <WatchLater sx={{ fontSize: "1rem", mr: 0.5 }} />
        <time
          dateTime={createdAt}
          itemProp={enableItemProp ? "datepublished" : undefined}
        >
          {format(createdTime, "yyyy/MM/dd")}
        </time>
      </Box>
    </Box>
  );
};

export default PostTime;
