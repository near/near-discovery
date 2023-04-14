import React, { useContext } from "react";

import HomeFeatureSection from "./_components/HomeFeatureSection";
import HomeTopSection from "./_components/HomeTopSection";
import HomeFooter from "./_components/HomeFooter";
import { ThemeContext } from "../../context/ThemeContext";
import { useParams } from "react-router-dom";
import ViewPage from "../../../pages/ViewPage";
import HomeHeader from "./_components/HomeHeader";
import VerticalCodePreview from "../../components/VerticalCodePreview";
import { Box } from "@mui/material";
import HomeEditorContainer from "./_components/HomeEditorContainer";
import HomeOurPartnersSection from "./_components/HomeOurPartnersSection";
import HomeTestimonialSection from "./_components/HomeTestimonialSection";

export default function HomePage(props) {
  const { widgetSrc } = useParams();
  const { theme, bp } = useContext(ThemeContext);

  return widgetSrc ? (
    <ViewPage {...props} />
  ) : (
    <>
      <HomeHeader />
      <HomeTopSection />
      <HomeOurPartnersSection />
      <HomeEditorContainer />
      {/* <HomeFeatureSection
        rtl
        title="BOS DevTools"
        description="We're still working out the kinks. Want to help us get ready for
              the prime time? <br/> Join the telegram channel and ask for the private
              beta access."
        image="https://images.unsplash.com/photo-1680695918766-eec8968c7b4a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=100"
      /> */}

      {/* <HomeFeatureSection
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
      />*/}
      <HomeTestimonialSection />

      <HomeFooter />
    </>
  );
}
