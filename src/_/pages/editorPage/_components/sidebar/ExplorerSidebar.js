import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { TreeItem, TreeView } from "@mui/lab";
import { Fade, IconButton, Typography } from "@mui/material";
import NoteAddRoundedIcon from "@mui/icons-material/NoteAddRounded";
import CreateNewFolderRoundedIcon from "@mui/icons-material/CreateNewFolderRounded";
import React, { useContext, useState } from "react";

import LabelWithFileIcon from "../../../../components/LabelWithFileIcon";
import { ThemeContext } from "../../../../context/ThemeContext";
import { EditorContext } from "../../../../context/EditorContext";

export default function ExplorerSidebar() {
  const { theme } = useContext(ThemeContext);
  const { files, addEmptyFile, filesDetails } = useContext(EditorContext);

  const [showEditButtons, setShowEditButtons] = useState(false);

  return (
    <div
      style={{
        height: "100%",
      }}
      onMouseEnter={() => setShowEditButtons(true)}
      onMouseLeave={() => setShowEditButtons(false)}
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
          Explorer
        </Typography>

        <Fade in={showEditButtons}>
          <div>
            <IconButton onClick={() => addEmptyFile()}>
              <NoteAddRoundedIcon
                sx={{ fontSize: "1rem", fill: theme.textColor3 }}
              />
            </IconButton>

            <IconButton>
              <CreateNewFolderRoundedIcon
                sx={{ fontSize: "1rem", fill: theme.textColor3 }}
              />
            </IconButton>
          </div>
        </Fade>
      </div>

      {/* 
        {JSON.stringify(files)}
        {console.log(files)} 
      */}

      <TreeView
        aria-label="multi-select"
        defaultCollapseIcon={<ExpandMoreIcon />}
        defaultExpandIcon={<ChevronRightIcon />}
        multiSelect
      >
        {files?.map((file, index) => {
          if (file.unnamed) {
            return;
          }

          const jp = JSON.stringify(file);
          const widgetName = file?.name?.split("/")[0];
          const { codeChangesPresent, isDraft } =
            filesDetails.get(widgetName) || {};

          return (
            <TreeItem
              key={index}
              nodeId={index}
              icon={
                <div
                  style={{
                    paddingTop: 1,
                    width: 25,
                    height: 26,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <div
                    style={{
                      width: 10,
                      height: 10,
                      borderRadius: 5,
                      backgroundColor: "red",
                    }}
                  />
                </div>
              }
              label={<LabelWithFileIcon item={file} />}
              // label={jp}
              // nodeId={file.index.toString()}
              // onClick={() => {
              //   if (!file.paths) {
              //     addSelectedFile(file);
              //   }
              // }}
            />
          );
        })}
      </TreeView>

      {/* {files?.map((file, index) => (
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
        ))} */}
    </div>
  );
}

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
