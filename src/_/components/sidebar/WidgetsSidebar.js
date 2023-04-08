import {
  Box,
  Button,
  ButtonBase,
  Chip,
  Fade,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";
import NoteAddRoundedIcon from "@mui/icons-material/NoteAddRounded";
import CreateNewFolderRoundedIcon from "@mui/icons-material/CreateNewFolderRounded";
import React, { useContext, useEffect, useMemo, useState } from "react";
import { useNear, useCache, useAccountId } from "near-social-vm";

import { styled } from "@mui/material/styles";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import DriveFileRenameOutlineRoundedIcon from "@mui/icons-material/DriveFileRenameOutlineRounded";
import CancelRoundedIcon from "@mui/icons-material/CancelRounded";

import { ThemeContext } from "../../context/ThemeContext";
import { EditorContext } from "../../context/EditorContext";
import FileIcon from "../FileIcon";
import RenameDialog from "../../dialogs/RenameDialog";
import ConfirmDialog from "../../dialogs/ConfirmDialog";

export default function WidgetsSidebar({
  loadFile,

  curPath,

  openFile,
  removeFromFiles,
  createFile,
  handleCreateButton,
  setShowRenameModal,
  setShowOpenModal,
}) {
  const near = useNear();
  const cache = useCache();
  const accountId = useAccountId();

  const { theme } = useContext(ThemeContext);
  const { files, filesDetails } = useContext(EditorContext);

  const [myWidgets, setMyWidgets] = useState([]);

  // useEffect(() => {
  //   const timeout = setTimeout(() => {
  //     getData();
  //   }, 5000);

  //   return () => clearTimeout(timeout);
  // }, []);

  // useEffect(() => {
  //   getData();
  // }, []);

  const getData = () => {
    let widget = `${accountId}/widget/*`;

    const code = cache.socialGet(
      near,
      widget,
      false,
      undefined,
      undefined,
      getData
    );
    setMyWidgets(code);
  };

  return (
    <div
      style={{
        height: "100%",
        // height: "100vh",
        overflowY: "auto",
        overflowX: "hidden",
        paddingBottom: 25,
      }}
    >
      <div
        style={{
          height: 50,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          paddingInline: 10,
          borderBottom: `1px solid ${theme.borderColor}`,
        }}
      >
        <Typography variant="h6" sx={{ color: theme.textColor }}>
          Widgets
        </Typography>

        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Tooltip title="Add new file">
            <IconButton onClick={() => handleCreateButton()}>
              <NoteAddRoundedIcon
                sx={{ fontSize: "1.25rem", fill: theme.textColor3 }}
              />
            </IconButton>
          </Tooltip>

          {/* <Tooltip title="Open Component">
            <IconButton onClick={() => setShowOpenModal((e) => !e)}>
              <CreateNewFolderRoundedIcon
                sx={{ fontSize: "1.25rem", fill: theme.textColor3 }}
              />
            </IconButton>
          </Tooltip> */}
        </Box>
      </div>

      <Accordion defaultExpanded>
        <AccordionSummary
          aria-controls="panel1d-content"
          id="panel1d-header"
          sx={{ backgroundColor: theme.backgroundColor }}
        >
          <Typography sx={{ fontWeight: 600, fontSize: 13 }}>
            Open Widgets
          </Typography>
        </AccordionSummary>
        {/* {console.log("AccordionDetails : files :", files)} */}
        <AccordionDetails sx={{ backgroundColor: theme.ui }}>
          {files?.map((file, index) => {
            if (!file) {
              console.log("File is undefined " + file);
              return;
            }

            if (file?.unnamed) {
              return;
            }

            const jp = file;
            const widgetName = file?.name?.split("/")[0] || "";
            const { codeChangesPresent, isDraft } =
              filesDetails.get(widgetName) || {};

            // console.log({ file });
            return (
              <OpenEditorItem
                key={index}
                item={file}
                codeChangesPresent={codeChangesPresent}
                isDraft={isDraft}
                isSelected={curPath === file}
                // handleClicks
                onClick={() => openFile(file)}
                renameButtonOnClick={() => {
                  setShowRenameModal((e) => !e);
                }}
                removeButtonOnClick={() => {
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
              />
            );
          })}
        </AccordionDetails>
      </Accordion>

      {accountId && (
        <Accordion
          // defaultExpanded
          onClick={() => {
            if (myWidgets.length <= 0) {
              getData();
            }
          }}
        >
          <AccordionSummary
            aria-controls="panel2d-content"
            id="panel2d-header"
            sx={{ backgroundColor: theme.backgroundColor }}
          >
            <Typography sx={{ fontWeight: 600, fontSize: 13 }}>
              My Widgets
            </Typography>
          </AccordionSummary>
          <AccordionDetails sx={{ backgroundColor: theme.ui }}>
            {myWidgets ? (
              Object.keys(myWidgets)?.map((fileName, index) => (
                <MyWidgetsItem
                  key={index}
                  label={fileName}
                  onClick={() => loadFile(fileName)}
                />
              ))
            ) : (
              <ButtonBase
                sx={{
                  fontSize: 14,
                  textTransform: "none",
                  width: "100%",
                  py: 4,
                }}
                onClick={() => getData()}
              >
                Click here to see all widgets
              </ButtonBase>
            )}
          </AccordionDetails>
        </Accordion>
      )}
    </div>
  );
}

const OpenEditorItem = ({
  item,
  codeChangesPresent,
  isDraft,
  isSelected,

  // handleClicks
  onClick,
  renameButtonOnClick,
  removeButtonOnClick,
}) => {
  const { theme } = useContext(ThemeContext);

  const [showEditButton, setShowEditButton] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

  return (
    <>
      <Box
        sx={{
          position: "relative",
          display: "flex",
          alignItems: "center",
          width: "100%",
          backgroundColor: isSelected ? theme.ui2 : theme.ui,
          "&:hover": {
            backgroundColor: theme.ui2,
            cursor: "pointer",
          },
        }}
      >
        <ButtonBase
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            pl: 2,
            pr: 0.5,
            py: 0.5,
            width: "100%",

            zIndex: 5,
          }}
          onClick={() => onClick()}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
            }}
          >
            {codeChangesPresent && (
              <Box
                style={{
                  minWidth: 8,
                  height: 8,
                  borderRadius: 4,
                  backgroundColor: "rgba(255,0,0,.75)",
                }}
              />
            )}

            <FileIcon type={item?.type} />

            {/* <Tooltip title={item?.name}> */}
            <Typography
              variant="p"
              sx={{
                ml: 0,
                fontWeight: 400,
                color: theme.textColor2,
                paddingBlock: "2.5px",
                textTransform: "none",
                fontSize: ".9rem",
                textAlign: "left",
                wordBreak: "break-all",
              }}
              className="max1Lines"
            >
              {item?.name}
            </Typography>
            {/* </Tooltip> */}

            {isDraft && (
              <Chip
                label="Draft"
                sx={{
                  opacity: 0.75,
                  backgroundColor: "#ffdf0033",
                  color: theme?.name === "dark" ? "#ffdf00" : theme.textColor,
                  fontSize: 12,
                  mr: 1,
                  fontSize: 10,
                  height: 18,

                  pointerEvents: "none",
                }}
                size="small"
              />
            )}
          </Box>
        </ButtonBase>

        <Box
          sx={{
            display: "flex",
            gap: 0.5,
            zIndex: 10,
            height: "100%",
            mr: 1,

            alignItems: "center",
          }}
        >
          <Fade in={isSelected} mountOnEnter unmountOnExit>
            <IconButton
              size="small"
              sx={{ padding: "3px", margin: 0 }}
              onClick={() => renameButtonOnClick()}
            >
              <DriveFileRenameOutlineRoundedIcon
                sx={{
                  fontSize: "1rem",
                  fill:
                    theme.name !== "dark"
                      ? "rgba(0,0,0,.75)"
                      : "rgba(255,255,255,.75)",
                }}
              />
            </IconButton>
          </Fade>

          <IconButton
            size="small"
            sx={{
              padding: "3px",
              margin: 0,
              color: isSelected ? theme.textColor3 : theme.textColor3 + 33,

              "&:hover": {
                color: theme.textColor3 + 99,
              },
            }}
            onClick={() => {
              if (isDraft === true || codeChangesPresent === true) {
                setShowConfirmDialog(true);
              } else {
                removeButtonOnClick();
              }
            }}
          >
            <CancelRoundedIcon sx={{ fontSize: "1rem" }} />
          </IconButton>
        </Box>

        <RenameDialog
          key={`rename-modal-${item.name}`}
          show={showEditButton}
          name={item?.name}
          onRename={(newName) => renameFile(newName)}
          onHide={() => setShowEditButton(false)}
        />
      </Box>

      <ConfirmDialog
        open={showConfirmDialog}
        setOpen={setShowConfirmDialog}
        onClick={() => removeButtonOnClick()}
        label={`Remove widget`}
        description={`Are you sure you want to remove "${item?.name}"?`}
      />
    </>
  );
};

