import React, { useEffect, useState } from "react";
import { Widget, useNear } from "near-social-vm";
import NavigationWrapper from "../components/navigation/org/NavigationWrapper";
import IframeResizer from "iframe-resizer-react";
import { useHashUrlBackwardsCompatibility } from "../hooks/useHashUrlBackwardsCompatibility";
import { Helmet } from "react-helmet";
import { recordPageView, debounceRecordClick } from "../utils/analytics";


export default function NearOrgPage(props) {
  // will always be empty in prod
  const localOverrideUrl = process.env.LOCAL_COMPONENT_LOADER;
  const [redirectMap, setRedirectMap] = useState();
  const near = useNear();

  useHashUrlBackwardsCompatibility();

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
    if (near) recordPageView(props.src);
  }, [near]);

  useEffect(() => {
    props.setWidgetSrc({
      edit: props.src,
      view: props.src,
    });
  }, [props.src]);

  return (
  <>
      {props.meta && (
        <Helmet>
          <title>{props.meta.title}</title>
          <meta property="og:title" content={props.meta.title} />
          <meta name="description" content={props.meta.description} />
          <meta property="og:description" content={props.meta.description} />
        </Helmet>
      )}
      <NavigationWrapper {...props} />

      <div onPointerUp={debounceRecordClick}>
        {props.iframeSrc ? (
          <IframeResizer
            src={props.iframeSrc}
            style={{ width: "1px", minWidth: "100%" }}
            checkOrigin={false}
          />
        ) : (
          <>
            {(!localOverrideUrl || redirectMap) && (
              <Widget
                config={{ redirectMap }}
                key={props.widgets.wrapper}
                src={props.widgets.wrapper}
                props={{
                  children: (
                    <Widget
                      config={{ redirectMap }}
                      key={props.src}
                      src={props.src}
                    />
                  ),
                }}
              />
            )}
          </>
        )}
      </div>
    </>
  );
}
