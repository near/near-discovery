import React, { useContext } from "react";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import HelpOutlineRoundedIcon from "@mui/icons-material/HelpOutlineRounded";
import LibraryAddRoundedIcon from "@mui/icons-material/LibraryAddRounded";
import WifiRoundedIcon from "@mui/icons-material/WifiRounded";
import NotificationsNoneRoundedIcon from "@mui/icons-material/NotificationsNoneRounded";

import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";

import camelToNormal from "../libs/camelToNormal";
import { ThemeContext } from "../context/ThemeContext";
import { EditorContext } from "../context/EditorContext";

import DiamondRoundedIcon from "@mui/icons-material/DiamondRounded";
import { ButtonBase, Tooltip } from "@mui/material";
import { useHistory, useLocation } from "react-router-dom";
import { Widget, useAccount } from "near-social-vm";

export default function Activitybar(props) {
  const history = useHistory();
  const { accountId } = useAccount();
  const { theme, enableDarkMode, setEnableDarkMode } = useContext(ThemeContext);
  const { setSelectedActivity, Widgets } = useContext(EditorContext);

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
          icon={
            <DiamondRoundedIcon
              sx={{ fill: theme.textColor4, fontSize: "1.8rem" }}
            />
          }
          label="discover"
          to="/discover"
          onClick={() => {
            history.push("/discover");
            setSelectedActivity("");
          }}
        />
        {/* // <LibraryAddRoundedIcon
            //   sx={{ fill: theme.textColor4, fontSize: "1.5rem" }}
            // /> */}
        <ActivityButton
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill={theme.textColor4}
              width="1.4em"
              height="1.4em"
            >
              <path
                fill-rule="evenodd"
                d="M8.5 0h9L22 4.5v12.068L20.705 18H16v4.568L14.568 24H2.5L1 22.568V7.5L2.5 6H7V1.5L8.5 0zM16 1.5V6h4.5v10.5h-12v-15H16zm3.879 3L17.5 2.121V4.5h2.379zM7 7.5v9.068L8.5 18h6v4.5h-12v-15H7z"
              ></path>
            </svg>
          }
          label="create widgets"
          to="/editor"
          onClick={() => {
            history.push("/editor");
            setSelectedActivity((e) => (e === "widgets" ? "" : "widgets"));
          }}
        />

        <ActivityButton
          icon={
            <SearchRoundedIcon
              sx={{ fill: theme.textColor4, fontSize: "1.5rem" }}
            />
          }
          label="search widgets"
          to="/search"
          onClick={() => {
            history.push("/search");
            setSelectedActivity((e) => (e === "search" ? "" : "search"));
          }}
        />

        <ActivityButton
          icon={
            <WifiRoundedIcon
              sx={{ fill: theme.textColor4, fontSize: "1.5rem" }}
            />
          }
          label="changeNetwork"
          to="/environments"
          onClick={() => {
            // history.push("/environments");
            setSelectedActivity((e) =>
              e === "changeNetwork" ? "" : "changeNetwork"
            );
          }}
        />
      </div>

      <div>
        {accountId && (
          <ActivityButton
            icon={
              <Widget
                src={Widgets.activitybarNotificationButton}
                props={{ theme }}
              />
            }
            label="notifications"
          />
        )}

        <ActivityButton
          icon={
            <HelpOutlineRoundedIcon
              sx={{ fill: theme.textColor4, fontSize: "1.5rem" }}
            />
          }
          label="Documentation"
          onClick={() => {}}
        />

        <ActivityButton
          icon={
            <SettingsOutlinedIcon
              sx={{ fill: theme.textColor4, fontSize: "1.5rem" }}
            />
          }
          label="settings"
        />

        <ActivityButton
          icon={
            enableDarkMode ? (
              <LightModeIcon
                sx={{ fill: theme.textColor4, fontSize: "1.5rem" }}
              />
            ) : (
              <DarkModeIcon
                sx={{ fill: theme.textColor4, fontSize: "1.5rem" }}
              />
            )
          }
          label={enableDarkMode ? "Enable Light Mode" : "Enable Dark Mode"}
          onClick={() => {
            setEnableDarkMode((e) => !e);
          }}
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
                    accountId: accountId,
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
          sx={{ opacity: 1 }}
          label="profile"
          to="/profile"
          onClick={() => {
            history.push("/profile");
            setSelectedActivity((e) => (e === "profile" ? "" : "profile"));
          }}
        />
      </div>
    </div>
  );
}

const ActivityButton = ({ icon, label, to, onClick, sx }) => {
  const { theme } = useContext(ThemeContext);
  const { selectedActivity, setSelectedActivity } = useContext(EditorContext);
  const { pathname } = useLocation();

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
            pathname.includes(to) || selectedActivity === label
              ? theme.name === "dark"
                ? "rgba(256,256,256,.05)!important"
                : "rgba(0,0,0,.05)!important"
              : "transparent",
          opacity:
            pathname.includes(to) || selectedActivity === label ? 1 : 0.5,
          ...sx,
        }}
        onClick={() => {
          onClick
            ? onClick()
            : setSelectedActivity((e) => (e === label ? "" : label));
        }}
      >
        {icon}
      </ButtonBase>
    </Tooltip>
  );
};
