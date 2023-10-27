import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import React from 'react';
import styled from 'styled-components';

export const LeftMenuContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  justify-content: center;

  .flex-grow {
    flex-grow: 1;
  }
  .contentOut {
    /* padding-top: 25px;
    margin-left: 35px; */
  }
  .contentOut p {
    font-size: 20px;
    font-weight: 700;
    margin-bottom: 20px;
    color: #ffffff;
  }
  @media (max-width: 900px) {
    display: grid;
    .contentOut {
      padding: 0;
      margin: 0 0 36px 0;
    }
    .contentOut p {
      display: none;
    }
  }
`;

const MenuContainer = styled.div`
  margin-right: 35px;
  /* padding-top: 100px; */

  .item {
    display: flex;
    align-items: center;
    padding-left: 40px;
    width: 180px;
    height: 64px;
    font-weight: 500;
    font-size: 16px;
    color: #7e8a93;
    cursor: pointer;
    margin-bottom: 2px;
    /* border-right: 3px solid transparent; */
    transition: 0.5s;
    border-radius: 16px;
    :hover {
      background: linear-gradient(270deg, #373a53 0%, rgba(55, 58, 83, 0) 100%);
      color: #ffffff;
    }
  }
  .item.active {
    color: #ffffff;
    background: linear-gradient(270deg, #373a53 0%, rgba(55, 58, 83, 0) 100%);
  }
  .item.disable {
    cursor: not-allowed;
  }
  .icon {
    width: 26px;
  }
  @media (max-width: 900px) {
    margin: 0;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 16px;
    background: #222436;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 1;
    padding: 0 16px;
    .item {
      width: auto;
      padding: 0;
      height: 76px;
      display: grid;
      text-align: center;
      align-items: center;
      span {
        margin-left: 40px;
        margin-bottom: -28px;
      }
    }
    .item.active {
      background-image: none;
      color: #e9f456;
      border-color: transparent;
    }
  }
`;

const lendingIcon = (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M4.30875 5.99853C4.30742 5.41955 4.42014 4.84597 4.64048 4.31055C4.86082 3.77513 5.18445 3.28836 5.59292 2.87801C6.00138 2.46767 6.48666 2.1418 7.02107 1.91901C7.55547 1.69621 8.12852 1.58086 8.7075 1.57953C11.1375 1.57953 13.1062 3.5584 13.1062 5.99853C13.1071 6.78301 12.8991 7.55358 12.5037 8.23111C12.1083 8.90865 11.5397 9.46875 10.8562 9.8539C10.6313 10.5014 10.2105 11.0629 9.65211 11.4604C9.09372 11.8579 8.42545 12.0718 7.74 12.0724H5.5665V10.5267H7.74225C8.71425 10.5267 9.50175 9.73578 9.50175 8.75928V8.64903H3.22763L3.20288 14.7668H12.9893C13.9601 14.7668 14.7488 13.9748 14.7488 12.9994L14.7724 10.8574H12.3165V9.31165H16.3125L16.2878 12.9994C16.2892 13.876 15.9427 14.7174 15.3242 15.3386C14.7057 15.9599 13.8659 16.3101 12.9893 16.3125H1.66275L1.6875 7.10215H4.44713C4.35496 6.74153 4.30847 6.37075 4.30875 5.99853ZM6.06713 7.10215H11.0396V7.65903C11.3715 7.1899 11.5673 6.61728 11.5673 5.99853C11.5681 5.62215 11.4949 5.24928 11.3516 4.90122C11.2084 4.55317 10.9979 4.23674 10.7324 3.97003C10.4668 3.70331 10.1513 3.49153 9.80386 3.34678C9.45643 3.20202 9.08388 3.12714 8.7075 3.1264C8.33112 3.12714 7.95857 3.20202 7.61114 3.34678C7.2637 3.49153 6.94819 3.70331 6.68262 3.97003C6.41705 4.23674 6.20664 4.55317 6.06339 4.90122C5.92014 5.24928 5.84686 5.62215 5.84775 5.99853C5.84775 6.3889 5.9265 6.76353 6.06713 7.10215Z"
      fill="currentColor"
    />
  </svg>
);
const swapIcon = (
  <svg width="16" height="14" viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M11.2571 7.76056C11.1005 7.61142 10.8919 7.52941 10.6756 7.53205C10.4594 7.53468 10.2527 7.62176 10.0998 7.77467C9.94692 7.92758 9.85984 8.13422 9.85721 8.35045C9.85457 8.56669 9.93658 8.77539 10.0857 8.93199L10.7343 9.58056H4.41429C3.68252 9.5798 2.98095 9.28877 2.46351 8.77134C1.94607 8.2539 1.65505 7.55232 1.65429 6.82056C1.65416 6.18756 1.83563 5.56781 2.17715 5.03484C2.29574 4.85033 2.33617 4.62626 2.28955 4.41193C2.24294 4.19761 2.11309 4.01058 1.92858 3.89199C1.74406 3.7734 1.51999 3.73296 1.30567 3.77958C1.09134 3.82619 0.904308 3.95604 0.785718 4.14056C0.271637 4.93979 -0.00115865 5.87027 3.69903e-06 6.82056C0.00151569 7.99083 0.467076 9.11275 1.29459 9.94026C2.1221 10.7678 3.24401 11.2333 4.41429 11.2348H10.6486L10.0771 11.8063C9.93601 11.9643 9.86075 12.1703 9.86684 12.3821C9.87293 12.5939 9.95991 12.7953 10.1099 12.9449C10.2599 13.0945 10.4615 13.181 10.6733 13.1866C10.8851 13.1921 11.0909 13.1164 11.2486 12.9748L13.2657 10.9577C13.3425 10.881 13.4034 10.7899 13.445 10.6897C13.4866 10.5894 13.508 10.4819 13.508 10.3734C13.508 10.2649 13.4866 10.1574 13.445 10.0572C13.4034 9.9569 13.3425 9.86582 13.2657 9.78913L11.2571 7.76056Z"
      fill="currentColor"
    />
    <path
      d="M11.5857 2.132H4.80001L5.55144 1.38057C5.69258 1.22258 5.76784 1.01652 5.76175 0.804751C5.75566 0.592982 5.66868 0.39159 5.51869 0.241968C5.3687 0.0923464 5.1671 0.00586073 4.95532 0.000287087C4.74354 -0.00528655 4.53766 0.0704751 4.38001 0.212001L2.36287 2.22914C2.28607 2.30583 2.22514 2.39691 2.18357 2.49717C2.142 2.59743 2.12061 2.7049 2.12061 2.81343C2.12061 2.92196 2.142 3.02943 2.18357 3.12969C2.22514 3.22995 2.28607 3.32102 2.36287 3.39771L4.38001 5.41486C4.53766 5.55638 4.74354 5.63214 4.95532 5.62657C5.1671 5.621 5.3687 5.53451 5.51869 5.38489C5.66868 5.23527 5.75566 5.03388 5.76175 4.82211C5.76784 4.61034 5.69258 4.40428 5.55144 4.24629L5.09144 3.78629H11.5857C12.3175 3.78704 13.0191 4.07807 13.5365 4.59551C14.0539 5.11294 14.345 5.81452 14.3457 6.54629C14.3463 7.19597 14.1544 7.83126 13.7943 8.372C13.6748 8.5549 13.6323 8.77761 13.6762 8.99165C13.7201 9.20569 13.8467 9.39374 14.0286 9.51486C14.1644 9.60396 14.3233 9.65161 14.4857 9.652C14.6223 9.6521 14.7568 9.6182 14.877 9.55336C14.9972 9.48851 15.0994 9.39477 15.1743 9.28057C15.7132 8.47055 16.0005 7.51921 16 6.54629C15.9985 5.37601 15.5329 4.2541 14.7054 3.42658C13.8779 2.59907 12.756 2.13351 11.5857 2.132Z"
      fill="currentColor"
    />
  </svg>
);

const bridgeIcon = (
  <svg width="21" height="12" viewBox="0 0 21 12" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M19 4.50013C18.1667 3.16679 15 3.31402e-05 8.5 1.00014C2.12521 1.98099 0.5 7.5 0.5 12.0002H7C7 12.0002 6.86536 7.63464 9.5 5.00016C12.0496 2.45072 16.5 2.50003 19 4.50013ZM11 6.49995C11 6.49995 12.8865 4.22155 16 4.99996C20 6 21 9.18538 21 12H16.7838C16.7838 12 17 9.49993 15.8108 7.99993C14.6908 6.58724 12.5 5.99993 11 6.49995Z"
      fill="currentColor"
    />
  </svg>
);

const stakingIcon = (
  <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M5.293 11C3.90435 9.99854 3 8.36383 3 6.51724C3 3.47015 5.46243 1 8.5 1C11.5376 1 14 3.47015 14 6.51724C14 8.36383 13.0957 9.99854 11.707 11"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
    />
    <path d="M1 11H16" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
    <path d="M4 15H13" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
  </svg>
);

const RainbowLeftMenu = () => {
  const search = useSearchParams();

  const router = useRouter();

  const source = search.get('source');

  if (source !== 'all-in-one') return <div></div>;

  return (
    <MenuContainer>
      <div className={`item active`}>
        <span className="icon">{bridgeIcon}</span>
        Bridge
      </div>
      <div
        onClick={() => {
          router.push('juaner.near/widget/ref-home?initTab=swap');
        }}
        className={`item `}
      >
        <span className="icon">{swapIcon}</span>
        Swap
      </div>
      <div
        onClick={() => {
          router.push('juaner.near/widget/ref-home?initTab=lending');
        }}
        className={`item `}
      >
        <span className="icon">{lendingIcon}</span>
        Lending
      </div>
      <div
        className={`item `}
        onClick={() => {
          router.push('juaner.near/widget/ref-home?initTab=staking');
        }}
      >
        <span className="icon">{stakingIcon}</span>
        Staking
      </div>
    </MenuContainer>
  );
};

export { RainbowLeftMenu };
