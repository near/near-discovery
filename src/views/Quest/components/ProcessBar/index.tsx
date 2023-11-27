import styled from 'styled-components';

const StyledProcessBarBox = styled.div<{ $size: number; $noborder: boolean }>`
  flex-grow: 1;
  height: ${({ $size }) => $size}px;
  position: relative;
  border-radius: 20px;
  ${({ $noborder }) => !$noborder && 'border: 1px solid #373a53;'}
  background: ${({ $noborder }) => ($noborder ? 'rgba(255, 255, 255, 0.15)' : '#2c2e3e')};
  box-sizing: border-box;
`;
const StyledBar = styled.div<{ $size: number; $value: number; $noborder: boolean }>`
  border-radius: 16px;
  background: #ebf479;
  position: absolute;
  width: ${({ $value }) => $value}%;
  height: ${({ $size }) => $size}px;
  ${({ $noborder }) => !$noborder && ' left: -1px;top: -1px;'}
`;

type ProcessBarProps = {
  size: number;
  value: number;
  noBorder?: boolean;
};

const ProcessBar = ({ size = 8, value, noBorder = false }: ProcessBarProps) => {
  return (
    <StyledProcessBarBox $size={size} $noborder={noBorder}>
      <StyledBar $size={size} $value={value} $noborder={noBorder} />
    </StyledProcessBarBox>
  );
};

export default ProcessBar;
