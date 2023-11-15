import { useRouter } from 'next/router';
import React from 'react';

export default function OnboardPublishButton({ currentStep, refs, disable }) {
  const router = useRouter();

  return (
    <div ref={refs.step10} style={{ height: '38px' }}>
      <button
        className="btn btn-primary"
        disabled={currentStep !== 10 || disable.onboardingPublishButton}
        onClick={() => {
          router.push('/signup');
        }}
      >
        Publish
      </button>
    </div>
  );
}
