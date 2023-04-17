import React, { useCallback, useEffect, useMemo, useState } from "react";
import NavigationLeft from "./NavigationLeft";
import NavigationRight from "./NavigationRight";

const Navigation = ({
  jpath,
  forkFile,
  filesObject,
  widgetName,
  codeVisible,
  toPath,
  near,
  path,
  metadata,
  closeFile,
  setShowModal,
  isDraft,
  changeFile,
}) => (
  <>
    <div className="w-100 d-flex " style={{ flexWrap: "nowrap" }}>
      <div className="d-flex" style={{ flexWrap: "wrap" }}>
        <NavigationLeft
          filesObject={filesObject}
          jpath={jpath}
          changeFile={changeFile}
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
          codeVisible={codeVisible}
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
