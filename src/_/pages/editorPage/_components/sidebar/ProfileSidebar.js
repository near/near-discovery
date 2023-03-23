import { IconButton, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useContext } from "react";
import TwitterIcon from "@mui/icons-material/Twitter";
import FacebookRoundedIcon from "@mui/icons-material/FacebookRounded";
import LanguageRoundedIcon from "@mui/icons-material/LanguageRounded";

import CustomButton from "../../../../components/custom/CustomButton";
import { ThemeContext } from "../../../../context/ThemeContext";

export default function ProfileSidebar() {
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
          <img
            style={{
              maxWidth: 250,
              width: "100%",
              minWidth: "150",

              aspectRatio: 1 / 1,
              objectFit: "cover",
              borderRadius: "50%",

              outline: "2px solid #33323a",
            }}
            src="https://images.unsplash.com/photo-1677442992214-d5305c0bec2b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=715&q=80"
            alt="profile-art"
          />

          <div
            style={{ paddingTop: 16, paddingBottom: 8, textAlign: "center" }}
          >
            <Typography variant="h3" style={{ color: theme.textColor }}>
              Dann Petty
            </Typography>
            <Typography variant="p1" style={{ color: theme.textColor3 }}>
              @DannyPetty
            </Typography>
          </div>

          <Typography
            variant="p2"
            style={{
              color: theme.textColor2,
              textAlign: "center",
              maxWidth: 300,
            }}
          >
            Culpa excepteur duis in veniam ut velit ullamco anim ea. Ut magna
            exercitation minim labore do tempor.
          </Typography>
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

        <CustomButton>Edit Profile</CustomButton>

        {/* 
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 1,
              width: "100%",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Groups3Icon
                sx={{ fontSize: "1.25rem", color: theme.textColor2 }}
              />

              <Typography variant="p2" sx={{ color: theme.textColor2 }}>
                1 follower · 1 following
              </Typography>
            </Box>

            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <LocationOnRoundedIcon
                sx={{ fontSize: "1.25rem", color: theme.textColor2 }}
              />

              <Typography variant="p2" sx={{ color: theme.textColor2 }}>
                San Francisco, California
              </Typography>
            </Box>
          </Box> 
        */}
      </Box>
    </div>
  );
}
