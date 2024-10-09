import { Dropdown, SvgIcon } from '@near-pagoda/ui';
import { Bank, SignOut, User, Wallet } from '@phosphor-icons/react';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';
import { useContext } from 'react';
import styled from 'styled-components';

import { signInContractId } from '@/config';
import { useBosComponents } from '@/hooks/useBosComponents';

import { NftImage } from '../NTFImage';
import RoundedImage from '../RoundedImage';
import { NearContext } from '../wallet-selector/WalletSelector';

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

const parseNftImage = (nft: any, owner_id: string, title: string | null = null) => {
  return {
    contract_id: nft.contractId as string,
    token_id: nft.tokenId as string,
    owner_id,
    metadata: {
      title: title || owner_id,
      description: null,
      media: null,
      media_hash: null,
      copies: null,
      issued_at: null,
      expires_at: null,
      starts_at: null,
      updated_at: null,
      extra: null,
      reference: null,
      reference_hash: null,
    },
    approved_account_ids: null,
  };
};

export const UserDropdownMenu = ({ collapsed }: Props) => {
  const { wallet, signedAccountId } = useContext(NearContext);
  const router = useRouter();
  const components = useBosComponents();

  const [availableStorage, setAvailableStorage] = useState<bigint>(BigInt(0));

  const withdrawStorage = useCallback(async () => {
    if (!wallet) return;
    await wallet.callMethod({ contractId: signInContractId, method: 'storage_withdraw', deposit: '1' });
  }, [wallet]);

  const [profile, setProfile] = useState<any>({});

  useEffect(() => {
    async function getProfile() {
      const profile = await wallet?.viewMethod({
        contractId: signInContractId,
        method: 'get',
        args: { keys: [`${signedAccountId}/profile/**`] },
      });
      if (!profile[signedAccountId]) return;
      setProfile(profile[signedAccountId].profile);
    }

    async function getAvailableStorage() {
      const storage: any = await wallet?.viewMethod({
        contractId: signInContractId,
        method: 'storage_balance_of',
        args: { account_id: signedAccountId },
      });
      if (storage) setAvailableStorage(BigInt(storage.available) / BigInt(10 ** 19));
    }

    if (!wallet || !signedAccountId) return;
    getProfile();
    getAvailableStorage();
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
            {profile.image?.nft ? (
              <NftImage nft={parseNftImage(profile.image.nft, signedAccountId, profile.name)} />
            ) : (
              <RoundedImage
                src={`https://ipfs.near.social/ipfs/${profile?.image?.ipfs_cid}`}
                alt={profile.name || signedAccountId}
              />
            )}
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
          <Dropdown.Item onSelect={() => wallet?.signOut()}>
            <SvgIcon icon={<SignOut weight="regular" />} />
            Sign out
          </Dropdown.Item>
        </Dropdown.Content>
      </Dropdown.Root>
    </Wrapper>
  );
};
