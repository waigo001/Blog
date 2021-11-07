import {
  Close,
  Facebook,
  LocalOffer,
  Share,
  Twitter,
  Link as LinkIcon,
} from "@mui/icons-material";

import {
  Box,
  Card,
  CardActions,
  CardContent,
  Chip,
  IconButton,
  Stack,
  Tooltip,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  Divider,
} from "@mui/material";
import Link from "next/link";
import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkUnwrapImages from "remark-unwrap-images";
import { useDialog } from "../hooks/useDialog";
import PostRenderer from "./PostRenderer";
import PostTime from "./PostTime";

type Props = {
  title?: string;
  slug?: string;
  createdAt?: string;
  updatedAt?: string;
  tags?: Readonly<(string | undefined)[]>;
  content?: string;
};

const BlogCard: React.VFC<Props> = ({
  title,
  slug,
  createdAt,
  updatedAt,
  tags,
  content,
}) => {
  const { isOpen, onClose, onOpen } = useDialog(false);

  return (
    <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <CardContent sx={{ flexGrow: 1, pb: 0 }}>
        <Stack spacing={1.25}>
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
              component="a"
            >
              {title}
            </Typography>
          </Link>
          <Box display="flex" alignItems="center" fontSize="small">
            <LocalOffer sx={{ fontSize: "1rem", mr: 0.5 }} />
            タグ
          </Box>
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
                  />
                </Box>
              ))}
          </Box>
          {content && (
            <>
              <Divider />
              <ReactMarkdown
                components={{ ...PostRenderer }}
                remarkPlugins={[remarkUnwrapImages, remarkGfm]}
              >
                {content}
              </ReactMarkdown>
            </>
          )}
        </Stack>
      </CardContent>
      <CardActions>
        <Tooltip placement="top" title="Share with">
          <IconButton sx={{ ml: "auto" }} onClick={onOpen}>
            <Share />
          </IconButton>
        </Tooltip>
      </CardActions>
      <Dialog open={isOpen} onClose={onClose} fullWidth>
        <DialogTitle
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "flex-start",
            fontWeight: 700,
            px: 2,
          }}
        >
          <Box flexGrow={1}>{title}</Box>
          <IconButton aria-label="close" onClick={onClose}>
            <Close />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
          <Stack spacing={2} alignItems="center">
            <Typography>この記事の共有方法</Typography>
            <Stack direction="row" spacing={6} alignItems="center">
              <Tooltip placement="top" title="Copy Link">
                <IconButton size="large">
                  <LinkIcon />
                </IconButton>
              </Tooltip>
              <Tooltip placement="top" title="Share on Twitter">
                <IconButton size="large">
                  <Twitter />
                </IconButton>
              </Tooltip>
              <Tooltip placement="top" title="Share on Facebook">
                <IconButton size="large">
                  <Facebook />
                </IconButton>
              </Tooltip>
            </Stack>
          </Stack>
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default BlogCard;
