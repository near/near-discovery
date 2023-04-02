import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useContext } from "react";
import { Button } from "../../components/common/buttons/Button";
import CustomButton from "../components/custom/CustomButton";
import { ThemeContext } from "../context/ThemeContext";

export default function EmptyEditorDialog({
  showEditor,
  setShowAddModal,
  setShowOpenModal,
  createNewFile,
  Filetype,

  // onHide,
  // name,
  // onRename,
  // show,
}) {
  const { theme } = useContext(ThemeContext);

  return (
    <Dialog
      open={!showEditor}
      // onClose={() => onHide()}
      // aria-labelledby="alert-dialog-title"
      // aria-describedby="alert-dialog-description"
      // fullWidth={true}
      maxWidth="xs"
      PaperProps={{ style: { backgroundColor: theme.ui, borderRadius: 4 } }}
    >
      {/* <DialogTitle sx={{ padding: "16px 16px 24px 16px" }}>
        <Typography
          variant="h6"
          sx={{ fontWeight: 500, color: theme.textColor2 }}
        >
          Welcome to the Component Sandbox!
        </Typography>
      </DialogTitle> */}

      <DialogContent
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 1,
            justifyContent: "center",
            alignItems: "center",
            mb: 3,
          }}
        >
          <Typography
            variant="h4"
            textAlign="center"
            sx={{ color: theme.textColor2 }}
          >
            Welcome to the NearPad!
          </Typography>

          <Typography
            variant="p"
            textAlign="center"
            sx={{ color: theme.textColor2 }}
          >
            Build, Test and Deploy decentralized frontend components for{" "}
            <b>NEAR.social, BOS.gg, alpha.near.org</b> and other gateways.
          </Typography>
        </Box>

        <CustomButton
          style={{ width: "100%" }}
          onClick={() => {
            setShowAddModal(false);
            createNewFile(Filetype.Widget);
          }}
        >
          Create Component
        </CustomButton>

        <Typography sx={{ textAlign: "center", color: theme.textColor }}>
          or
        </Typography>

        <CustomButton
          style={{
            width: "100%",
            border: `1px ${theme.buttonColor} solid`,
            color: theme.buttonColor,
            backgroundColor: "transparent",
          }}
          onClick={() => {
            setShowAddModal(false);
            setShowOpenModal(true);
          }}
        >
          Open Component
        </CustomButton>
      </DialogContent>
    </Dialog>
  );
}
