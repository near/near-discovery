import React from "react";
import { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import { Box, ButtonBase, Typography } from "@mui/material";
import { LearnContext } from "../../context/LearnContext";

export default function LearnSidebar() {
  const { theme } = useContext(ThemeContext);
  const { projects, selectedItem, setSelectedItem } = useContext(LearnContext);

  return (
    <Box>
      <Box
        sx={{
          height: 50,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          paddingInline: 1,
          borderBottom: `1px solid ${theme.borderColor}`,
        }}
      >
        <Typography
          variant="h6"
          sx={{ fontWeight: 500, color: theme.textColor }}
        >
          Learn
        </Typography>
      </Box>

      <Box>
        {projects?.map((project) => (
          <ButtonBase
            sx={{
              width: "100%",
              borderBottom: `1px ${theme.borderColor} solid`,
              // height: 50,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "flex-start",
              px: 1,
              py: 1,

              backgroundColor:
                selectedItem?.projectId === project?._id ? theme.ui2 : theme.ui,
              "&:hover": {
                backgroundColor: theme.ui2,
                cursor: "pointer",
              },
            }}
            onClick={() => {
              setSelectedItem((e) => ({
                projectId: e?.projectId === project?._id ? "" : project?._id,
                sectionId: "",
              }));
            }}
          >
            <Typography
              variant="h6"
              sx={{ fontWeight: 600, color: theme.textColor }}
            >
              {project?.name}
            </Typography>
            <Typography
              variant="p"
              sx={{
                fontWeight: 400,
                color: theme.textColor3,
                fontSize: "1rem",
              }}
            >
              {project?.sections.length} section
            </Typography>
          </ButtonBase>
        ))}
      </Box>
    </Box>
  );
}
