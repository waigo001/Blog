import {
  Close,
  Twitter,
  Facebook,
  Link as LinkIcon,
} from "@mui/icons-material";
import {
  Dialog,
  DialogTitle,
  Box,
  IconButton,
  DialogContent,
  Stack,
  Typography,
  Tooltip,
} from "@mui/material";
import React from "react";

type Props = {
  title: string;
  slug: string;
  isOpen: boolean;
  onClose: () => void;
};

const ShareDialog: React.VFC<Props> = ({ title, isOpen, onClose }) => {
  return (
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
  );
};

export default ShareDialog;
