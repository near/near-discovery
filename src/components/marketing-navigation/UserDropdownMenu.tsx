import { Dropdown, SvgIcon } from '@near-pagoda/ui';
import { Bank, Gear, SignOut, User, Wallet } from '@phosphor-icons/react';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';

import { useBosComponents } from '@/hooks/useBosComponents';
import { useAuthStore } from '@/stores/auth';
import { useVmStore } from '@/stores/vm';

import { NftImage } from '../NTFImage';
import { useContext } from 'react';
import { NearContext } from '../WalletSelector';
import { signInContractId } from '@/utils/config';

const Wrapper = styled.div`
  flex-grow: 1;

  .user-icon-trigger {
    border-radius: 4px;
    height: 36px;
    height: 36px;
    > * {
      margin: auto;
    }
  }

  > button {
    all: unset;
    box-sizing: border-box;
    display: flex;
    width: 100%;
    align-items: center;
    border-radius: 50px;
    background-color: var(--sand12);
    padding: 4px;
    transition: all 200ms;
    overflow: hidden;

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
  }

  i {
    color: #a1a09a;
    margin-left: auto;
    padding-right: 0.5rem;
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
  }
`;

type Props = {
  collapsed?: boolean;
};

export const UserDropdownMenu = ({ collapsed }: Props) => {
  const { wallet, signedAccountId } = useContext(NearContext);
  const availableStorage: bigint = useAuthStore((store) => store.availableStorage);
  const router = useRouter();
  const components = useBosComponents();

  const withdrawStorage = useCallback(async () => {
    if (!wallet) return;
    await wallet.callMethod({ contractId: signInContractId, method: 'storage_withdraw', deposit: '1' });
  }, [wallet]);

  const [profile, setProfile] = useState<any>({});

  useEffect(() => {
    async function getProfile() {
      const profile = await wallet.viewMethod({
        contractId: 'social.near',
        method: 'get',
        args: { keys: [`${signedAccountId}/profile/**`] },
      });
      setProfile(profile[signedAccountId].profile);
    }

    if (!wallet || !signedAccountId) return;

    getProfile();
  }, [wallet, signedAccountId]);

  return (
    <Wrapper>
      <Dropdown.Root>
        {collapsed ? (
          <Dropdown.Trigger className="user-icon-trigger">
            <SvgIcon icon={<User />} color="sand1" />
          </Dropdown.Trigger>
        ) : (
          <Dropdown.Trigger>
            <NftImage
              nft={profile.image?.nft}
              ipfs_cid={profile.image?.ipfs_cid}
              alt={profile.name || signedAccountId}
            />
            <div className="profile-info">
              <div className="profile-name">{profile.name}</div>
              <div className="profile-username">{signedAccountId}</div>
            </div>
            <i className="ph ph-caret-right"></i>
          </Dropdown.Trigger>
        )}

        <Dropdown.Content sideOffset={10}>
          <Dropdown.Item onSelect={() => router.push(`/${components.profilePage}?accountId=${signedAccountId}`)}>
            <SvgIcon icon={<User weight="duotone" />} />
            Profile
          </Dropdown.Item>
          <Dropdown.Item onSelect={() => router.push(`/wallet-utilities`)}>
            <SvgIcon icon={<Wallet weight="duotone" />} />
            Wallet Utilities
          </Dropdown.Item>
          {availableStorage && availableStorage > BigInt(0) && (
            <Dropdown.Item onSelect={() => withdrawStorage()}>
              <SvgIcon icon={<Bank weight="duotone" />} />
              {`Withdraw ${availableStorage / BigInt(1000)}kb`}
            </Dropdown.Item>
          )}
          <Dropdown.Item onSelect={() => wallet.signOut()}>
            <SvgIcon icon={<SignOut weight="regular" />} />
            Sign out
          </Dropdown.Item>
        </Dropdown.Content>
      </Dropdown.Root>
    </Wrapper>
  );
};
