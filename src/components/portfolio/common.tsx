import { NoAssetsIcon } from './imgs';
import { NoAssetText, NoAssetWrapper } from '.';

import React from 'react';

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
