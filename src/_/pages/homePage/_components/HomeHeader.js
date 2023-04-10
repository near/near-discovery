import { Box, Button } from "@mui/material";
import React from "react";
import { ThemeContext, theme } from "../../../context/ThemeContext";
import { useContext } from "react";
import LoginGithub from "react-login-github";
import { AuthContext } from "../../../context/AuthContext";

export default function HomeHeader() {
  const { theme } = useContext(ThemeContext);
  const { uesr, saveAuth } = useContext(AuthContext);

  const onSuccess = (response) => {
    saveAuth(response);
    console.log(response);
    window.location.hash = "#/editor";
  };
  const onFailure = (response) => console.error(response);

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
          maxWidth: 1250,
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        {!uesr && (
          <div>
            <LoginGithub
              className="loginGithub"
              clientId="d8dcc012aeb56c3c6d7f"
              onSuccess={onSuccess}
              onFailure={onFailure}
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
            </LoginGithub>
          </div>
        )}
      </Box>
    </Box>
  );
}
