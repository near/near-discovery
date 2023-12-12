import styled from 'styled-components';

import InfoIcon from '@/components/Icons/Info';

const StyledAlert = styled.div<{ type: string }>`
  width: 100%;
  height: 32px;
  background-color: rgba(235, 244, 121, 0.2);
  display: flex;
  justify-content: center;
  align-items: center;
  color: #ebf479;
  gap: 6px;
  border-radius: 8px;
  ${({ type }) => (type === 'info' ? '#EBF479' : '')}
`;
const StyledText = styled.div`
  font-size: 14px;
  font-weight: 400;
`;

export default function Alert({ type = 'info', text }: { type?: string; text: string }) {
  return (
    <StyledAlert type={type}>
      {type === 'info' && <InfoIcon />}
      <StyledText>{text}</StyledText>
    </StyledAlert>
  );
}
