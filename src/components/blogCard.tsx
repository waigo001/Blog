import { LocalOffer } from "@mui/icons-material";
import {
  Card,
  CardActions,
  CardContent,
  Stack,
  Typography,
} from "@mui/material";
import Link from "next/link";
import React from "react";
import PostTime from "./postTime";

type Props = {
  title?: string;
  slug?: string;
  createdAt?: string;
  updatedAt?: string;
};

const BlogCard: React.VFC<Props> = ({ title, slug, createdAt, updatedAt }) => {
  return (
    <Card sx={{ height: "100%" }}>
      <CardContent>
        <Stack spacing={1}>
          {createdAt && (
            <PostTime createdAt={createdAt} updatedAt={updatedAt} />
          )}
          <Link href={`/blog/${slug}`} passHref>
            <Typography
              sx={{
                textDecoration: "none",
                fontSize: "1.25rem",
                fontWeight: 600,
                color: "text.primary",
              }}
            >
              {title}
            </Typography>
          </Link>
          <Stack direction="row" alignItems="center" spacing={1}>
            <LocalOffer fontSize="small" />
            <Typography>タグ</Typography>
          </Stack>
        </Stack>
      </CardContent>
      <CardActions></CardActions>
    </Card>
  );
};

export default BlogCard;
