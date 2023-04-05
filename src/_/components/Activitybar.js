import React, { useContext } from "react";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import HelpOutlineRoundedIcon from "@mui/icons-material/HelpOutlineRounded";
import LibraryAddRoundedIcon from "@mui/icons-material/LibraryAddRounded";
import WifiRoundedIcon from "@mui/icons-material/WifiRounded";

import camelToNormal from "../libs/camelToNormal";
import { ThemeContext } from "../context/ThemeContext";
import { EditorContext } from "../context/EditorContext";

import DiamondRoundedIcon from "@mui/icons-material/DiamondRounded";
import { ButtonBase, Tooltip } from "@mui/material";
import { useHistory, useLocation } from "react-router-dom";
import { Widget, useAccount } from "near-social-vm";

export default function Activitybar(props) {
  const history = useHistory();
  const account = useAccount();
  const { theme } = useContext(ThemeContext);
  const { setSelectedActivity } = useContext(EditorContext);

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
        <ActivityButton
          icon={
            <LibraryAddRoundedIcon
              sx={{ fill: theme.textColor4, fontSize: "1.5rem" }}
            />
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
            history.push("/environments");
            setSelectedActivity((e) =>
              e === "changeNetwork" ? "" : "changeNetwork"
            );
          }}
        />
      </div>

      <div>
        <ActivityButton
          icon={
            <HelpOutlineRoundedIcon
              sx={{ fill: theme.textColor4, fontSize: "1.5rem" }}
            />
          }
          label="Documentation"
          // onClick={() => window.open("https://docs.near.org/discovery")}
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
