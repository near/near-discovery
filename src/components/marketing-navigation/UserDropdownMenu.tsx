// import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { Dropdown, SvgIcon } from '@near-pagoda/ui';
import { Bank, Gear, SignOut, User, Wallet } from '@phosphor-icons/react';
import { useRouter } from 'next/router';
import { useCallback } from 'react';
import styled from 'styled-components';

import { VmComponent } from '@/components/vm/VmComponent';
import { useBosComponents } from '@/hooks/useBosComponents';
import { useAuthStore } from '@/stores/auth';
import { useVmStore } from '@/stores/vm';

const Wrapper = styled.div`
  flex-grow: 1;

  > button {
    all: unset;
    box-sizing: border-box;
    display: flex;
    width: 100%;
    align-items: center;
    border-radius: 50px;
    background-color: var(--sand12);
    padding: 4px;
    padding-right: 1rem;
    transition: all 200ms;

    &:hover {
      background-color: var(--black);
    }

    &:focus {
      box-shadow: 0 0 0 4px var(--violet4);
    }
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
    margin-left: auto;
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

  @media (max-width: 800px) {
    .profile-info,
    .ph {
      display: none;
    }

    > button {
      background: var(--sand6);
      padding: 1px;
    }

    .d-inline-block {
      img {
        width: 43px !important;
        height: 43px !important;
      }
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
    <Wrapper>
      <Dropdown.Root>
        <Dropdown.Trigger>
          <VmComponent
            src={components.profileImage}
            props={{
              accountId,
              className: 'd-inline-block',
            }}
          />
          <div className="profile-info">
            <div className="profile-name">
              <VmComponent src={components.profileName} />
            </div>
            <div className="profile-username">{accountId}</div>
          </div>
          <i className="ph ph-caret-down"></i>
        </Dropdown.Trigger>

        <Dropdown.Content sideOffset={10}>
          <Dropdown.Item onSelect={() => router.push(`/${components.profilePage}?accountId=${accountId}`)}>
            <SvgIcon icon={<User weight="duotone" />} />
            Profile
          </Dropdown.Item>
          <Dropdown.Item onSelect={() => router.push(`/settings`)}>
            <SvgIcon icon={<Gear weight="duotone" />} />
            Settings
          </Dropdown.Item>
          <Dropdown.Item onSelect={() => router.push(`/wallet-utilities`)}>
            <SvgIcon icon={<Wallet weight="duotone" />} />
            Wallet Utilities
          </Dropdown.Item>
          <Dropdown.Item onSelect={() => withdrawStorage()}>
            <SvgIcon icon={<Bank weight="duotone" />} />
            {availableStorage && `Withdraw ${availableStorage.div(1000).toFixed(2)}kb`}
          </Dropdown.Item>
          <Dropdown.Item onSelect={() => logOut()}>
            <SvgIcon icon={<SignOut weight="regular" />} />
            Sign out
          </Dropdown.Item>
        </Dropdown.Content>
      </Dropdown.Root>
    </Wrapper>
  );
};
