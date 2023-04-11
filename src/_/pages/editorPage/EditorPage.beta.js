import React from "react";
import PagesContainer from "../../components/PagesContainer";
import { Box } from "@mui/material";
import { ThemeContext } from "../../context/ThemeContext";
import { useContext } from "react";
import { useState } from "react";
import { useEffect } from "react";

import {
  Widget,
  useCache,
  useNear,
  CommitButton,
  useAccountId,
} from "near-social-vm";

const StorageDomain = {
  page: "editor",
};
const StorageType = {
  Code: "code",
  Files: "files",
};

export default function EditorPageBeta(props) {
  const near = useNear();
  const cache = useCache();
  const accountId = useAccountId();

  const { theme } = useContext(ThemeContext);

  const [lastOpenedFile, setLastOpenedFile] = useState();
  const [files, setFiles] = useState([]);

  useEffect(() => {
    // Reding Files and Last open files from cache
    cache
      .asyncLocalStorageGet(StorageDomain, { type: StorageType.Files })
      .then((value) => {
        const { files, lastPath } = value || {};
        setFiles(files || []);
        // setLastPath(lastPath);
        setLastOpenedFile(lastPath);
        console.log("files : ", files, "  lastPath : ", lastPath);
      });
  }, [cache]);

  return (
    <PagesContainer {...props}>
      <Box sx={{ display: "grid", gridTemplateColumns: "1fr 2fr 2fr" }}>
        <Box>
          files
          <Box>
            {files.map((file) => (
              <p>{JSON.stringify(file)}</p>
            ))}
          </Box>
        </Box>
        <Box>b</Box>
        <Box>c</Box>
      </Box>
    </PagesContainer>
  );
}
