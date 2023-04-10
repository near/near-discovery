import React, { useContext } from "react";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import HelpOutlineRoundedIcon from "@mui/icons-material/HelpOutlineRounded";
import LibraryAddRoundedIcon from "@mui/icons-material/LibraryAddRounded";
import WifiRoundedIcon from "@mui/icons-material/WifiRounded";
import NotificationsNoneRoundedIcon from "@mui/icons-material/NotificationsNoneRounded";
import MenuBookOutlinedIcon from "@mui/icons-material/MenuBookOutlined";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";

import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";

import camelToNormal from "../libs/camelToNormal";
import { ThemeContext } from "../context/ThemeContext";
import { EditorContext } from "../context/EditorContext";

import DiamondRoundedIcon from "@mui/icons-material/DiamondRounded";
import { Box, ButtonBase, Divider, Tooltip } from "@mui/material";
import { useHistory, useLocation } from "react-router-dom";
import { Widget, useAccount } from "near-social-vm";
import { AuthContext } from "../context/AuthContext";

export default function Activitybar(props) {
  const history = useHistory();
  const { accountId } = useAccount();
  const { theme, enableDarkMode, setEnableDarkMode } = useContext(ThemeContext);
  const { setSelectedActivity, Widgets } = useContext(EditorContext);
  const { uesr, logout } = useContext(AuthContext);

  console.error = () => {};

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
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill={theme.textColor4}
              width="1.4em"
              height="1.4em"
            >
              <path
                fillRule="evenodd"
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
          to="/changeNetwork"
          onClick={() => {
            history.push("/changeNetwork");
            setSelectedActivity((e) =>
              e === "changeNetwork" ? "" : "changeNetwork"
            );
          }}
        />
        {process.env.FEATURE_TOGGLE && (
          <>
            <ActivityButton
              icon={
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M22.4179 9.82238C22.6233 9.21331 22.7281 8.5756 22.7282 7.9337C22.7281 6.87153 22.4413 5.82854 21.8974 4.91194C20.8044 3.03474 18.7769 1.87578 16.5826 1.87578C16.1503 1.87578 15.7192 1.92083 15.2965 2.01017C14.7279 1.37812 14.03 0.872169 13.2488 0.525675C12.4676 0.179182 11.6208 1.84729e-05 10.7643 0H10.7259L10.7114 8.37426e-05C8.05372 8.37426e-05 5.6968 1.6922 4.87979 4.18675C4.03408 4.35766 3.23513 4.70485 2.53643 5.20509C1.83772 5.70533 1.25538 6.34707 0.828385 7.08735C0.286101 8.00946 0.000331838 9.05656 0 10.1227C0.000207242 11.621 0.563881 13.0659 1.58187 14.1776C1.37638 14.7867 1.27158 15.4244 1.27149 16.0663C1.27159 17.1285 1.55833 18.1715 2.10226 19.0881C2.74908 20.1993 3.73686 21.079 4.92316 21.6005C6.10946 22.1221 7.43298 22.2583 8.70285 21.9897C9.27148 22.6218 9.96943 23.1278 10.7507 23.4743C11.5319 23.8208 12.3788 23.9999 13.2353 24H13.2738L13.2894 23.9999C15.9486 23.9999 18.3047 22.3077 19.1217 19.8109C19.9674 19.6399 20.7664 19.2927 21.4651 18.7925C22.1638 18.2922 22.7462 17.6505 23.1732 16.9102C23.7149 15.9889 24.0001 14.9427 24 13.8776C23.9998 12.3793 23.4361 10.9344 22.4181 9.82271L22.4179 9.82238ZM13.2753 22.431H13.269C12.205 22.4306 11.1747 22.0623 10.3574 21.3901C10.4059 21.3643 10.4539 21.3375 10.5013 21.3096L15.3444 18.5494C15.4652 18.4815 15.5657 18.3833 15.6356 18.2646C15.7056 18.146 15.7424 18.0113 15.7425 17.874V11.1325L17.7895 12.2987C17.8003 12.304 17.8095 12.3119 17.8165 12.3215C17.8234 12.3312 17.8278 12.3424 17.8294 12.3541V17.9333C17.8266 20.4138 15.7894 22.4259 13.2753 22.431ZM3.48168 18.3038C3.08164 17.6213 2.87087 16.8469 2.8706 16.0584C2.8706 15.8013 2.89336 15.5435 2.93769 15.2901C2.9737 15.3114 3.03654 15.3492 3.08163 15.3748L7.92473 18.135C8.04548 18.2046 8.18279 18.2412 8.3226 18.2412C8.46242 18.2412 8.59971 18.2045 8.72042 18.1349L14.6333 14.7662V17.0987L14.6334 17.1028C14.6334 17.114 14.6308 17.1251 14.6257 17.1351C14.6206 17.1452 14.6132 17.1539 14.6041 17.1607L9.7082 19.9498C9.01545 20.3432 8.23022 20.5504 7.43093 20.5506C6.63079 20.5505 5.84475 20.3428 5.1516 19.9484C4.45845 19.554 3.88257 18.9868 3.48168 18.3035V18.3038ZM2.20756 7.87161C2.73948 6.95999 3.57939 6.26197 4.58028 5.89973C4.58028 5.94087 4.5779 6.01376 4.5779 6.06437V11.585L4.57782 11.5895C4.57784 11.7266 4.61463 11.8612 4.68444 11.9797C4.75426 12.0982 4.85462 12.1964 4.97532 12.2642L10.8882 15.6324L8.84126 16.7987C8.83117 16.8053 8.81958 16.8093 8.80753 16.8104C8.79549 16.8114 8.78336 16.8096 8.77223 16.8049L3.87579 14.0134C3.18361 13.6178 2.60897 13.0496 2.20947 12.3657C1.80996 11.6819 1.59963 10.9065 1.59953 10.1172C1.59984 9.32917 1.80958 8.55497 2.20781 7.87186L2.20756 7.87161ZM19.0262 11.7333L13.1133 8.3647L15.1603 7.19887C15.1704 7.19229 15.182 7.18829 15.1941 7.1872C15.2061 7.18612 15.2183 7.188 15.2294 7.19267L20.1257 9.98182C20.8185 10.3769 21.3937 10.9447 21.7937 11.6285C22.1937 12.3122 22.4044 13.0878 22.4045 13.8772C22.4045 15.7616 21.2129 17.4476 19.4211 18.0984V12.4128C19.4213 12.4107 19.4213 12.4085 19.4213 12.4064C19.4213 12.2698 19.3847 12.1357 19.3154 12.0175C19.246 11.8994 19.1462 11.8013 19.0262 11.7333ZM21.0637 8.70765C21.0161 8.67887 20.9681 8.65066 20.9198 8.62302L16.0767 5.86269C15.956 5.79327 15.8187 5.75666 15.6789 5.75661C15.5392 5.75666 15.4019 5.79327 15.2812 5.86269L9.36819 9.23141V6.89882L9.3681 6.8948C9.3681 6.87201 9.37906 6.85056 9.39748 6.8369L14.2934 4.05009C14.9859 3.65616 15.7712 3.44878 16.5706 3.44874C19.0879 3.44874 21.1294 5.46302 21.1294 7.94685C21.1293 8.20174 21.1073 8.45617 21.0637 8.7074V8.70765ZM8.25524 12.8651L6.20775 11.6988C6.19701 11.6935 6.18775 11.6857 6.1808 11.6761C6.17386 11.6664 6.16943 11.6552 6.16793 11.6434V6.0642C6.16903 3.58171 8.21048 1.56911 10.7267 1.56911C11.7924 1.56933 12.8244 1.93769 13.6436 2.61027C13.6068 2.63013 13.5425 2.66515 13.4998 2.6907L8.65665 5.45095C8.53581 5.51879 8.43533 5.61699 8.36542 5.73556C8.29551 5.85414 8.25866 5.98886 8.25863 6.12604V6.13048L8.25524 12.8651ZM9.36725 10.4995L12.0008 8.99865L14.6343 10.4985V13.4991L12.0008 14.999L9.36725 13.4991V10.4995Z"
                    fill={theme.textColor4}
                  />
                </svg>
              }
              label="AI Collaboration"
              to="/chat"
              onClick={() => {
                history.push("/chat");
                setSelectedActivity((e) => (e === "chat" ? "" : "chat"));
              }}
            />

            <ActivityButton
              icon={
                <MenuBookOutlinedIcon
                  sx={{ fill: theme.textColor4, fontSize: "1.5rem" }}
                />
              }
              label="learn"
              to="/learn"
              onClick={() => {
                history.push("/learn");
                setSelectedActivity((e) => (e === "learn" ? "" : "learn"));
              }}
            />
          </>
        )}
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
            onClick={() => {
              history.push("/notifications");
              setSelectedActivity((e) =>
                e === "notifications" ? "" : "notifications"
              );
            }}
            sx={{ opacity: 1 }}
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
          onClick={() => {
            history.push("/settings");
            setSelectedActivity((e) => (e === "settings" ? "" : "settings"));
          }}
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

        {uesr && (
          <>
            <Divider sx={{ my: 1 }} />

            <ActivityButton
              icon={
                <LogoutRoundedIcon
                  sx={{ fill: theme.textColor4, fontSize: "1.5rem" }}
                />
              }
              label="logout"
              onClick={() => {
                logout();
              }}
            />
          </>
        )}
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
