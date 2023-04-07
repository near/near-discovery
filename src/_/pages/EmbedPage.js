import React from "react";
import { useAccount, Widget } from "near-social-vm";
import { useParams } from "react-router-dom";
import { NavigationWrapper } from "../../components/navigation/alpha/NavigationWrapper";

export default function EmbedPage(props) {
  const { widgetSrc } = useParams();
  const account = useAccount();

  return (
    <div>
      <NavigationWrapper {...props} />

      <Widget
        src={widgetSrc}
        props={{
          accountId: account.accountId,
          logOut: props.logOut,
        }}
      />
    </div>
  );
}
