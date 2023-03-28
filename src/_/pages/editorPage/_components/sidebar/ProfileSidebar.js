import { IconButton, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useContext } from "react";
import TwitterIcon from "@mui/icons-material/Twitter";
import FacebookRoundedIcon from "@mui/icons-material/FacebookRounded";
import LanguageRoundedIcon from "@mui/icons-material/LanguageRounded";
import Button from "@mui/material/Button";

import { Widget, useAccount } from "near-social-vm";
import LogoutIcon from "@mui/icons-material/Logout";

import CustomButton from "../../../../components/custom/CustomButton";
import { ThemeContext } from "../../../../context/ThemeContext";

export default function ProfileSidebar({ logOut, requestSignIn }) {
  const account = useAccount();
  const { theme } = useContext(ThemeContext);

  return (
    <div style={{ minWidth: 250 }}>
      {account.accountId ? (
        <>
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

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              padding: 2,
              gap: 2,

              justifyContent: "center",
              alignItems: "center",
            }}
          >
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
                <Widget src="eugenethedream/widget/ProfileImage" />
              </div>
              <div
                style={{
                  paddingTop: 16,
                  paddingBottom: 8,
                  textAlign: "center",
                }}
              >
                <Typography variant="h3" style={{ color: theme.textColor }}>
                  <Widget src="eugenethedream/widget/ProfileName" />
                </Typography>
                <Typography variant="p1" style={{ color: theme.textColor3 }}>
                  @{account.accountId || "Not_logged_in"}
                </Typography>
              </div>
            </Box>

            <Box
              sx={{
                display: "flex",
                gap: 1,
                flexWrap: "wrap",
              }}
            >
              <IconButton sx={{ color: theme.buttonColor }}>
                <TwitterIcon
                  sx={{ fill: theme.buttonColor, fontSize: "1.25rem" }}
                />
              </IconButton>

              <IconButton sx={{ color: theme.buttonColor }}>
                <FacebookRoundedIcon
                  sx={{ fill: theme.buttonColor, fontSize: "1.25rem" }}
                />
              </IconButton>

              <IconButton sx={{ color: theme.buttonColor }}>
                <LanguageRoundedIcon
                  sx={{ fill: theme.buttonColor, fontSize: "1.25rem" }}
                />
              </IconButton>
            </Box>

            <Box
              sx={{
                display: "flex",
                gap: 2,
                flexWrap: "wrap",
              }}
            >
              <CustomButton sx={{ height: 40 }}>Edit Profile</CustomButton>

              <CustomButton
                sx={{
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
                onClick={() => logOut()}
              >
                Sign Out
              </CustomButton>
            </Box>
          </Box>
        </>
      ) : (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "calc(100vh - 50px)",
          }}
        >
          <button
            className="btn btn-primary"
            style={{
              backgroundColor: theme.buttonColor,
              paddingInline: 16,
              borderRadius: 4,
              fontWeight: 500,
            }}
            onClick={() => requestSignIn()}
          >
            Login
          </button>
        </Box>
      )}
    </div>
  );
}
