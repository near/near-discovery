import React from "react";

export default ({ currentStep, refs, requestSignIn }) => (
  <div ref={refs.step10}>
    <button
      className="btn btn-primary"
      disabled={currentStep !== 10}
      onClick={() => {
        console.log("Redirect?");
        requestSignIn();
      }}
    >
      Publish
    </button>
  </div>
);
