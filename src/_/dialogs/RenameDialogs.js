import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  InputBase,
  Typography,
} from "@mui/material";
import React, { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

export default function RenameDialogs({ open, setOpen, item }) {
  const { theme } = useContext(ThemeContext);

  return (
    <Dialog
      open={open}
      onClose={(e) => setOpen(!e)}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      fullWidth={true}
      maxWidth="xs"
      PaperProps={{ style: { backgroundColor: theme.ui } }}
    >
      <DialogTitle sx={{ padding: "16px 16px 24px 16px" }}>
        <Typography
          variant="h6"
          sx={{ fontWeight: 500, color: theme.textColor2 }}
        >
          Rename "{item?.name}"
        </Typography>
      </DialogTitle>

      <DialogContent sx={{ padding: "16px" }}>
        <InputBase
          sx={{
            width: "100%",
            paddingBlock: 1,
            paddingInline: 2,
            flex: 1,
            borderRadius: 1,
            color: theme.textColor,
            backgroundColor: theme.ui2,
          }}
          placeholder={`Rename "${item?.name}"`}
          inputProps={{ "aria-label": "search google maps" }}
        />
      </DialogContent>

      <DialogActions sx={{ padding: "0 16px 16px 0" }}>
        <Button
          //   color="error"
          sx={{
            textTransform: "none",
            color: theme.textColor3,
            backgroundColor: theme.textColor3 + 11,
            padding: "5px 20px",
          }}
          onClick={(e) => setOpen(!e)}
        >
          Cancel
        </Button>
        <Button
          sx={{
            color: theme.textColor,
            backgroundColor: theme.buttonColor,
            padding: "5px 20px",
            textTransform: "none",
            fontWeight: 500,
          }}
          onClick={(e) => setOpen(!e)}
        >
          Rename
        </Button>
      </DialogActions>
    </Dialog>
  );
}
