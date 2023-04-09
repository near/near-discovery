import { Box } from "@mui/material";
import React, { useContext, useState } from "react";
import { ThemeContext } from "../../../../context/ThemeContext";
import WidgetViewHeader from "./WidgetViewHeader";

import { Widget } from "near-social-vm";
// import { EditorContext } from "../../../../context/EditorContext";
// import CustomButton from "../../../../components/custom/CustomButton";

export default function WidgetViewContainer({
  loading,

  parsedWidgetProps,
  renderCode,
  handlePreviewButton,
  handleSaveDraftButton,
  handleForkButton,

  publishWidgetButton,
}) {
  const { theme, light, dark } = useContext(ThemeContext);
  // const { allowTheming } = useContext(EditorContext);

  const [allowTheming, setAllowTheming] = useState(true);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        backgroundColor: theme.ui,
        flex: 1,
        height: "calc(100vh - 25px)",
        minHeight: 700,
        // color: "#FFF",
      }}
    >
      <WidgetViewHeader
        loading={loading}
        //
        allowTheming={allowTheming}
        setAllowTheming={setAllowTheming}
        //
        onRunButtonClick={handlePreviewButton}
        onSaveButtonClick={handleSaveDraftButton}
        onForkButtonClick={handleForkButton}
        publishWidgetButton={publishWidgetButton}
      />

      {renderCode ? (
        <Box
          sx={{
            flex: 1,
            p: 1,
            pt: 0,
            height: "100%",

            backgroundColor: theme.ui,
          }}
        >
          <Box
            sx={{
              flex: 1,
              height: "100%",
              // bgcolor: allowTheming ? theme.ui : "#FFF",
              bgcolor: allowTheming ? light.ui : dark.ui,
              overflowX: "auto",
              paddingBottom: "50px",
            }}
          >
            <Widget
              code={renderCode}
              props={{
                ...parsedWidgetProps,
                theme: allowTheming ? light : dark,
              }}
            />
          </Box>
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
            backgroundColor: allowTheming ? light.ui : dark.ui,
          }}
          onClick={handlePreviewButton}
        ></div>
      )}
    </Box>
  );
}
