import { memo, useMemo } from 'react';

import useInviteCode from '@/components/AccountSider/hooks/useInviteCode';
import Loading from '@/components/Icons/Loading';
import Modal from '@/components/Modal';
import useCopy from '@/hooks/useCopy';
import { ellipsAccount } from '@/utils/account';

import useRewardsClaim from '../../hooks/useRewardsClaim';
import type { Column } from '../Pts/types';
import InviteCode from './InviteCode';
import {
  Empty,
  LoadingWrapper,
  StyledAvatar,
  StyledBody,
  StyledCell,
  StyledClaimButton,
  StyledColumn,
  StyledCopyButton,
  StyledDesc,
  StyledDescBox,
  StyledHeader,
  StyledNewCodes,
  StyledRewards,
  StyledRow,
  StyledSubTitle,
  StyledTableHeader,
  StyledTitle,
  StyledUserAddress,
  StyledUserName,
} from './styles';

export const COLUMNS: Column[] = [
  {
    label: 'Invite friends',
    width: 40,
    key: 'friend',
    gap: 26,
    align: 'left',
  },
  {
    label: 'Code used',
    width: 20,
    key: 'code',
    align: 'center',
  },
  {
    label: 'Status',
    width: 20,
    key: 'status',
    align: 'center',
  },
  {
    label: 'Your reward',
    width: 20,
    key: 'rewards',
    align: 'right',
  },
];

const Friend = ({ username, address, avatar }: { username: string; address: string; avatar: string }) => {
  return (
    <>
      <StyledAvatar src={avatar} />
      <div>
        <StyledUserName>{username}</StyledUserName>
        <StyledUserAddress>{ellipsAccount(address)}</StyledUserAddress>
      </div>
    </>
  );
};

