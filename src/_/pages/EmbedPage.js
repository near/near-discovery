import React from "react";
import { useAccount, Widget } from "near-social-vm";
import { useParams } from "react-router-dom";

export default function EmbedPage(props) {
  const { widgetSrc } = useParams();
  const account = useAccount();

  return (
    <Widget
      src={widgetSrc}
      props={{
        accountId: account.accountId,
        logOut: props.logOut,
      }}
    />
  );
}
