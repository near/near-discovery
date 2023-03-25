import {
  ButtonBase,
  Chip,
  IconButton,
  Tab,
  Tabs,
  Tooltip,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import VerticalSplitRoundedIcon from "@mui/icons-material/VerticalSplitRounded";
import React, { useContext } from "react";
import CancelRoundedIcon from "@mui/icons-material/CancelRounded";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import { Box } from "@mui/system";
import { ThemeContext } from "../../../context/ThemeContext";
import { EditorContext } from "../../../context/EditorContext";
import FileIcon from "../../../components/FileIcon";

const StyledTabs = styled((props) => (
  <Tabs
    {...props}
    TabIndicatorProps={{
      children: <span className="MuiTabs-indicatorSpan" />,
    }}
  />
))({
  width: "100%",
  minHeight: 50,
  maxHeight: 50,
  display: "flex",
  flexDirection: "row",

  "& .MuiTabs-indicator": {
    display: "flex",
    justifyContent: "center",
    backgroundColor: "transparent",
  },
  "& .MuiTabs-indicatorSpan": {
    // maxWidth: 40,
    width: "100%",
  },
});

const StyledTab = styled((props) => (
  <Tab component="div" disableRipple {...props} />
))(() => ({
  minHeight: 48,
  height: 50,
  display: "flex",
  flexDirection: "row",
  textTransform: "none",
  fontWeight: 400,
  fontSize: ".8rem",

  padding: 0,
  margin: 0,

  // marginRight: theme.spacing(1),
  color: "rgba(255, 255, 255, 0.7)",
  "&.Mui-selected": {
    color: "#fff",
  },
  "&.Mui-focusVisible": {
    backgroundColor: "rgba(100, 95, 228, 0.32)",
    width: "100%",
  },
}));

export default function Tabsbar({
  curPath,

  openFile,
  removeFromFiles,
  createFile,

  handleCreateButton,
}) {
  const { theme } = useContext(ThemeContext);
  // const {
  //   activeTabs,
  //   selectedFile,
  //   removeSelectedFile,
  //   setSelectedFile,
  //   showWebsiteView,
  //   setShowWebsiteView,
  // } = useContext(EditorContext);

  const {
    files,
    filesDetails,

    showWebsiteView,
    setShowWebsiteView,
  } = useContext(EditorContext);

  return (
    <Box
      sx={{
        width: "100%",
        backgroundColor: theme.backgroundColor,
        height: 50,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <>
        <StyledTabs
          value={{ type: curPath?.type, name: curPath?.name }}
          variant="scrollable"
          aria-label="visible arrows tabs example"
        >
          {files?.map((file, index) => {
            if (file.unnamed) {
              return;
            }

            const jp = file;
            const widgetName = file?.name?.split("/")[0];
            const { codeChangesPresent, isDraft } =
              filesDetails.get(widgetName) || {};

            return (
              <StyledTab
                key={index}
                value={file}
                label={
                  <div style={{ height: "100%", marginInline: 5 }}>
                    <ButtonBase
                      sx={{ height: "100%", paddingInline: "5px" }}
                      onClick={() => openFile(file)}
                    >
                      {isDraft && (
                        <Chip
                          label="Draft"
                          sx={{
                            backgroundColor: "#ffdf0033",
                            color: "#ffdf00",
                            fontSize: 12,
                            mr: 1,
                          }}
                          size="small"
                        />
                      )}
                      <FileIcon
                        type={file.type}
                        sx={{ marginRight: 10, marginBottom: 2 }}
                      />

                      <Typography
                        variant="body2"
                        sx={{
                          fontWeight: 400,
                          color: theme.textColor2,
                          paddingBlock: "2.5px",
                          textTransform: "none",
                        }}
                        className="max1Lines"
                      >
                        {file.name}
                      </Typography>

                      {codeChangesPresent && (
                        <Box
                          sx={{
                            ml: 1,
                            width: 8,
                            height: 8,
                            borderRadius: 4,
                            backgroundColor: "red",
                          }}
                        />
                      )}
                    </ButtonBase>

                    <Tooltip title="Close" placement="bottom">
                      <IconButton
                        style={{
                          width: "1rem",
                          height: "1rem",
                          marginLeft: 5,
                        }}
                        // onClick={() => removeSelectedFile(file)}
                        onClick={() => {
                          removeFromFiles(file);
                          // if (jp === jpath) {

                          if (jp === curPath) {
                            if (files.length > 1) {
                              console.log("HI FORM FILS ASE ARO>...");
                              openFile(files[index - 1] || files[index + 1]);
                            } else {
                              console.log("HI FORM FILE NAI R>...");
                              createFile(Filetype.Widget);
                            }
                          }
                        }}
                      >
                        <CancelRoundedIcon
                          sx={{
                            fontSize: "1rem",
                            fill:
                              jp === curPath
                                ? "rgba(255,255,255,.75)"
                                : "rgba(255,255,255,.25)",
                          }}
                        />
                      </IconButton>
                    </Tooltip>
                  </div>
                }
              />
            );
          })}

          <Box sx={{ display: "flex", alignItems: "center", ml: 1 }}>
            <IconButton
              sx={{
                height: 35,
                width: 35,
                color: theme.textColor,
                transition: "all.2s ease-in-out",
                "&:hover": {
                  backgroundColor: "#fff1",
                },
              }}
              onClick={() => handleCreateButton()}
            >
              <AddRoundedIcon fontSize="small" />
            </IconButton>
          </Box>
        </StyledTabs>
      </>

      <Tooltip
        title={showWebsiteView ? "Hide Website" : "Show Website"}
        placement="bottom"
      >
        <IconButton
          sx={{
            color: showWebsiteView ? theme.textColor2 : theme.buttonColor,
            mr: 0.5,
          }}
          onClick={() => setShowWebsiteView((e) => !e)}
        >
          <VerticalSplitRoundedIcon
            sx={{
              fill: showWebsiteView ? theme.textColor2 : theme.buttonColor,
            }}
          />
        </IconButton>
      </Tooltip>
    </Box>
  );
}
