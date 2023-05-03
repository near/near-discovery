import { useState } from 'react';
import styled from 'styled-components';

import { useFlags } from '@/hooks/useFlags';
import { useComponentRedirectMapStore } from '@/stores/component-redirect-map';

const Banner = styled.div`
  background: #fff2cd;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: 2rem;
  column-gap: 8px;

  p {
    margin: 0;
    color: #664d04;
  }
`;

const Button = styled.button`
  all: unset;
  color: #664d04;
`;

export function BosLoaderBanner() {
  const redirectMapStore = useComponentRedirectMapStore();
  const [flags, setFlags] = useFlags();
  const [hideBanner, setHideBanner] = useState(false);

  function closeBanner() {
    setHideBanner(true);

    if (flags?.bosLoaderUrl) {
      setFlags({ bosLoaderUrl: undefined });
    }
  }

  if (!redirectMapStore.loaderUrl || hideBanner) return null;

  return (
    <Banner>
      <div>
        <p>Loading components from: {redirectMapStore.loaderUrl}</p>
        {redirectMapStore.failedToLoad && (
          <p style={{ color: 'red' }}>
            BOS Loader fetch error, see console logs. CORS errors may be misleading and mean your endpoint cannot be
            reached
          </p>
        )}
      </div>

      <Button onClick={closeBanner}>
        <i className="ph-fill ph-x-circle" />
      </Button>
    </Banner>
  );
}
