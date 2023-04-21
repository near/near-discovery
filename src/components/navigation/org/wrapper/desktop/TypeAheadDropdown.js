import React from "react";
import { Widget } from "near-social-vm";
import useRedirectMap from "../../../../../hooks/useRedirectMap";

const TypeAheadDropdown = (props) => {
  const [shouldWaitForMap, redirectMap] = useRedirectMap();

  return (
    <div
      onFocus={() => props.focusChange(true)}
      onBlur={() => props.focusChange(false)}
      onClick={async () => {
        await setTimeout(100);
        props.focusChange(false);
        props.searchFocusChange(false);
      }}
    >
      {(!shouldWaitForMap || redirectMap) && (
        <Widget
          config={{ redirectMap }}
          src={props.widgetSrc}
          props={{ term: props.term, focusChange: props.searchFocusChange }}
        />
      )}
    </div>
  );
};

export default TypeAheadDropdown;
