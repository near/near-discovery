import React from "react";

export default ({ currentStep, refs, requestSignIn, disable }) => (
  <div ref={refs.step10} style={{ height: "38px" }}>
    <button
      className="btn btn-primary"
      disabled={currentStep !== 10 || disable.onboardingPublishButton}
      onClick={() => {
        console.log("Redirect?");
        requestSignIn();
      }}
    >
      Publish
    </button>
  </div>
);
