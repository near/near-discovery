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
import Modal from "react-bootstrap/Modal";
import CustomButton from "../components/custom/CustomButton";
import { ThemeContext } from "../context/ThemeContext";

export default function OpenWidgetDialog(props) {
  const { theme } = useContext(ThemeContext);

  const onHide = props.onHide;
  const onOpen = props.onOpen;
  const onNew = props.onNew;
  const show = props.show;

  const [widgetSrc, setWidgetSrc] = useState("");

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
          Open a Component
        </Typography>
      </DialogTitle>

      <DialogContent sx={{ padding: "16px" }}>
        <label htmlFor="widget-src-input" className="form-label text-secondary">
          Widget name <span className="text-muted">(or path)</span>
        </label>

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
          placeholder={`Search for a component...`}
          value={widgetSrc}
          onChange={(e) =>
            setWidgetSrc(e.target.value.replaceAll(/[^a-zA-Z0-9_.\-\/]/g, ""))
          }
        />
      </DialogContent>

      <DialogActions sx={{ padding: "0 16px 16px 0" }}>
        <Button
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
          disabled={!widgetSrc}
          sx={{
            textTransform: "none",
            fontWeight: 500,

            color: "#FFF",
            backgroundColor: theme.buttonColor + (!widgetSrc ? 66 : ""),

            padding: "5px 30px",
            borderRadius: 0.5,
          }}
          onClick={() => {
            onOpen(widgetSrc);
            setWidgetSrc("");
            onHide();
          }}
        >
          Open
        </CustomButton>
      </DialogActions>
    </Dialog>
  );
}
