import { Box, MenuItem, Select, Typography } from "@mui/material";
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

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        paddingInline: 1,
        borderBottom: `1px solid ${theme.borderColor}`,
        height: 50,
      }}
    >
      <Typography
        variant="p1"
        sx={{ fontWeight: 500, color: theme.textColor2 }}
      >
        Networks
      </Typography>

      <div className="SelectContainer">
        <Select
          size="small"
          value={NetworkId}
          onChange={(e) => setNetworkId(e.target.value)}
          displayEmpty
          inputProps={{ classes: { icon: "white-icon" } }}
          sx={{ outline: "none", border: "none", color: theme.textColor }}
        >
          <MenuItem value="testnet">Testnet</MenuItem>
          <MenuItem value="mainnet">Mainnet</MenuItem>
        </Select>
      </div>
    </Box>
  );
};
