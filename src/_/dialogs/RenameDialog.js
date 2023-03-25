import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  InputBase,
  Typography,
} from "@mui/material";
import React, { useContext, useState } from "react";
import CustomButton from "../components/custom/CustomButton";
import { ThemeContext } from "../context/ThemeContext";

export default function RenameDialog({
  // open,
  // setOpen,
  // item,

  onHide,
  name,
  onRename,
  show,
}) {
  const { theme } = useContext(ThemeContext);
  const [newName, setNewName] = useState(name);

  return (
    <Dialog
      open={show}
      onClose={() => onHide()}
      fullWidth={true}
      maxWidth="xs"
      PaperProps={{ style: { backgroundColor: theme.ui, borderRadius: 4 } }}
    >
      <DialogTitle sx={{ padding: "16px 16px 24px 16px" }}>
        <Typography
          variant="h6"
          sx={{ fontWeight: 500, color: theme.textColor2 }}
        >
          Rename "{name}"
        </Typography>
      </DialogTitle>

      <DialogContent sx={{ padding: "16px" }}>
        <InputBase
          sx={{
            width: "100%",
            paddingBlock: 1,
            paddingInline: 2,
            flex: 1,
            borderRadius: 0.5,
            color: theme.textColor,
            backgroundColor: theme.ui2,
          }}
          placeholder={`Rename "${name}"`}
          inputProps={{ "aria-label": `Rename "${name}"` }}
          value={newName}
          onChange={(e) =>
            setNewName(e.target.value.replaceAll(/[^a-zA-Z0-9_.\-]/g, ""))
          }
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
            borderRadius: 0.5,
          }}
          onClick={() => onHide()}
        >
          Cancel
        </Button>
        <CustomButton
          disabled={!newName || newName === name}
          sx={{
            textTransform: "none",
            fontWeight: 500,

            color: "#FFF",
            backgroundColor:
              theme.buttonColor + (!newName || newName === name ? 66 : ""),

            padding: "5px 30px",
            borderRadius: 0.5,
          }}
          onClick={() => {
            onRename(newName);
            onHide();
          }}
        >
          Rename
        </CustomButton>
      </DialogActions>
    </Dialog>
  );
}