const MyWidgetsItem = ({ label, onClick }) => {
  const { theme } = useContext(ThemeContext);

  return (
    <Box
      sx={{
        position: "relative",
        display: "flex",
        alignItems: "center",
        width: "100%",
        backgroundColor: theme.ui,
        "&:hover": {
          backgroundColor: theme.ui2,
          cursor: "pointer",
        },
      }}
    >
      <ButtonBase
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          px: 2,
          py: 0.5,
          width: "100%",

          zIndex: 5,
        }}
        onClick={() => onClick()}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
          }}
        >
          <FileIcon type="widget" />

          {/* <Tooltip title={label}> */}
          <Typography
            variant="p"
            sx={{
              ml: 0,
              fontWeight: 400,
              color: theme.textColor2,
              paddingBlock: "2.5px",
              textTransform: "none",
              fontSize: ".9rem",
              textAlign: "left",
              wordBreak: "break-all",
            }}
            className="max1Lines"
          >
            {label}
          </Typography>
          {/* </Tooltip> */}
        </Box>
      </ButtonBase>
    </Box>
  );
};

/* 
  {files?.map((file, index) => (
    <TreeItem
      key={index}
      nodeId={file.index.toString()}
      label={<LabelWithFileIcon item={file} />}
      onClick={() => {
        if (!file.paths) {
          addSelectedFile(file);
        }
      }}
    >
      {file?.paths && <CustomTreeView key={index} file={file} />}
    </TreeItem>
  ))} 
*/

