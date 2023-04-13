import React, { useEffect, useState } from "react";
import { Widget } from "near-social-vm";
import DesktopNavigation from "../components/navigation/org/wrapper/desktop/DesktopNavigation";

export default function NearOrgPage(props) {
  // will always be empty in prod
  const localOverrideUrl = process.env.LOCAL_COMPONENT_LOADER;
  const [redirectMap, setRedirectMap] = useState();

  // fetch local component versions if a local loader
  // is provided. must be provided as {components: { <path>: { code : <code>}}}
  async function fetchRedirectMap() {
    if (!localOverrideUrl) return;

    const res = await fetch(localOverrideUrl, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    });
    const data = await res.json();
    setRedirectMap(data.components);
  }

  useEffect(() => {
    localOverrideUrl && fetchRedirectMap();
  }, []);

  useEffect(() => {
    analytics("view", {
      props: {
        widget: props.src,
      },
    });
  }, [props.src]);

  return (
    <>
      <DesktopNavigation />

      <div>
        <p>{props.src}</p>
        {(!localOverrideUrl || redirectMap) && (
          <Widget
            config={{ redirectMap: redirectMap }}
            key={props.widgets.wrapper}
            src={props.widgets.wrapper}
            props={{
              children: <Widget key={props.src} src={props.src} />,
            }}
          />
        )}
      </div>
    </>
  );
}
