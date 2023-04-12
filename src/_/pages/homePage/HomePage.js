import React, { useContext } from "react";

import FeatureSection from "./_components/FeatureSection";
import TopSection from "./_components/TopSection";
import HomeFooter from "./_components/HomeFooter";
import { ThemeContext } from "../../context/ThemeContext";
import { useParams } from "react-router-dom";
import ViewPage from "../../../pages/ViewPage";
import HomeHeader from "./_components/HomeHeader";
import VerticalCodePreview from "../../components/VerticalCodePreview";
import { Box, Typography } from "@mui/material";

export default function HomePage(props) {
  const { widgetSrc } = useParams();
  const { theme, bp } = useContext(ThemeContext);

  return widgetSrc ? (
    <ViewPage {...props} />
  ) : (
    <>
      <HomeHeader />
      <TopSection />
      <EditorContainer />
      <FeatureSection
        rtl
        title="BOS DevTools"
        description="We're still working out the kinks. Want to help us get ready for
              the prime time? <br/> Join the telegram channel and ask for the private
              beta access."
        image="https://images.unsplash.com/photo-1680695918766-eec8968c7b4a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=100"
      />

      <FeatureSection
        title="BOS DevTools"
        description="We're still working out the kinks. Want to help us get ready for
              the prime time? <br/> Join the telegram channel and ask for the private
              beta access."
        rightSideContent={
          <Box
            sx={{
              width: "100%",
              height: 500,
              border: `1px ${theme.borderColor} solid`,
              borderRadius: 0.5,
              overflow: "hidden",
            }}
          >
            <VerticalCodePreview initialCode="return(<div><h1>Hello World</h1></div>)" />
          </Box>
        }
        sxSx={{ gridTemplateColumns: bp ? "1fr" : "1fr 1fr" }}
      />

      {/*  <FeatureSection
        title="BOS DevTools"
        description="We're still working out the kinks. Want to help us get ready for
              the prime time? <br/> Join the telegram channel and ask for the private
              beta access."
        image="https://images.unsplash.com/photo-1680695918766-eec8968c7b4a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=100"
      /> */}
      <HomeFooter />
    </>
  );
}

const EditorContainer = () => {
  const { theme, bp } = useContext(ThemeContext);

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        py: bp ? 5 : 10,
        gap: 3,
        backgroundColor: theme.ui,
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: 2,
        }}
      >
        <Typography variant="h1" sx={{ color: theme.textColor }}>
          Try it out
        </Typography>

        <Typography
          variant="p"
          textAlign="center"
          sx={{ color: theme.textColor2 }}
        >
          Get started by editing the code below,
          <br />
          then see your changes on your own device.
        </Typography>
      </Box>

      <Box
        sx={{
          width: "100%",
          maxWidth: 1250,

          height: 400,
          borderRadius: 0.5,
          overflow: "hidden",
          px: 2,
        }}
      >
        <Box
          sx={{
            width: "100%",
            height: "100%",
            border: `1px ${theme.borderColor} solid`,
          }}
        >
          <VerticalCodePreview
            initialCode="return(<div style={{backgroundColor: props.theme.ui }}><h1 style={{color: props.theme.textColor}}>Hello World</h1></div>)"
            horizontal
          />
        </Box>
      </Box>

      {!bp && (
        <Box
          sx={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "center",
            position: "relative",
            pr: 15,
          }}
        >
          <Typography
            variant="p"
            fontWeight={600}
            className="max1Lines"
            sx={{
              mt: 3,
              position: "absolute",
              bottom: -20,
              left: "-76.5%",
              py: 1,
              px: 2,
              backgroundColor: theme.backgroundColor,
              color: theme.textColor,
              border: `2px solid ${theme.textColor}`,
              borderRadius: 5,
            }}
          >
            See it on your device
          </Typography>

          <svg
            width="122"
            height="51"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M114.705 1.102a1 1 0 00-1.414.004l-6.347 6.381a1 1 0 101.418 1.41l5.641-5.672 5.673 5.642a1 1 0 101.41-1.418l-6.381-6.347zM.951 50.518c18.179.377 46.577-.919 70.452-7.663 11.934-3.372 22.819-8.126 30.729-14.78C110.071 21.398 115.029 12.79 115 1.808l-2 .006c.028 10.28-4.58 18.36-12.155 24.73-7.604 6.396-18.183 11.052-29.986 14.386-23.6 6.667-51.774 7.964-69.867 7.589l-.041 2z"
              fill={theme.textColor}
            ></path>
          </svg>
        </Box>
      )}
    </Box>
  );
};
