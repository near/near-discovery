import { Box } from "@mui/material";
import React, { useContext } from "react";
import { ThemeContext } from "../../../../context/ThemeContext";
// import { EditorContext } from "../../../../context/EditorContext";
import WidgetViewHeader from "./WidgetViewHeader";

import { Widget } from "near-social-vm";
import CustomButton from "../../../../components/custom/CustomButton";

export default function WidgetViewContainer({
  parsedWidgetProps,
  renderCode,
  handlePreviewButton,
}) {
  const { theme } = useContext(ThemeContext);
  // const { outputCode } = useContext(EditorContext);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        backgroundColor: theme.ui,
        flex: 1,
        height: "100%",
        // color: "#FFF",
      }}
    >
      <WidgetViewHeader onRunButtonClick={handlePreviewButton} />
      {renderCode ? (
        <Box
          sx={{
            flex: 1,
            height: "100%",

            bgcolor: "#FFF",
          }}
        >
          <Widget code={renderCode} props={parsedWidgetProps} />
        </Box>
      ) : (
        <div
          style={{
            padding: 0,
            margin: 0,
            display: "flex",
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
          }}
          onClick={handlePreviewButton}
        ></div>
      )}
    </Box>
  );
}
