import React from "react";
import { useHistory } from "react-router-dom";

export default ({ currentStep, refs, requestSignIn, disable }) => {
  const history = useHistory();

  return (
    <div ref={refs.step10} style={{ height: "38px" }}>
      <button
        className="btn btn-primary"
        disabled={currentStep !== 10 || disable.onboardingPublishButton}
        onClick={() => {
          history.push("/signup");
        }}
      >
        Publish
      </button>
    </div>
  );
};
