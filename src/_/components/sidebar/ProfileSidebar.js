import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useContext } from "react";

import { Widget, useAccount } from "near-social-vm";
import LogoutIcon from "@mui/icons-material/Logout";

import CustomButton from "../custom/CustomButton";
import { ThemeContext } from "../../context/ThemeContext";
import { AuthContext } from "../../context/AuthContext";

export default function ProfileSidebar({ appProps, logOut, requestSignIn }) {
  const account = useAccount();
  const { logout } = useContext(AuthContext);
  const { theme } = useContext(ThemeContext);

  return (
    <div
      style={{
        minWidth: 250,
        overflowX: "auto",
        height: "calc(100vh - 25px)",
        paddingBottom: 16,
      }}
    >
      <div
        style={{
          height: 50,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          paddingInline: 10,
          borderBottom: `1px solid ${theme.borderColor}`,
        }}
      >
        <Typography
          variant="h6"
          sx={{ fontWeight: 500, color: theme.textColor }}
        >
          Profile
        </Typography>
      </div>

      {account.accountId && (
        <Widget
          src={appProps.widgets.profilePageSidebar}
          props={{ accountId: account.accountId, theme: theme }}
        />
      )}

      <Box
        sx={{
          display: "flex",
          gap: 2,
          justifyContent: "center",
          width: "100%",
          px: 2,
          pt: 2,
        }}
      >
        {account.accountId ? (
          <CustomButton
            sx={{
              flex: 1,
              height: 40,
              bgcolor: "transparent",
              border: `1px ${theme.buttonColor} solid`,
              color: theme.buttonColor,

              "&:hover": {
                color: theme.buttonColor,
                bgcolor: theme.buttonColor + 33,
              },
            }}
            variant="outlined"
            startIcon={<LogoutIcon />}
            onClick={() => {
              logOut();
            }}
          >
            Disconnect
          </CustomButton>
        ) : (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <div
              style={{
                maxWidth: 250,
                width: 250,
                minWidth: "150",

                aspectRatio: 1 / 1,
                objectFit: "cover",
                borderRadius: "50%",

                outline: `2px solid ${theme.textColor3}`,
                overflow: "hidden",
              }}
            >
              <Widget src={appProps?.widgets?.profileImage} />
            </div>
            <div
              style={{
                paddingTop: 16,
                paddingBottom: 8,
                textAlign: "center",
              }}
            >
              <Typography variant="h3" style={{ color: theme.textColor }}>
                <Widget src={appProps?.widgets?.profileName} />
              </Typography>
              <Typography variant="p1" style={{ color: theme.textColor3 }}>
                @{account.accountId || "Not_logged_in"}
              </Typography>
            </div>

            <CustomButton
              style={{
                height: 40,
                backgroundColor: theme.buttonColor,
                paddingInline: 24,
                marginTop: 16,
                width: "100%",
              }}
              onClick={() => {
                requestSignIn();
              }}
            >
              Connect
            </CustomButton>

            {/* <CustomButton
              sx={{
                mt: 2,
                flex: 1,
                height: 40,
                bgcolor: "transparent",
                border: `1px ${theme.buttonColor} solid`,
                color: theme.buttonColor,

                width: "100%",

                "&:hover": {
                  color: theme.buttonColor,
                  bgcolor: theme.buttonColor + 33,
                },
              }}
              variant="outlined"
              startIcon={<LogoutIcon />}
              onClick={() => {
                logout();
              }}
            >
              Sign Out
            </CustomButton> */}
          </Box>
        )}
      </Box>
    </div>
  );
}
