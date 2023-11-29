import styled from 'styled-components';

import Loading from '../Icons/Loading';

const StyledToast = styled.div`
  border-radius: 16px;
  border: 1px solid #303030;
  background: #1b1b1b;
  padding: 18px;
  display: flex;
  gap: 10px;
  width: 288px;
  align-items: center;
  @media (max-width: 768px) {
    width: calc(100vw - 32px);
  }
`;
const StyledContent = styled.div`
  display: flex;
  justify-content: space-between;
  flex-grow: 1;
  margin-top: 5px;
`;
const StyledDesc = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;
const StyledTitle = styled.div`
  color: #fff;
  font-family: Noto Sans;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  align-items: center;
`;
const StyledSecondaryText = styled.div`
  color: #8e8e8e;
  font-family: Open Sans;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;
const StyledCloseWrapper = styled.div`
  cursor: pointer;
  line-height: 22px;
  flex-shrink: 0;
`;
const IconWrapper = styled.div`
  flex-shrink: 0;
`;

export default function Toast({ type, title, text, closeToast }: any) {
  return (
    <StyledToast>
      <IconWrapper>
        {type === 'success' && (
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
            <circle cx="11" cy="11" r="11" fill="#39A156" />
            <path d="M6 10.8571L9.09375 14L15 8" stroke="white" strokeWidth="2" strokeLinecap="round" />
          </svg>
        )}
        {type === 'error' && (
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
            <circle cx="11" cy="11" r="11" fill="#FF6A8E" />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M15.0407 8.95711C15.4312 8.56658 15.4312 7.93342 15.0407 7.54289C14.6502 7.15237 14.017 7.15237 13.6265 7.54289L11.2921 9.87733L8.95762 7.54289C8.56709 7.15237 7.93393 7.15237 7.5434 7.54289C7.15288 7.93342 7.15288 8.56658 7.5434 8.95711L9.87784 11.2915L7.54289 13.6265C7.15237 14.017 7.15237 14.6502 7.54289 15.0407C7.93342 15.4312 8.56658 15.4312 8.95711 15.0407L11.2921 12.7058L13.627 15.0407C14.0175 15.4312 14.6507 15.4312 15.0412 15.0407C15.4317 14.6502 15.4317 14.017 15.0412 13.6265L12.7063 11.2915L15.0407 8.95711Z"
              fill="white"
            />
          </svg>
        )}
      </IconWrapper>
      {type === 'pending' && <Loading />}
      <StyledContent>
        <StyledDesc>
          <StyledTitle>{title}</StyledTitle>
          <StyledSecondaryText>{text}</StyledSecondaryText>
        </StyledDesc>
        <StyledCloseWrapper onClick={closeToast}>
          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path
              d="M7.73284 6.00004L11.7359 1.99701C12.0368 1.696 12.0882 1.2593 11.8507 1.0219L10.9779 0.14909C10.7404 -0.0884124 10.3043 -0.0363122 10.0028 0.264491L6.00013 4.26743L1.99719 0.264591C1.69619 -0.036712 1.25948 -0.0884125 1.02198 0.14939L0.149174 1.0223C-0.0882277 1.2594 -0.0368271 1.6961 0.264576 1.99711L4.26761 6.00004L0.264576 10.0033C-0.0363271 10.3041 -0.0884277 10.7405 0.149174 10.978L1.02198 11.8509C1.25948 12.0884 1.69619 12.0369 1.99719 11.736L6.00033 7.73276L10.0029 11.7354C10.3044 12.037 10.7405 12.0884 10.978 11.8509L11.8508 10.978C12.0882 10.7405 12.0368 10.3041 11.736 10.0029L7.73284 6.00004Z"
              fill="white"
            />
          </svg>
        </StyledCloseWrapper>
      </StyledContent>
    </StyledToast>
  );
}