const InviteFirendsModal = ({
  open,
  list,
  totalRewards,
  reward,
  onClose,
}: {
  list: any;
  totalRewards: number;
  reward: number;
  open: boolean;
  onClose: VoidFunction;
}) => {
  const { list: codeList, loading } = useInviteCode(open);
  const { copy } = useCopy();
  const newCodes = useMemo(() => codeList.filter((code, i) => !code.is_used), [codeList]);
  const { loading: claiming, handleClaim } = useRewardsClaim();
  return (
    <Modal
      display={open}
      title={<StyledTitle>Invite</StyledTitle>}
      width={954}
      onClose={onClose}
      content={
        <>
          <StyledHeader>
            <StyledSubTitle>New code</StyledSubTitle>
            <StyledCopyButton
              onClick={() => {
                copy(newCodes.map((code) => code.code).join(','), 'Copied');
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
                <g clip-path="url(#clip0_1078_5958)">
                  <path
                    d="M8.5595 5.70475C8.62475 6.18775 8.62475 6.78175 8.62475 7.429V8.5465C8.62475 8.695 8.62475 8.7685 8.67275 8.8135C8.72075 8.85775 8.79275 8.8525 8.93675 8.842C9.05559 8.83358 9.17414 8.82158 9.29225 8.806C9.77225 8.7415 10.1705 8.61175 10.5065 8.33575C10.6267 8.23728 10.737 8.12725 10.8357 8.00725C11.1267 7.6525 11.2543 7.228 11.3158 6.71275C11.375 6.21025 11.375 5.57575 11.375 4.77475V4.726C11.375 3.925 11.375 3.28975 11.315 2.788C11.255 2.272 11.1268 1.84825 10.835 1.4935C10.7375 1.3735 10.6265 1.26325 10.5065 1.16425C10.1517 0.87325 9.72725 0.74575 9.212 0.68425C8.7095 0.625 8.075 0.625 7.27475 0.625H7.226C6.425 0.625 5.7905 0.625 5.288 0.685C4.77275 0.745 4.34825 0.87325 3.9935 1.165C3.8735 1.2625 3.76325 1.3735 3.665 1.4935C3.389 1.8295 3.26 2.2285 3.19475 2.7085C3.17975 2.8195 3.16775 2.938 3.15875 3.06325C3.14825 3.20725 3.143 3.27925 3.18725 3.32725C3.23225 3.37525 3.30575 3.37525 3.45425 3.37525H4.57175C5.219 3.37525 5.81225 3.37525 6.29675 3.4405C6.82925 3.51175 7.39325 3.6805 7.85675 4.144C8.32025 4.6075 8.489 5.1715 8.56025 5.704L8.5595 5.70475Z"
                    fill="white"
                  />
                  <path
                    d="M3.97275 4.125H4.52775C5.211 4.125 5.76225 4.125 6.19575 4.1835C6.64575 4.2435 7.0245 4.37325 7.326 4.674C7.62675 4.9755 7.7565 5.35425 7.8165 5.80425C7.875 6.23775 7.875 6.789 7.875 7.47225V8.02725C7.875 8.71125 7.875 9.2625 7.8165 9.696C7.7565 10.146 7.62675 10.5248 7.326 10.8255C7.0245 11.127 6.64575 11.256 6.19575 11.3167C5.76225 11.3752 5.211 11.3752 4.52775 11.3752H3.97275C3.28875 11.3752 2.7375 11.3752 2.304 11.3167C1.854 11.2567 1.47525 11.127 1.1745 10.8255C0.873 10.5255 0.744 10.146 0.68325 9.696C0.62475 9.2625 0.62475 8.71125 0.62475 8.02725V7.47225C0.62475 6.789 0.62475 6.23775 0.68325 5.80425C0.74325 5.35425 0.873 4.9755 1.1745 4.674C1.4745 4.37325 1.854 4.2435 2.304 4.1835C2.7375 4.125 3.28875 4.125 3.97275 4.125Z"
                    fill="white"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_1078_5958">
                    <rect width="12" height="12" fill="white" transform="matrix(-1 0 0 1 12 0)" />
                  </clipPath>
                </defs>
              </svg>
              <span>Copy All</span>
            </StyledCopyButton>
          </StyledHeader>
          {loading ? (
            <LoadingWrapper style={{ height: 116 }}>
              <Loading size={30} />
            </LoadingWrapper>
          ) : newCodes.length > 0 ? (
            <StyledNewCodes>
              {newCodes.map((code) => (
                <InviteCode key={code.code} code={code.code} />
              ))}
            </StyledNewCodes>
          ) : (
            <Empty>No codes.</Empty>
          )}

          <StyledHeader>
            <StyledSubTitle>Invited friends ({list.length})</StyledSubTitle>
          </StyledHeader>
          <StyledDescBox>
            <StyledDesc>
              You invited {list.length} friends, 6 of them are active, you will get {reward} PTS for each active
              account.
            </StyledDesc>
            <StyledClaimButton
              disabled={claiming || totalRewards === 0}
              onClick={() => {
                handleClaim();
              }}
            >
              {claiming && <Loading />}
              Claim {totalRewards} PTS
            </StyledClaimButton>
          </StyledDescBox>
          <StyledTableHeader>
            {COLUMNS.map((column) => (
              <StyledColumn key={column.key} $width={column.width} $align={column.align}>
                {column.label}
              </StyledColumn>
            ))}
          </StyledTableHeader>
          <StyledBody>
            {list.map((row: any) => (
              <StyledRow key={row.code}>
                {COLUMNS.map((column) => (
                  <StyledCell key={column.key} $width={column.width} $gap={column.gap} $align={column.align}>
                    {column.key === 'friend' && <Friend {...row.invited_user} />}
                    {column.key === 'code' && <span className="delete">{row.code}</span>}
                    {column.key === 'status' && (row.status === 'Pending' ? row.status + '...' : row.status)}
                    {column.key === 'rewards' &&
                      (row.reward ? (
                        <StyledRewards style={{ color: row.is_claimed ? 'rgba(235, 244, 121, 0.3)' : '#ebf479' }}>
                          {row.reward} PTS
                        </StyledRewards>
                      ) : (
                        <span className="rewards">-</span>
                      ))}
                  </StyledCell>
                ))}
              </StyledRow>
            ))}
          </StyledBody>
        </>
      }
    />
  );
};

export default memo(InviteFirendsModal);
