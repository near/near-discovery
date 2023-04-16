import React, { useCallback, useEffect, useMemo, useState } from "react";
import NavigationLeft from "./NavigationLeft";
import NavigationRight from "./NavigationRight";

const Navigation = ({
  jpath,
  forkFile,
  files,
  widgetName,
  code,
  toPath,
  near,
  path,
  metadata,
  filesOpened,
  closeFile,
  setShowModal,
  isDraft,
  changeFile,
}) => (
  <>
    <div className="w-100 d-flex " style={{ flexWrap: "nowrap" }}>
      <div className="d-flex" style={{ flexWrap: "wrap" }}>
        <NavigationLeft
          files={files}
          jpath={jpath}
          changeFile={changeFile}
          filesOpened={filesOpened}
          setShowModal={setShowModal}
          closeFile={closeFile}
        />
      </div>
      <div
        className="d-flex ms-auto"
        style={{ minWidth: "280px", flexWrap: "wrap" }}
      >
        <NavigationRight
          jpath={jpath}
          widgetName={widgetName}
          setShowModal={setShowModal}
          code={code}
          forkFile={forkFile}
          toPath={toPath}
          near={near}
          path={path}
          metadata={metadata}
          isDraft={isDraft}
        />
      </div>
    </div>
  </>
);

export default Navigation;
