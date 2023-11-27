import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { useRouter } from 'next/router';
import { useCallback } from 'react';
import styled from 'styled-components';

import { MEDIUM_SCREEN } from '@/components/near/NearStyleVar';
import { VmComponent } from '@/components/vm/VmComponent';
import { useBosComponents } from '@/hooks/useBosComponents';
import { useAuthStore } from '@/stores/auth';
import { useVmStore } from '@/stores/vm';

const arrowDown = (
  <svg
    className="arrow-down-mobile"
    width="11"
    height="7"
    viewBox="0 0 11 7"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M1 1L5.5 5.09091L10 1" stroke="white" strokeWidth="1.63636" strokeLinecap="round" />
  </svg>
);

const StyledDropdown = styled.div`
  @media (max-width: ${MEDIUM_SCREEN}) {
    .profile-image {
      display: none;
    }
  }

  > button {
    all: unset;
    display: flex;
    align-items: center;
    border-radius: 50px;
    background-color: #161615;
    padding: 4px;
  }
  .d-inline-block {
    width: unset !important;
    height: unset !important;
    img {
      border-radius: 50% !important;
      width: 38px !important;
      height: 38px !important;
    }
  }

  i {
    color: #a1a09a;
    margin: 0 5px 0 0;
  }

  .profile-info {
    margin: 0 8px;
    line-height: normal;
    max-width: 110px;
    font-size: 12px;

    .profile-name,
    .profile-username {
      text-overflow: ellipsis;
      overflow: hidden;
    }

    .profile-name {
      color: white;
    }
    .profile-username {
      color: #a1a09a;
    }
  }
  @media (max-width: ${MEDIUM_SCREEN}) {
    .drop-down-trigger-button {
      border: 1px solid #ebf479;
      border-radius: 6px;
    }
    .profile-info {
      margin: 0 8px;
      line-height: normal;
      max-width: 110px;
      font-size: 12px;

      color: white;

      .profile-name,
      .profile-username {
        text-overflow: ellipsis;
        overflow: hidden;
      }

      .profile-name {
        color: white;
      }
      .profile-username {
        color: white;
      }
    }

    .arrow-down-pc {
      color: white;
    }
  }

  .DropdownMenuContent {
    min-width: 220px;
    background-color: #161615;
    border-radius: 6px;
    margin-top: 11px;
    padding: 5px;
    box-shadow: 0px 10px 38px -10px rgba(22, 23, 24, 0.35), 0px 10px 20px -15px rgba(22, 23, 24, 0.2);
    animation-duration: 600ms;
    animation-timing-function: cubic-bezier(0.16, 1, 0.3, 1);
    will-change: transform, opacity;
    z-index: 10000000;
  }
  .DropdownMenuContent[data-side='top'] {
    animation-name: slideDownAndFade;
  }
  .DropdownMenuContent[data-side='right'] {
    animation-name: slideLeftAndFade;
  }
  .DropdownMenuContent[data-side='bottom'] {
    animation-name: slideUpAndFade;
  }
  .DropdownMenuContent[data-side='left'] {
    animation-name: slideRightAndFade;
  }

  .DropdownMenuItem {
    all: unset;
    font-size: 13px;
    line-height: 1;
    color: #9ba1a6;
    border-radius: 3px;
    display: flex;
    align-items: center;
    padding: 10px;
    position: relative;
    padding-left: 25px;
    user-select: none;
    outline: none;
  }

  .DropdownMenuItem:hover {
    color: white;
    cursor: pointer;
  }

  .DropdownMenuItem i {
    font-size: 20px;
    margin-right: 10px;
  }

  @keyframes slideUpAndFade {
    from {
      opacity: 0;
      transform: translateY(2px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes slideRightAndFade {
    from {
      opacity: 0;
      transform: translateX(-2px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }

  @keyframes slideDownAndFade {
    from {
      opacity: 0;
      transform: translateY(-2px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes slideLeftAndFade {
    from {
      opacity: 0;
      transform: translateX(2px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }
`;

export const UserDropdownMenu = () => {
  const accountId = useAuthStore((store) => store.accountId);
  const availableStorage = useAuthStore((store) => store.availableStorage);
  const logOut = useAuthStore((store) => store.logOut);
  const near = useVmStore((store) => store.near);
  const router = useRouter();
  const components = useBosComponents();

  const withdrawStorage = useCallback(async () => {
    if (!near) return;
    await near.contract.storage_withdraw({}, undefined, '1');
  }, [near]);

  return (
    <StyledDropdown>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger className="drop-down-trigger-button">
          <div className="profile-image">
            <VmComponent
              src={components.profileImage}
              props={{
                accountId,
                className: 'd-inline-block',
              }}
            />
          </div>

          <div className="profile-info">
            <div className="profile-name">
              <VmComponent src={components.profileName} />
            </div>
            <div className="profile-username">{accountId}</div>
          </div>
          <i className="ph ph-caret-down arrow-down-pc "></i>
        </DropdownMenu.Trigger>

        <DropdownMenu.Content className="DropdownMenuContent" sideOffset={-5}>
          <DropdownMenu.Item
            className="DropdownMenuItem"
            onClick={() => router.push(`/${components.profilePage}?accountId=${accountId}`)}
          >
            <i className="ph-duotone ph-user"></i>
            Profile
          </DropdownMenu.Item>
          <DropdownMenu.Item className="DropdownMenuItem" onClick={() => withdrawStorage()}>
            <i className="ph-duotone ph-bank"></i>
            {availableStorage && `Withdraw ${availableStorage.div(1000).toFixed(2)}kb}`}
          </DropdownMenu.Item>
          <DropdownMenu.Item className="DropdownMenuItem" onClick={() => logOut()}>
            <i className="ph-duotone ph-sign-out"></i>
            Sign out
          </DropdownMenu.Item>

          <DropdownMenu.Arrow style={{ fill: '#161615' }} />
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </StyledDropdown>
  );
};
