import { memo } from 'react';
import styled from 'styled-components';
import EmptyIcon from '../Icons/Empty';

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #4e5271;
  font-family: Gantari;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  padding-top: 40px;
  padding-bottom: 40px;
  gap: 14px;
`;

const Empty = ({ size, tips }: { size?: number; tips?: string }) => {
  return (
    <StyledContainer>
      <EmptyIcon size={size} />
      <div style={{ fontSize: size ? size / 2.625 : 16 + 'px' }}>{tips}</div>
    </StyledContainer>
  );
};

export default memo(Empty);