// const CustomTreeView = ({ file }) => {
//   const { addSelectedFile } = useContext(EditorContext);

//   return (
//     <div>
//       {file?.paths?.map((item, index) => (
//         <TreeItem
//           key={index}
//           nodeId={item.index.toString()}
//           label={<LabelWithFileIcon item={item} renameButton />}
//           onClick={() => {
//             // console.log(file, index);

//             if (!file?.paths[index]?.paths) {
//               addSelectedFile(file?.paths[index]);
//             }
//           }}
//         >
//           {item.paths && <CustomTreeView path={item} />}
//         </TreeItem>
//       ))}
//     </div>
//   );
// };

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  // border: `1px solid ${theme.palette.divider}`,
  // backgroundColor: "transparent",
  color: "#7e8185",
  "&:not(:last-child)": {
    borderBottom: 0,
  },
  "&:before": {
    display: "none",
  },
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={
      <ArrowForwardIosSharpIcon sx={{ fontSize: "0.8rem", fill: "#7e8185" }} />
    }
    {...props}
  />
))(({ theme }) => ({
  backgroundColor: "#1a1a1a",
  // backgroundColor:
  //   theme.palette.mode === "dark" ? "#1e1e1e" : "rgba(0, 0, 0, .03)",
  flexDirection: "row-reverse",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(90deg)",
  },
  "& .MuiAccordionSummary-content": {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  // backgroundColor: "#262626",
  backgroundColor: "#1e1e1e",
  padding: 0,
  borderTop: "1px solid rgba(0, 0, 0, .125)",
}));
