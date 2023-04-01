import React, { useContext } from "react";
import { Box } from "@mui/material";
import EditorPageActivitybar from "../editorPage/_components/Activitybar";
import { ThemeContext } from "../../context/ThemeContext";
import { Allotment } from "allotment";
import { EditorContext } from "../../context/EditorContext";
import Sidebar from "../editorPage/_components/sidebar/EditorPageSidebar";
import PrimarySidebar from "../../components/PrimarySidebar";
import { Link } from "react-router-dom";

export default function SearchPage(props) {
  const { theme } = useContext(ThemeContext);
  const { selectedActivity } = useContext(EditorContext);

  return (
    <Box
      sx={{
        backgroundColor: theme.ui,
        height: "100vh",
        maxHeight: "calc(100vh - 25px)",
        minHeight: 700,
        width: "100%",

        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "flex-start",
      }}
    >
      {/* <Link to="/edit">XD</Link> */}
      <EditorPageActivitybar {...props} />

      <Allotment maxSize="100%">
        <Allotment.Pane
          key="activityBar"
          snap
          visible={selectedActivity?.length > 0 ? true : false}
          preferredSize={300}
          minSize={100}
          maxSize={450}
        >
          <PrimarySidebar
            appProps={props}
            // loadFile={loadFile}
            // For WidgetSidebar
            // renameFile={renameFile}
            // curPath={path}
            // openFile={openFile}
            // removeFromFiles={removeFromFiles}
            // createFile={createFile}
            // handleCreateButton={() => {
            //   // setShowAddModal(false),
            //   setShowRenameModal(true);
            //   createNewFile(Filetype.Widget);
            // }}
            // setShowRenameModal={setShowRenameModal}
            // setShowOpenModal={setShowOpenModal}
            // For ProfileSidebar
            logOut={() => props.logOut()}
            requestSignIn={() => props.requestSignIn()}
          />
        </Allotment.Pane>

        <Allotment.Pane minSize={300}>
          <div>asdsda</div>
        </Allotment.Pane>
      </Allotment>
    </Box>
  );
}
