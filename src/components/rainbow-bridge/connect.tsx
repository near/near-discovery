import styled from 'styled-components';

import { SMALL_SCREEN } from '../near/NearStyleVar';

const disConnectIcon = (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g clip-path="url(#clip0_1901_870)">
      <path
        d="M14.6799 1.32229C14.2617 0.903131 13.7648 0.570585 13.2179 0.343688C12.6709 0.116792 12.0846 0 11.4925 0C10.9003 0 10.314 0.116792 9.76707 0.343688C9.22013 0.570585 8.72331 0.903131 8.30505 1.32229L6.28562 3.34057L7.34848 4.40343L9.36677 2.384C10.4879 1.264 12.3793 1.14515 13.6171 2.384C14.8559 3.624 14.7371 5.51429 13.6171 6.63543L11.5988 8.65372L12.6628 9.71772L14.6811 7.69943C15.5256 6.85312 15.9999 5.70626 15.9997 4.51062C15.9994 3.31499 15.5248 2.16829 14.6799 1.32229ZM6.63648 13.6194C5.51534 14.7394 3.62391 14.8583 2.3862 13.6194C1.1462 12.3783 1.2662 10.488 2.3862 9.368L4.40448 7.34972L3.34048 6.28457L1.3222 8.304C0.903176 8.72233 0.57075 9.21918 0.343939 9.76611C0.117129 10.313 0.000383377 10.8993 0.000383377 11.4914C0.000383377 12.0835 0.117129 12.6698 0.343939 13.2167C0.57075 13.7637 0.903176 14.2605 1.3222 14.6789C1.74058 15.0976 2.23738 15.4297 2.7842 15.6564C3.33102 15.883 3.91713 15.9996 4.50905 15.9996C5.10097 15.9996 5.68709 15.883 6.23391 15.6564C6.78073 15.4297 7.27752 15.0976 7.69591 14.6789L9.71534 12.6594L8.65248 11.5966L6.63648 13.6194ZM2.75762 1.696C2.72636 1.66488 2.68403 1.6474 2.63991 1.6474C2.59579 1.6474 2.55347 1.66488 2.5222 1.696L1.69705 2.52115C1.66593 2.55241 1.64845 2.59474 1.64845 2.63886C1.64845 2.68298 1.66593 2.7253 1.69705 2.75657L13.2456 14.3074C13.3108 14.3726 13.4171 14.3726 13.4811 14.3074L14.3062 13.4834C14.3373 13.4522 14.3548 13.4098 14.3548 13.3657C14.3548 13.3216 14.3373 13.2793 14.3062 13.248L2.75762 1.69714V1.696Z"
        fill="#787DA1"
      />
    </g>
    <defs>
      <clipPath id="clip0_1901_870">
        <rect width="16" height="16" fill="white" />
      </clipPath>
    </defs>
  </svg>
);

const Wrapper = styled.div`
  .disconnect-button {
    width: 36px;
    height: 36px;
    border-radius: 8px;
    border: 1px solid #787da1;
    opacity: 0.5px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 12px;
    cursor: pointer;
  }

  .connect-button {
    width: 90px;
    height: 36px;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 16px;
    font-weight: 500;
    line-height: 19px;
    letter-spacing: 0em;
    text-align: center;
    cursor: pointer;
    background: #00faa0;
    color: #000000;

    @media (max-width: ${SMALL_SCREEN}) {
      font-size: 15px;
    }
  }
`;

export const ConnectButton = (props: { onConnect: () => void; onDisConnect: () => void; isConnected: boolean }) => {
  const { onConnect, onDisConnect, isConnected } = props;

  return (
    <Wrapper>
      {isConnected ? (
        <div className="disconnect-button" onClick={onDisConnect}>
          {disConnectIcon}
        </div>
      ) : (
        <div className="connect-button" onClick={onConnect}>
          Connect
        </div>
      )}
    </Wrapper>
  );
};
