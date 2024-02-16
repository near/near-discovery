import React from 'react';

import { NoAssetText, NoAssetWrapper } from '.';
import { NoAssetsIcon } from './imgs';

export const NoDataLayout = ({ shrink }: { shrink?: boolean }) => {
  return (
    <NoAssetWrapper
      style={{
        padding: shrink ? '20px 0px' : '',
      }}
    >
      {NoAssetsIcon}

      <NoAssetText>No assets yet</NoAssetText>
    </NoAssetWrapper>
  );
};
