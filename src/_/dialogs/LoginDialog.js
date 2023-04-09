import React from "react";

import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import LoginGithub from "react-login-github";

import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { useLocation } from "react-router-dom";

export default function LoginDialog() {
  const { pathname } = useLocation();

  const { showDialog, setShowDialog, saveAuth } = useContext(AuthContext);
  const { theme } = useContext(ThemeContext);

  const onSuccess = (response) => {
    saveAuth(response);
    console.log(response);
  };
  const onFailure = (response) => console.error(response);

  return (
    <Dialog
      //   onClose={() => setShowDialog(false)}
      open={showDialog && pathname !== "/"}
      fullWidth={true}
      maxWidth="xs"
      PaperProps={{ style: { backgroundColor: theme.ui, borderRadius: 4 } }}
    >
      <DialogTitle sx={{ padding: "16px 16px 16px 16px" }}>
        <Typography
          variant="h4"
          sx={{ fontWeight: 600, color: theme.textColor2, textAlign: "center" }}
        >
          Please login NEARpad
        </Typography>
      </DialogTitle>

      <DialogContent sx={{ padding: "16px", width: "100%", mt: 2 }}>
        <LoginGithub
          className="loginGithub"
          clientId="d8dcc012aeb56c3c6d7f"
          onSuccess={onSuccess}
          onFailure={onFailure}
        >
          <Button
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: 45,
              gap: 1,
              textTransform: "none",
              color: theme.textColor,
              borderRadius: 0.5,

              backgroundColor: theme.textColor,

              "&:hover": {
                backgroundColor: theme.textColor2,
              },
            }}
          >
            <svg aria-label="github" height="20" viewBox="0 0 14 14" width="20">
              <path
                d="M7 .175c-3.872 0-7 3.128-7 7 0 3.084 2.013 5.71 4.79 6.65.35.066.482-.153.482-.328v-1.181c-1.947.415-2.363-.941-2.363-.941-.328-.81-.787-1.028-.787-1.028-.634-.438.044-.416.044-.416.7.044 1.071.722 1.071.722.635 1.072 1.641.766 2.035.59.066-.459.24-.765.437-.94-1.553-.175-3.193-.787-3.193-3.456 0-.766.262-1.378.721-1.881-.065-.175-.306-.897.066-1.86 0 0 .59-.197 1.925.722a6.754 6.754 0 0 1 1.75-.24c.59 0 1.203.087 1.75.24 1.335-.897 1.925-.722 1.925-.722.372.963.131 1.685.066 1.86.46.48.722 1.115.722 1.88 0 2.691-1.641 3.282-3.194 3.457.24.219.481.634.481 1.29v1.926c0 .197.131.415.481.328C11.988 12.884 14 10.259 14 7.175c0-3.872-3.128-7-7-7z"
                fill={theme.buttonTextColor}
                fill-rule="nonzero"
              ></path>
            </svg>

            <Typography
              variant="h6"
              sx={{ fontWeight: 500, color: theme.buttonTextColor }}
            >
              Continue with GitHub
            </Typography>
          </Button>
        </LoginGithub>
      </DialogContent>
    </Dialog>
  );
}
