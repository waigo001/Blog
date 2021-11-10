import { Chip, Box } from "@mui/material";
import React from "react";

type Props = {
  tags?: string[];
};

const Tags: React.VFC<Props> = ({ tags }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        listStyle: "none",
        m: 0.5,
        p: 0,
      }}
      component="ul"
    >
      {tags &&
        tags.map((tag) => (
          <Box component="li" key={tag} m={0.25}>
            <Chip
              label={tag}
              size="small"
              sx={{ px: 0.25, fontWeight: 500, color: "text.secondary" }}
              variant="outlined"
              clickable
            />
          </Box>
        ))}
    </Box>
  );
};

export default Tags;
