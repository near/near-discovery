import React, { useContext, useState } from "react";
import { useAccountId, useNear, useCache } from "near-social-vm";
import { ThemeContext } from "../../../../context/ThemeContext";
import {
  Box,
  Button,
  ButtonBase,
  Chip,
  Fade,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";

import { styled } from "@mui/material/styles";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import DriveFileRenameOutlineRoundedIcon from "@mui/icons-material/DriveFileRenameOutlineRounded";
import CancelRoundedIcon from "@mui/icons-material/CancelRounded";
import FileIcon from "../../../FileIcon";

export default function OpenWidget({ loadFile }) {
  const near = useNear();
  const cache = useCache();
  const accountId = useAccountId();

  const { theme } = useContext(ThemeContext);

  const [myWidgets, setMyWidgets] = useState([]);
  const getData = () => {
    let widget = `${accountId}/widget/*`;

    const code = cache.socialGet(
      near,
      widget,
      false,
      undefined,
      undefined,
      getData
    );
    setMyWidgets(code);
  };

  return (
    <>
      {/* MY WIDGETS SEECTION - NOT EDITING... */}
      {accountId && (
        <Accordion
          // defaultExpanded
          onClick={() => {
            if (myWidgets.length <= 0) {
              getData();
            }
          }}
        >
          <AccordionSummary
            aria-controls="panel2d-content"
            id="panel2d-header"
            sx={{ backgroundColor: theme.backgroundColor }}
          >
            <Typography sx={{ fontWeight: 600, fontSize: 13 }}>
              My Widgets
            </Typography>
          </AccordionSummary>
          <AccordionDetails sx={{ backgroundColor: theme.ui }}>
            {myWidgets ? (
              Object.keys(myWidgets)?.map((fileName, index) => (
                <MyWidgetsItem
                  key={index}
                  label={fileName}
                  onClick={() => loadFile(fileName)}
                />
              ))
            ) : (
              <ButtonBase
                sx={{
                  fontSize: 14,
                  textTransform: "none",
                  width: "100%",
                  py: 4,
                }}
                onClick={() => getData()}
              >
                Click here to see all widgets
              </ButtonBase>
            )}
          </AccordionDetails>
        </Accordion>
      )}
    </>
  );
}

const MyWidgetsItem = ({ label, onClick }) => {
  const { theme } = useContext(ThemeContext);

  return (
    <Box
      sx={{
        position: "relative",
        display: "flex",
        alignItems: "center",
        width: "100%",
        backgroundColor: theme.ui,
        "&:hover": {
          backgroundColor: theme.ui2,
          cursor: "pointer",
        },
      }}
    >
      <ButtonBase
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          px: 2,
          py: 0.5,
          width: "100%",

          zIndex: 5,
        }}
        onClick={() => onClick()}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
          }}
        >
          <FileIcon type="widget" />

          {/* <Tooltip title={label}> */}
          <Typography
            variant="p"
            sx={{
              ml: 0,
              fontWeight: 400,
              color: theme.textColor2,
              paddingBlock: "2.5px",
              textTransform: "none",
              fontSize: ".9rem",
              textAlign: "left",
              wordBreak: "break-all",
            }}
            className="max1Lines"
          >
            {label}
          </Typography>
          {/* </Tooltip> */}
        </Box>
      </ButtonBase>
    </Box>
  );
};

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  // border: `1px solid ${theme.palette.divider}`,
  // backgroundColor: "transparent",
  color: "#7e8185",
  "&:not(:last-child)": {
    borderBottom: 0,
  },
  "&:before": {
    display: "none",
  },
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={
      <ArrowForwardIosSharpIcon sx={{ fontSize: "0.8rem", fill: "#7e8185" }} />
    }
    {...props}
  />
))(({ theme }) => ({
  backgroundColor: "#1a1a1a",
  // backgroundColor:
  //   theme.palette.mode === "dark" ? "#1e1e1e" : "rgba(0, 0, 0, .03)",
  flexDirection: "row-reverse",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(90deg)",
  },
  "& .MuiAccordionSummary-content": {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  // backgroundColor: "#262626",
  backgroundColor: "#1e1e1e",
  padding: 0,
  borderTop: "1px solid rgba(0, 0, 0, .125)",
}));
