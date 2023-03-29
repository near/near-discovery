import { MenuItem, Select, Switch, Typography } from "@mui/material";

import { Box } from "@mui/system";
import React, { useContext } from "react";
import { EditorContext } from "../../../../context/EditorContext";
import { ThemeContext } from "../../../../context/ThemeContext";

export default function SettingsSidebar() {
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
          Settings
        </Typography>
      </div>

      <div>
        <EnableDarkModeButton />
        <ChangeEditorFontSizeButton />
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
        Environment
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

const ChangeEditorFontSizeButton = () => {
  const { theme, editorFontSize, setEditorFontSize } = useContext(ThemeContext);

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
        Editor Font Size
      </Typography>

      <div className="SelectContainer">
        <Select
          id="asddasasd"
          size="small"
          value={editorFontSize}
          onChange={(e) => setEditorFontSize(e.target.value)}
          displayEmpty
          inputProps={{ classes: { icon: "white-icon" } }}
          sx={{ outline: "none", border: "none", color: theme.textColor }}
        >
          <MenuItem value="10px">10px</MenuItem>
          <MenuItem value="12px">12px</MenuItem>
          <MenuItem value="14px">14px</MenuItem>
          <MenuItem value="16px">16px</MenuItem>
          <MenuItem value="20px">20px</MenuItem>
          <MenuItem value="24px">24px</MenuItem>
          <MenuItem value="28px">28px</MenuItem>
          <MenuItem value="32px">32px</MenuItem>
          <MenuItem value="36px">36px</MenuItem>
          <MenuItem value="40px">40px</MenuItem>
          <MenuItem value="44px">44px</MenuItem>
          <MenuItem value="48px">48px</MenuItem>
          <MenuItem value="52px">52px</MenuItem>
        </Select>
      </div>
    </Box>
  );
};

const EnableDarkModeButton = () => {
  const { theme, enableDarkMode, setEnableDarkMode } = useContext(ThemeContext);

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
        Enable Dark Mode
      </Typography>

      <Switch
        checked={enableDarkMode}
        onChange={(event) => setEnableDarkMode(event.target.checked)}
      />
    </Box>
  );
};
