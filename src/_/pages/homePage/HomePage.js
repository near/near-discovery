import React, { useContext } from "react";

import FeatureSection from "./_components/FeatureSection";
import TopSection from "./_components/TopSection";
import HomeFooter from "./_components/HomeFooter";
import { ThemeContext } from "../../context/ThemeContext";
import { useParams } from "react-router-dom";
import ViewPage from "../../../pages/ViewPage";
import HomeHeader from "./_components/HomeHeader";

export default function HomePage(props) {
  const { widgetSrc } = useParams();
  const { theme } = useContext(ThemeContext);

  return widgetSrc ? (
    <ViewPage {...props} />
  ) : (
    <>
      <HomeHeader />

      <TopSection />
      <FeatureSection
        title="BOS DevTools"
        description="We're still working out the kinks. Want to help us get ready for
              the prime time? <br/> Join the telegram channel and ask for the private
              beta access."
        image="https://images.unsplash.com/photo-1680695918766-eec8968c7b4a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=100"
      />
      <FeatureSection
        rtl
        title="BOS DevTools"
        description="We're still working out the kinks. Want to help us get ready for
              the prime time? <br/> Join the telegram channel and ask for the private
              beta access."
        image="https://images.unsplash.com/photo-1680695918766-eec8968c7b4a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=100"
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
