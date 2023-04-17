import React, { useEffect, useState, useCallback } from "react";
import { recordPageView, Widget } from "near-social-vm";
import { useParams } from "react-router-dom";
import { useQuery } from "../hooks/useQuery";
import { useHashUrlBackwardsCompatibility } from "../hooks/useHashUrlBackwardsCompatibility";
import styleZendesk from "../zendesk";

export default function ViewPage(props) {
  // will always be empty in prod
  const localOverrideUrl = process.env.LOCAL_COMPONENT_LOADER;

  const { widgetSrc } = useParams();
  const query = useQuery();
  const [widgetProps, setWidgetProps] = useState({});
  const [redirectMap, setRedirectMap] = useState();

  const src = widgetSrc || props.widgets.default;
  const setWidgetSrc = props.setWidgetSrc;
  const viewSourceWidget = props.widgets.viewSource;

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
    setWidgetProps(Object.fromEntries([...query.entries()]));
  }, [query]);

  useEffect(() => {
    // Displays the Zendesk widget only if user is signed in and on the home page
    if (!props.signedIn || !!widgetSrc) {
      zE("webWidget", "hide");
      return;
    }
    zE("webWidget", "show");
  }, [props.signedIn, widgetSrc]);

  useEffect(() => {
    setTimeout(() => {
      setWidgetSrc(
        src === viewSourceWidget && query.get("src")
          ? {
              edit: query.get("src"),
              view: null,
            }
          : {
              edit: src,
              view: src,
            }
      );
      recordPageView(src);
    }, 1);
  }, [src, query, setWidgetSrc, viewSourceWidget]);

  //once the zendesk widget comes online, style it
  const queueZendeskCheck = useCallback(() => {
    const zwFrame = document.getElementById("launcher");
    const zwEmbed = zwFrame?.contentDocument.getElementById("Embed");
    const zwButton = zwEmbed?.getElementsByTagName("button")[0];
    if (zwButton) {
      styleZendesk();
      return;
    }
    setTimeout(queueZendeskCheck, 20);
  });

  useEffect(queueZendeskCheck, []);

  return (
    <div className="container-xl">
      <div className="row">
        <div
          className="d-inline-block position-relative overflow-hidden"
          style={{
            "--body-top-padding": "24px",
            paddingTop: "var(--body-top-padding)",
          }}
        >
          {(!localOverrideUrl || redirectMap) && (
            <div>
              <Widget
                config={{ redirectMap: redirectMap }}
                key={props.widgets.wrapper}
                src={props.widgets.wrapper}
                props={{
                  children: (
                    <Widget
                      config={{ redirectMap: redirectMap }}
                      key={props.tos.checkComponentPath}
                      src={props.tos.checkComponentPath}
                      props={{
                        logOut: props.logOut,
                        targetProps: widgetProps,
                        targetComponent: src,
                        tosName: props.tos.contentComponentPath,
                      }}
                    />
                  ),
                }}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
