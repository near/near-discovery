/* eslint-disable @next/next/no-img-element */

import Image from 'next/image';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

import { Button } from '@/components/lib/Button';
import { useDefaultLayout } from '@/hooks/useLayout';
import type { NextPageWithLayout } from '@/utils/types';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-width: 700px;

  img {
    width: 100%;
    height: auto;
  }
`;

const ImageFillWrapper = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 1.5;
  overflow: hidden;

  img {
    object-fit: cover;
    object-position: center;
  }
`;

const TestPage: NextPageWithLayout = () => {
  const [currentStrategyLoadStart, setCurrentStrategyLoadStart] = useState<number>();
  const [currentStrategyLoadEnd, setCurrentStrategyLoadEnd] = useState<number>();

  const [nextImageFillStrategyLoadStart, setNextImageFillStrategyLoadStart] = useState<number>();
  const [nextImageFillStrategyLoadEnd, setNextImageFillStrategyLoadEnd] = useState<number>();

  const [nextImageSizeStrategyLoadStart, setNextImageSizeStrategyLoadStart] = useState<number>();
  const [nextImageSizeStrategyLoadEnd, setNextImageSizeStrategyLoadEnd] = useState<number>();

  return (
    <Container className="gateway-page-container">
      <h4>Direct IPFS gateway with basic {`<img />`} tag (current strategy):</h4>

      {currentStrategyLoadStart ? (
        <>
          <img
            src="https://ipfs.near.social/ipfs/bafybeihnctcv4gxboaszdi5477yaxe2vat525kzwnwdojymf5sbuxshcku"
            alt="Direct IPFS Gateway"
            onLoad={() => setCurrentStrategyLoadEnd(Date.now())}
          />

          <p>
            Load time: {currentStrategyLoadEnd ? currentStrategyLoadEnd - currentStrategyLoadStart : 'calculating'} MS
          </p>
        </>
      ) : (
        <Button label="Load" onClick={() => setCurrentStrategyLoadStart(Date.now())} />
      )}

      <hr />

      <h4>Next/Image with optimized quality using {`"fill"`} instead of explicit size:</h4>

      {nextImageFillStrategyLoadStart ? (
        <>
          <ImageFillWrapper>
            <Image
              src="/images/bafkreib6sp7aoovferwg4zfvekhxxmp6hdp4u7f2bgxupebntrfgrmjhbe.jpg"
              fill
              alt="Next Image: Fill"
              onLoad={() => setNextImageFillStrategyLoadEnd(Date.now())}
            />
          </ImageFillWrapper>

          <p>
            Load time:{' '}
            {nextImageFillStrategyLoadEnd
              ? nextImageFillStrategyLoadEnd - nextImageFillStrategyLoadStart
              : 'calculating'}{' '}
            MS
          </p>
        </>
      ) : (
        <Button label="Load" onClick={() => setNextImageFillStrategyLoadStart(Date.now())} />
      )}

      <hr />

      <h4>Next/Image with optimized quality and explicit size:</h4>

      {nextImageSizeStrategyLoadStart ? (
        <>
          <Image
            src="/images/bafkreib6sp7aoovferwg4zfvekhxxmp6hdp4u7f2bgxupebntrfgrmjhbe.jpg"
            width={700}
            height={700}
            alt="Next Image: Size"
            onLoad={(event) => {
              console.log('image', event);
              setNextImageSizeStrategyLoadEnd(Date.now());
            }}
          />

          <p>
            Load time:{' '}
            {nextImageSizeStrategyLoadEnd
              ? nextImageSizeStrategyLoadEnd - nextImageSizeStrategyLoadStart
              : 'calculating'}{' '}
            MS
          </p>
        </>
      ) : (
        <Button label="Load" onClick={() => setNextImageSizeStrategyLoadStart(Date.now())} />
      )}

      <hr />

      <Button variant="affirmative" label="Reload page to test again" onClick={() => window.location.reload()} />
    </Container>
  );
};

TestPage.getLayout = useDefaultLayout;

export default TestPage;
