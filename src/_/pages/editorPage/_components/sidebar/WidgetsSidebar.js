import {
  Box,
  ButtonBase,
  Chip,
  Fade,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";
import NoteAddRoundedIcon from "@mui/icons-material/NoteAddRounded";
import React, { useContext, useState } from "react";

import { styled } from "@mui/material/styles";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import DriveFileRenameOutlineRoundedIcon from "@mui/icons-material/DriveFileRenameOutlineRounded";
import CancelRoundedIcon from "@mui/icons-material/CancelRounded";

import { ThemeContext } from "../../../../context/ThemeContext";
import { EditorContext } from "../../../../context/EditorContext";
import FileIcon from "../../../../components/FileIcon";
import RenameDialog from "../../../../dialogs/RenameDialog";

export default function ExplorerSidebar({
  curPath,

  openFile,
  removeFromFiles,
  createFile,
  handleCreateButton,
  setShowRenameModal,
}) {
  const { theme } = useContext(ThemeContext);
  const { files, filesDetails } = useContext(EditorContext);

  return (
    <div
      style={{
        height: "100%",
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

        <Tooltip title="Add new file">
          <IconButton onClick={() => handleCreateButton()}>
            <NoteAddRoundedIcon
              sx={{ fontSize: "1rem", fill: theme.textColor3 }}
            />
          </IconButton>
        </Tooltip>
      </div>

      <Accordion defaultExpanded>
        <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
          <Typography sx={{ fontWeight: 600, fontSize: 13 }}>
            Open Editors
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          {files?.map((file, index) => {
            if (file.unnamed) {
              return;
            }

            const jp = file;
            const widgetName = file?.name?.split("/")[0];
            const { codeChangesPresent, isDraft } =
              filesDetails.get(widgetName) || {};

            return (
              <Item
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

      <Accordion defaultExpanded>
        <AccordionSummary aria-controls="panel2d-content" id="panel2d-header">
          <Typography sx={{ fontWeight: 600, fontSize: 13 }}>
            My Widgets
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography
            style={{
              textAlign: "center",
              width: "100%",
              fontSize: 13,
              fontWeight: 500,

              paddingBlock: 20,
            }}
            variant="h6"
          >
            Please show My widgets here
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}

const Item = ({
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

  return (
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

          <Tooltip title={item.name}>
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
              }}
              className="max1Lines"
            >
              {item.name}
            </Typography>
          </Tooltip>

          {isDraft && (
            <Chip
              label="Draft"
              sx={{
                opacity: 0.75,
                backgroundColor: "#ffdf0033",
                color: "#ffdf00",
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
        <Fade in={isSelected}>
          <IconButton
            size="small"
            sx={{ padding: "3px", margin: 0 }}
            onClick={() => renameButtonOnClick()}
          >
            <DriveFileRenameOutlineRoundedIcon
              sx={{
                fontSize: "1rem",
                fill: theme.textColor3 || "rgba(255,255,255,.75)",
              }}
            />
          </IconButton>
        </Fade>

        <IconButton
          size="small"
          sx={{
            padding: "3px",
            margin: 0,
            color: isSelected ? theme.textColor3 : "rgba(255,255,255,.15)",

            "&:hover": {
              color: "rgba(255,255,255,.25)",
            },
          }}
          onClick={() => removeButtonOnClick()}
        >
          <CancelRoundedIcon sx={{ fontSize: "1rem" }} />
        </IconButton>
      </Box>

      <RenameDialog
        key={`rename-modal-${item.name}`}
        show={showEditButton}
        name={item.name}
        onRename={(newName) => renameFile(newName)}
        onHide={() => setShowEditButton(false)}
      />
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
