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

export default function ProfileSidebar() {
  const account = useAccount();
  const { theme } = useContext(ThemeContext);

  return (
    <div style={{ minWidth: 250 }}>
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
            style={{ paddingTop: 16, paddingBottom: 8, textAlign: "center" }}
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
            gap: 1,
            flexWrap: "wrap",
          }}
        >
          <CustomButton>Edit Profile</CustomButton>
          <Button variant="outlined" startIcon={<LogoutIcon />}>
            Sign Out
          </Button>
        </Box>
      </Box>
    </div>
  );
}
