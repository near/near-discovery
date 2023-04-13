import React, { useEffect } from "react";
import { Widget } from "near-social-vm";

export default function NearOrgPage(props) {
  useEffect(() => {
    setTimeout(() => {
      analytics("view", {
        props: {
          widget: props.widgetSrc,
        },
      });
    }, 1);
  }, [props.widgetSrc]);

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
          <Widget
            key={props.widgets.wrapper}
            src={props.widgets.wrapper}
            props={{
              children: <Widget key={props.widgetSrc} src={props.widgetSrc} />,
            }}
          />
        </div>
      </div>
    </div>
  );
}
