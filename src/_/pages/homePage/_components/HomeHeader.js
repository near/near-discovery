import { Box, Button, Divider } from "@mui/material";
import React from "react";
import { ThemeContext, theme } from "../../../context/ThemeContext";
import { useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";
import { Link, useHistory } from "react-router-dom";
import DiamondRoundedIcon from "@mui/icons-material/DiamondRounded";

export default function HomeHeader() {
  const { theme, bp } = useContext(ThemeContext);
  const { uesr } = useContext(AuthContext);

  return (
    <Box
      sx={{
        position: "absolute",
        top: 0,
        left: 0,
        zIndex: 999,
        width: "100%",
        minHeight: 60,

        display: "flex",
        justifyContent: "center",
        alignItems: "center",

        // backgroundColor: "red",
      }}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: "90vw",
          // maxWidth: 1250,
          display: "flex",
          justifyContent: "space-between",
          flexDirection: bp ? "column" : "row",
          pt: bp ? 2 : 0,
          gap: 1,
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <DiamondRoundedIcon
            sx={{ fill: theme.textColor4, fontSize: "1.8rem" }}
          />
        </Box>

        <Box
          sx={{
            display: "flex",
            gap: 1,
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          {/* <Link to="editor" style={{ textDecoration: "none" }}>
            <HeaderButton>Editor</HeaderButton>
          </Link>

          <Link to="learn" style={{ textDecoration: "none" }}>
            <HeaderButton>Learn</HeaderButton>
          </Link>

          <Link to="#" style={{ textDecoration: "none" }}>
            <HeaderButton>Documentation</HeaderButton>
          </Link> */}

          {!uesr && (
            <>
              {/* <Divider orientation="vertical" /> */}

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
                    textTransform: "none",
                    textDecoration: "none",

                    "&:hover": {
                      backgroundColor: theme.buttonColor + 22,
                    },
                  }}
                >
                  Login
                </Button>
              </a>
            </>
          )}
        </Box>
      </Box>
    </Box>
  );
}

const HeaderButton = (props) => {
  const { theme } = useContext(ThemeContext);

  return (
    <Button
      sx={{
        borderRadius: 0.5,
        px: 2,
        // backgroundColor: theme.textColor + 11,
        color: theme.textColor,
        border: "none",
        textTransform: "none",
        textDecoration: "none",

        "&:hover": {
          color: theme.buttonColor,
          backgroundColor: theme.buttonColor + 22,
        },
      }}
      {...props}
    >
      {props.children}
    </Button>
  );
};
