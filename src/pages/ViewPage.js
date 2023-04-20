import React, { useEffect, useState, useCallback } from "react";
import { Widget } from "near-social-vm";
import { useParams } from "react-router-dom";
import { useQuery } from "../hooks/useQuery";
import { useHashUrlBackwardsCompatibility } from "../hooks/useHashUrlBackwardsCompatibility";
import styleZendesk from "../zendesk";
import util from "util";
import { Helmet } from "react-helmet";

export default function ViewPage(props) {
  // will always be empty in prod
  const localOverrideUrl =
    props.flags?.bosLoaderUrl || process.env.LOCAL_COMPONENT_LOADER;
  const [loaderError, setloaderError] = useState();

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

    try {
      const res = await fetch(localOverrideUrl, {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
      });
      if (!res.ok) {
        throw new Error("Network response was not OK");
      }
      const data = await res.json();
      setRedirectMap(data.components);
    } catch (e) {
      console.error(e);
      setloaderError(true);
    }
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
    localStorage.setItem("accountId", props.signedAccountId);
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
      analytics("view", {
        props: {
          widget: src,
        },
      });
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
    <>
      <Helmet>
        <title>{props.meta.title}</title>
        <meta name="description" content={props.meta.description} />
        <meta property="og:title" content={props.meta.title} />
        <meta property="og:description" content={props.meta.description} />
      </Helmet>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        {localOverrideUrl && (
          <div
            style={{
              backgroundColor: "#FFF2CD",
              color: "#664D04",
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              height: "2rem",
              columnGap: "8px",
            }}
          >
            <span>Loading components from: {localOverrideUrl}</span>
            {props.flags?.bosLoaderUrl && (
              <button
                className="btn btn-outline"
                onClick={() => props.setFlags?.({ bosLoaderUrl: null })}
              >
                <i className="bi bi-x" />
              </button>
            )}
          </div>
        )}
        {loaderError && (
          <div style={{ padding: "16px" }}>
            BOS Loader fetch error, see console logs. CORS errors may be
            misleading and mean your endpoint cannot be reached
          </div>
        )}
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
      </div>
    </>
  );
}
