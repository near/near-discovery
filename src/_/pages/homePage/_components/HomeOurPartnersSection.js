import React, { useContext } from "react";
import { ThemeContext } from "../../../context/ThemeContext";
import { Box, Typography } from "@mui/material";

export default function HomeOurPartnersSection() {
  const { theme, bp } = useContext(ThemeContext);

  const partners = [
    "https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg",
    "https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg",
    "https://upload.wikimedia.org/wikipedia/commons/3/39/Logo_of_Twitter%2C_Inc..svg",
    "https://upload.wikimedia.org/wikipedia/commons/0/0d/Nintendo.svg",
    "https://upload.wikimedia.org/wikipedia/commons/0/0e/Intel_logo_%282020%2C_light_blue%29.svg",
  ];

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: 5,
        py: bp ? 5 : 10,

        backgroundColor: theme.ui,
      }}
    >
      <Typography variant="h6" sx={{ color: theme.textColor3 }} align="center">
        Join 600K+ developers including
      </Typography>

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: 3,
          flexWrap: "wrap",
        }}
      >
        {partners?.map((item, index) => (
          <img
            key={index}
            variant="square"
            style={{
              height: 35,
              borderRadius: 4,
              objectFit: "cover",
              // filter: "grayscale(100%)",
            }}
            src={item}
            alt={item}
          />
        ))}
      </Box>
    </Box>
  );
}
