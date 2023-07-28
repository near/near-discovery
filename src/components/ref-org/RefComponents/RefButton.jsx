import styled from 'styled-components';

const RefButton = ({ children, className, style, onClick, color }) => {
  return (
    <StyledButton className={className} onClick={onClick} style={style} color={color}>
      {children}
    </StyledButton>
  );
};

const StyledButton = styled.button`
  border-radius: 16px;
  padding: 0.375rem 0.75rem;
  border: 0;
  font-weight: 700;
  background: ${(p) => bgColor[p.color]?.default};
  &:hover {
    background: ${(p) => bgColor[p.color]?.hover};
  }
`;

export const refButtonColor = {
  yellow: 'yellow',
};

const bgColor = {
  [refButtonColor.yellow]: {
    default: 'linear-gradient(180deg, #EEF3BF 0%, #E9F456 100%)',
    hover: 'linear-gradient(180deg,#edf4af 0%,#e3ef37 100%)',
  },
};

export default RefButton;
