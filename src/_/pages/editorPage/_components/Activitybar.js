import React, { useContext } from "react";
import ContentCopyRoundedIcon from "@mui/icons-material/ContentCopyRounded";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
// import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import HelpOutlineRoundedIcon from "@mui/icons-material/HelpOutlineRounded";

import camelToNormal from "../../../libs/camelToNormal";
import { ThemeContext } from "../../../context/ThemeContext";
import { EditorContext } from "../../../context/EditorContext";

import DiamondRoundedIcon from "@mui/icons-material/DiamondRounded";
import { ButtonBase, Tooltip } from "@mui/material";
import { useHistory } from "react-router-dom";
import { Widget, useAccount } from "near-social-vm";

export default function Activitybar(props) {
  const history = useHistory();
  const account = useAccount();
  const { theme } = useContext(ThemeContext);

  return (
    <div
      style={{
        minHeight: "max(calc(100vh - 25px), 700px)",
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
          onClick={() => history.push("/edit")}
        />

        <ActivityButton
          icon={<SearchRoundedIcon sx={{ fill: theme.textColor4 }} />}
          label="search"
          onClick={() => history.push("/search")}
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
          icon={<HelpOutlineRoundedIcon sx={{ fill: theme.textColor4 }} />}
          label="Documentation"
          onClick={() => {}}
          // to=""
        />

        <ActivityButton
          icon={
            <SettingsOutlinedIcon
              sx={{ fill: theme.textColor4, fontSize: "1.4rem" }}
            />
          }
          label="settings"
        />

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
          sx={{ opacity: 1 }}
        />

        {/* <img
          height={30}
          src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
          alt="profile-art"
        /> */}
      </div>
    </div>
  );
}

const ActivityButton = ({ icon, label, onClick, sx }) => {
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
          ...sx,
        }}
        onClick={() => {
          setSelectedActivity((e) => (e === label ? "" : label));
          onClick && onClick();
        }}
      >
        {icon}
      </ButtonBase>
    </Tooltip>
  );
};
