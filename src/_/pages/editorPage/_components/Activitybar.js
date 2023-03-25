import React, { useContext, useState } from "react";
import ContentCopyRoundedIcon from "@mui/icons-material/ContentCopyRounded";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import CommitRoundedIcon from "@mui/icons-material/CommitRounded";
import DashboardRoundedIcon from "@mui/icons-material/DashboardRounded";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";

import camelToNormal from "../../../libs/camelToNormal";
import { ThemeContext } from "../../../context/ThemeContext";
import { EditorContext } from "../../../context/EditorContext";

import DiamondRoundedIcon from "@mui/icons-material/DiamondRounded";
import VerticalSplitRoundedIcon from "@mui/icons-material/VerticalSplitRounded";
import { ButtonBase, Tooltip } from "@mui/material";
import { useHistory } from "react-router-dom";
import { Widget, useNear, useAccount } from "near-social-vm";

export default function Activitybar(props) {
  const history = useHistory();
  const account = useAccount();

  const { theme } = useContext(ThemeContext);
  const { setShowWebsiteView } = useContext(EditorContext);
  return (
    <div
      style={{
        minHeight: "max(100vh, 700px)",
        height: "100%",

        width: 50,
        backgroundColor: theme.backgroundColor,
        borderRight: `1px ${theme.borderColor} solid`,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <div>
        <ActivityButton
          icon={<DiamondRoundedIcon sx={{ fill: theme.textColor4 }} />}
          label="home"
          onClick={() => history.push("/")}
        />

        <ActivityButton
          icon={<ContentCopyRoundedIcon sx={{ fill: theme.textColor4 }} />}
          label="widgets"
        />

        <ActivityButton
          icon={<SearchRoundedIcon sx={{ fill: theme.textColor4 }} />}
          label="search"
        />

        {/* <ActivityButton
          icon={
            <CommitRoundedIcon
              sx={{ fill: theme.textColor4, rotate: "-45deg" }}
            />
          }
          label="sourceControl"
        />

        <ActivityButton
          icon={<DashboardRoundedIcon sx={{ fill: theme.textColor4 }} />}
          label="extensions"
        /> */}
      </div>

      <div>
        {/* <ActivityButton
          icon={<VerticalSplitRoundedIcon sx={{ fill: theme.textColor4 }} />}
          label="showWebsite"
          onClick={() => setShowWebsiteView((e) => !e)}
        /> */}
        <ActivityButton
          icon={
            props.signedIn ? (
              <div
                style={{
                  height: 35,
                  width: 35,
                  borderRadius: 20,
                  overflow: "hidden",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Widget
                  src={props.widgets.profileImage}
                  props={{
                    accountId: account.accountId,
                    className: "d-inline-block",
                  }}
                />
              </div>
            ) : (
              <img
                height={30}
                src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
                alt="profile-art"
              />
            )
          }
          label="profile"
        />

        {/* <img
          height={30}
          src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
          alt="profile-art"
        /> */}

        <ActivityButton
          icon={<SettingsRoundedIcon sx={{ fill: theme.textColor4 }} />}
          label="settings"
        />
      </div>
    </div>
  );
}

const ActivityButton = ({ icon, label, onClick }) => {
  const { theme } = useContext(ThemeContext);
  const { selectedActivity, setSelectedActivity } = useContext(EditorContext);

  return (
    <Tooltip title={camelToNormal(label)} placement="right">
      <ButtonBase
        className="buttonBase"
        sx={{
          width: 50,
          height: 50,

          "&:hover": {
            backgroundColor:
              theme.name === "dark"
                ? "rgba(256,256,256,.05)"
                : "rgba(0,0,0,.05)",
          },
          backgroundColor:
            selectedActivity === label
              ? theme.name === "dark"
                ? "rgba(256,256,256,.05)!important"
                : "rgba(0,0,0,.05)!important"
              : "transparent",
          opacity: selectedActivity === label ? 1 : 0.5,
        }}
        onClick={() =>
          onClick
            ? onClick()
            : setSelectedActivity((e) => (e === label ? "" : label))
        }
      >
        {icon}
      </ButtonBase>
    </Tooltip>
  );
};
