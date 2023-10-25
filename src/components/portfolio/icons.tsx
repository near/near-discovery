import React from 'react';
import styled from 'styled-components';

const IconSeriesWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const IconWrapper = styled.img`
  width: 20px;
  height: 20px;
  border-radius: 100%;
  position: relative;
`;

export const IconSeries = ({ ulrs }: { ulrs: string[] }) => {
  return (
    <IconSeriesWrapper>
      {ulrs.map((url, index) => {
        return (
          <IconWrapper
            src={url}
            key={url + '-' + index}
            style={{
              zIndex: index + 1,
              right: index * 4 + 'px',
            }}
          ></IconWrapper>
        );
      })}
    </IconSeriesWrapper>
  );
};
