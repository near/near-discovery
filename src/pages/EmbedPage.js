import React, { useEffect, useState } from "react";
import { recordPageView, Widget, useNear } from "near-social-vm";
import { useParams } from "react-router-dom";
import { useQuery } from "../hooks/useQuery";
import { useHashUrlBackwardsCompatibility } from "../hooks/useHashUrlBackwardsCompatibility";
import { Helmet } from "react-helmet";

export default function EmbedPage(props) {
  const { widgetSrc } = useParams();
  const query = useQuery();
  const [widgetProps, setWidgetProps] = useState({});
  const near = useNear();
  const src = widgetSrc || props.widgets.default;

  useHashUrlBackwardsCompatibility();

  useEffect(() => {
    setWidgetProps(
      [...query.entries()].reduce((props, [key, value]) => {
        props[key] = value;
        return props;
      }, {})
    );
  }, [query]);

  useEffect(() => {
    if(near)
      recordPageView(window.location.href);
  }, [near]);

  return (
    <>
      <Helmet>
        <title>{props.meta.title}</title>
        <meta name="description" content={props.meta.description} />
        <meta property="og:title" content={props.meta.title} />
        <meta property="og:description" content={props.meta.description} />
      </Helmet>
      <div className="d-inline-block position-relative overflow-hidden">
        <Widget
          key={props.widgets.wrapper}
          src={props.widgets.wrapper}
          props={{
            children: (
              <Widget
                key={props.tos.checkComponentPath}
                src={props.tos.checkComponentPath}
                props={{
                  logOut: props.logOut,
                  tosName: props.tos.contentComponentPath,
                  targetComponent: src,
                  targetProps: widgetProps,
                }}
              />
            ),
          }}
        />
      </div>
    </>
  );
}
