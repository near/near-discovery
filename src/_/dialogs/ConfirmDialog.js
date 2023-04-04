import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import React, { useContext } from "react";
import CustomButton from "../components/custom/CustomButton";
import { ThemeContext } from "../context/ThemeContext";

export default function ConfirmDialog({
  open,
  setOpen,
  onClick,
  label,
  description,
}) {
  const { theme } = useContext(ThemeContext);

  return (
    <Dialog
      open={open}
      onClose={() => setOpen((e) => !e)}
      fullWidth={true}
      maxWidth="xs"
      PaperProps={{ style: { backgroundColor: theme.ui, borderRadius: 4 } }}
    >
      <DialogTitle sx={{ padding: "16px 16px 16px 16px" }}>
        <Typography
          variant="h6"
          sx={{ fontWeight: 500, color: theme.textColor2 }}
        >
          {label}
        </Typography>
      </DialogTitle>

      <DialogContent sx={{ padding: "16px" }}>
        <Typography
          variant="p1"
          sx={{ fontWeight: 400, color: theme.textColor3 }}
        >
          {description}
        </Typography>
      </DialogContent>

      <DialogActions sx={{ padding: "0 16px 16px 0", gap: 1 }}>
        <Button
          //   color="error"
          sx={{
            textTransform: "none",
            color: theme.textColor3,
            backgroundColor: theme.textColor3 + 11,
            padding: "5px 20px",
            borderRadius: 0.5,
          }}
          onClick={() => setOpen(false)}
        >
          Cancel
        </Button>
        <CustomButton
          sx={{
            textTransform: "none",
            fontWeight: 500,

            color: "#FFF",
            backgroundColor: theme.buttonColor,
            padding: "5px 30px",
            borderRadius: 0.5,
          }}
          onClick={() => {
            onClick();
            setOpen(false);
          }}
        >
          Delete
        </CustomButton>
      </DialogActions>
    </Dialog>
  );
}
