import React, { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import PagesContainer from "../components/PagesContainer";
import { Widget } from "near-social-vm";
import { Box } from "@mui/material";
import { EditorContext } from "../context/EditorContext";

export default function SearchPage(props) {
  const { theme } = useContext(ThemeContext);
  const { NetworkId } = useContext(EditorContext);
  // testnet

  return (
    <PagesContainer {...props}>
      <Box
        sx={{
          wdith: "100%",
          display: "flex",
          justifyContent: "center",
          height: "calc(100vh - 25px)",
          overflowY: "auto",
        }}
      >
        <Box
          style={{
            maxWidth: 1250,
            width: "100%",
          }}
        >
          <Widget
            src={`saidulbadhon.${
              NetworkId === "testnet" ? "testnet" : "near"
            }/widget/SearchPage`}
            props={{ theme }}
          />
        </Box>
      </Box>
    </PagesContainer>
  );
}
