import { Box, Typography } from "@mui/material";
import React from "react";
import { useContext } from "react";
import { ThemeContext } from "../../../context/ThemeContext";

export default function FeatureSection({
  leftSideContent,
  rightSideContent,
  title,
  description,

  image,
  rtl,
  sx,
  sxSx,
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
          width: "100%",
          px: 2,
          py: bp ? 5 : 10,
          display: "grid",
          gridTemplateColumns: bp ? "1fr" : rtl ? "1fr 2fr" : "2fr 1fr",
          gap: bp ? 2 : 4,
          justifyContent: "space-between",
          alignItems: "center",
          ...sxSx,
        }}
      >
        {!rtl || bp ? (
          <>
            <LeftSide
              leftSideContent={leftSideContent}
              title={title}
              description={description}
            />
            <RightSide
              rightSideContent={rightSideContent}
              image={image}
              title={title}
            />
          </>
        ) : (
          <>
            <RightSide
              rightSideContent={rightSideContent}
              image={image}
              title={title}
            />
            <LeftSide
              leftSideContent={leftSideContent}
              title={title}
              description={description}
            />
          </>
        )}
      </Box>
    </Box>
  );
}

const LeftSide = ({ leftSideContent, title, description }) => {
  const { theme } = useContext(ThemeContext);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
      {leftSideContent ? (
        leftSideContent
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

const RightSide = ({ rightSideContent, image, title }) => {
  return (
    <Box sx={{ width: "100%" }}>
      {rightSideContent ? (
        rightSideContent
      ) : (
        <img
          style={{ width: "100%", borderRadius: 4 }}
          src={image}
          alt={title}
        />
      )}
    </Box>
  );
};
