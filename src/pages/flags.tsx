import type { MouseEvent } from 'react';
import React, { useCallback, useState } from 'react';

import { useFlags } from '@/hooks/useFlags';
import { useDefaultLayout } from '@/hooks/useLayout';
import type { NextPageWithLayout } from '@/utils/types';

const FlagsPage: NextPageWithLayout = () => {
  const [flags, setFlags] = useFlags();
  const [bosLoaderUrl, setBosLoaderUrl] = useState(flags?.bosLoaderUrl || '');

  const handleSave = useCallback(
    (e: MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      setFlags({
        bosLoaderUrl,
      });
    },
    [bosLoaderUrl, setFlags],
  );

  return (
    <>
      <form
        style={{
          display: 'flex',
          flexDirection: 'column',
          rowGap: '1rem',
          padding: '40px',
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
          }}
        >
          <div style={{ verticalAlign: 'middle' }}>BOS Loader Url</div>
          <input
            className="form-control"
            placeholder="e.g. http://127.0.0.1:3030/, https://my-loader.ngrok.io"
            value={bosLoaderUrl}
            onChange={(e) => setBosLoaderUrl(e.target.value)}
          />
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-end',
          }}
        >
          <button className="btn btn-primary" style={{ width: '10rem' }} onClick={handleSave}>
            Save
          </button>
        </div>
      </form>
    </>
  );
};

FlagsPage.getLayout = useDefaultLayout;

export default FlagsPage;
