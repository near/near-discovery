import { StyledContainer, StyledContent, StyledBg } from './styles';

export default function Card({ onClick, disabled, children }: any) {
  return (
    <StyledContainer
      onClick={() => {
        if (!disabled) onClick();
      }}
      $disabled={disabled}
    >
      <StyledBg className="card_active_bg" />
      <StyledContent>{children}</StyledContent>
    </StyledContainer>
  );
}
