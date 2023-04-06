import {
  Box,
  Button,
  ButtonBase,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import React, { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import { EditorContext } from "../../context/EditorContext";

export default function EnvironmentlSidebar() {
  const { theme } = useContext(ThemeContext);

  return (
    <div>
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
          Environments
        </Typography>
      </div>

      <div>
        <ChangeEnvButton />
      </div>
    </div>
  );
}

const ChangeEnvButton = () => {
  const { theme } = useContext(ThemeContext);
  const { NetworkId, setNetworkId } = useContext(EditorContext);

  const styles = {
    buttonStyle: {
      flex: 1,
      width: "100%",
      py: 1.5,
      borderRadius: 0.5,
      transition: `all .2s ease-in-out`,
    },
  };
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "space-between",
        paddingInline: 1,
        borderBottom: `1px solid ${theme.borderColor}`,
        // height: 50,
      }}
    >
      <Typography
        variant="p1"
        sx={{ fontWeight: 500, color: theme.textColor2, pt: 1.75, pb: 1 }}
      >
        Networks:
      </Typography>

      <Box
        sx={{
          display: "grid",
          width: "100%",
          gridTemplateColumns: "1fr 1fr",
          gap: 1,
          pb: 1,
        }}
      >
        <ButtonBase
          sx={{
            ...styles.buttonStyle,
            backgroundColor:
              NetworkId === "testnet"
                ? theme.buttonColor + "!important"
                : theme.textColor + 11,

            "&:hover": {
              backgroundColor: theme.textColor + 33,
            },
          }}
          onClick={() => setNetworkId("testnet")}
        >
          <Typography
            variant="h6"
            fontWeight={500}
            sx={{
              color:
                NetworkId === "testnet"
                  ? theme.buttonTextColor
                  : theme.textColor3,
            }}
          >
            Testnet
          </Typography>
        </ButtonBase>
        <ButtonBase
          sx={{
            ...styles.buttonStyle,
            backgroundColor:
              NetworkId === "mainnet"
                ? theme.buttonColor + "!important"
                : theme.textColor + 11,

            "&:hover": {
              backgroundColor: theme.textColor + 22,
            },
          }}
          onClick={() => setNetworkId("mainnet")}
        >
          <Typography
            variant="h6"
            fontWeight={500}
            sx={{
              color:
                NetworkId === "mainnet"
                  ? theme.buttonTextColor
                  : theme.textColor3,
            }}
          >
            Mainnet
          </Typography>
        </ButtonBase>
      </Box>
    </Box>
  );
};
