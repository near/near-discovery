import { Box, Typography } from "@mui/material";
import React from "react";
import { useContext } from "react";
import { ThemeContext } from "../../../context/ThemeContext";

export default function FeatureSection({
  content,
  title,
  description,

  image,
  rtl,
  sx,
}) {
  const { theme, bp } = useContext(ThemeContext);

  return (
    <Box
      sx={{
        width: "100%",

        display: "flex",
        justifyContent: "center",
        alignItems: "center",

        backgroundColor: rtl ? theme.backgroundColor : theme.ui,
        ...sx,
      }}
    >
      <Box
        sx={{
          maxWidth: 1250,
          px: 2,
          py: bp ? 5 : 10,
          display: "grid",
          gridTemplateColumns: bp ? "1fr" : rtl ? "1fr 2fr" : "2fr 1fr",
          gap: bp ? 2 : 4,
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {!rtl || bp ? (
          <>
            <LeftSide
              content={content}
              title={title}
              description={description}
            />
            <RightSide image={image} title={title} />
          </>
        ) : (
          <>
            <RightSide image={image} title={title} />
            <LeftSide
              content={content}
              title={title}
              description={description}
            />
          </>
        )}
      </Box>
    </Box>
  );
}

const LeftSide = ({ content, title, description }) => {
  const { theme } = useContext(ThemeContext);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
      {content ? (
        content
      ) : (
        <>
          <Typography sx={{ color: theme.textColor }} variant="h2">
            {title}
          </Typography>
          <Typography
            sx={{ color: theme.textColor3 }}
            variant="p"
            dangerouslySetInnerHTML={{ __html: description }}
          />
        </>
      )}
    </Box>
  );
};

const RightSide = ({ image, title }) => {
  return (
    <Box sx={{ width: "100%" }}>
      <img style={{ width: "100%", borderRadius: 8 }} src={image} alt={title} />
    </Box>
  );
};
