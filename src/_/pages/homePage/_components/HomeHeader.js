import { Box, Button } from "@mui/material";
import React from "react";
import { ThemeContext, theme } from "../../../context/ThemeContext";
import { useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";
import { useHistory } from "react-router-dom";

export default function HomeHeader() {
  const { theme } = useContext(ThemeContext);
  const { uesr } = useContext(AuthContext);

  return (
    <Box
      sx={{
        position: "absolute",
        top: 0,
        left: 0,
        zIndex: 999,
        width: "100%",
        height: 60,

        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: "90vw",
          // maxWidth: 1250,
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <div>
          {!uesr && (
            <a
              style={{ textDecoration: "none" }}
              href={`https://github.com/login/oauth/authorize?scope=user&client_id=${process.env.GITHUB_CLIENT_ID}&redirect_uri=${process.env.GITHUB_REDIRECT_URL}`}
            >
              <Button
                sx={{
                  borderRadius: 0.5,
                  px: 2,
                  backgroundColor: theme.buttonColor + 11,
                  color: theme.buttonColor,
                  border: "none",

                  "&:hover": {
                    backgroundColor: theme.buttonColor + 22,
                  },
                }}
              >
                Login
              </Button>
            </a>
          )}
        </div>
      </Box>
    </Box>
  );
}
