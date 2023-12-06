import { memo } from 'react';

import { ellipsAccount } from '@/utils/account';
import { balanceShortFormated } from '@/utils/balance';
import Loading from '@/components/Icons/Loading';

import { COLUMNS, RANK_COLORS } from './config';
import {
  StyledContainer,
  StyledHeader,
  StyledColumn,
  StyledBody,
  StyledCell,
  StyledRow,
  StyledRankIcon,
  StyledUserAvatar,
  StyledCoin,
  StyledPageBox,
  StyledPageDesc,
  StyledPageButtons,
  StyledPageButton,
  LoadingWrapper,
  Empty,
} from './styles';

export const Rank = ({ rank }: { rank: number }) => {
  return (
    <>
      <StyledRankIcon>
        {rank < 4 && (
          <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25" fill="none">
            <path
              d="M20.6407 15.1593C21.6627 17.5953 22.6468 20.0472 23.5925 22.5139C23.3842 22.7102 23.3333 22.8241 23.2305 22.8639C23.1815 22.8823 23.1273 22.8807 23.0795 22.8593L18.4388 20.7852L16.3842 24.4796C16.3406 24.5578 16.2753 24.6217 16.1961 24.6636C16.117 24.7054 16.0274 24.7234 15.9382 24.7154C15.8491 24.7073 15.7641 24.6736 15.6937 24.6183C15.6233 24.563 15.5705 24.4884 15.5416 24.4037L13.6842 18.9352C16.6657 19.1222 18.9833 17.8639 20.6407 15.1593ZM4.36844 15.1C5.97955 17.8537 8.29529 19.1315 11.3157 18.9352L9.45825 24.4037C9.42935 24.4884 9.37651 24.563 9.30611 24.6183C9.23571 24.6736 9.15079 24.7073 9.06162 24.7154C8.97245 24.7234 8.88287 24.7054 8.80371 24.6636C8.72456 24.6217 8.65924 24.5578 8.61566 24.4796L6.56011 20.7852L1.9277 22.8565C1.8773 22.879 1.82006 22.8806 1.76844 22.8611C1.66011 22.8204 1.60548 22.7 1.40918 22.5019C2.21844 20.3565 3.20455 17.8889 4.36844 15.1ZM12.3194 0C17.0944 0 20.9666 3.9287 20.9666 8.77407C20.9666 13.6204 17.0944 17.5481 12.3184 17.5481C7.54344 17.5481 3.67214 13.6204 3.67214 8.77407C3.67214 3.9287 7.54344 0 12.3194 0ZM11.9462 3.55556L11.9027 3.62685L10.5805 6.34537L7.60918 6.78333C7.53096 6.79476 7.45697 6.82601 7.39426 6.87413C7.33155 6.92225 7.2822 6.98562 7.25092 7.05821C7.21963 7.13081 7.20746 7.2102 7.21555 7.28883C7.22364 7.36746 7.25173 7.44271 7.29714 7.50741L7.35177 7.5713L9.50548 9.70093L8.99899 12.7009C8.9857 12.7793 8.99278 12.8597 9.01956 12.9345C9.04634 13.0093 9.09192 13.0759 9.15191 13.128C9.2119 13.1801 9.28428 13.2158 9.36209 13.2319C9.43991 13.2479 9.52053 13.2436 9.59622 13.2194L9.67307 13.187L12.3194 11.7759L14.9657 13.187C15.0357 13.2243 15.1141 13.243 15.1935 13.2413C15.2728 13.2395 15.3504 13.2174 15.4187 13.1771C15.487 13.1367 15.5438 13.0795 15.5837 13.0109C15.6235 12.9422 15.6451 12.8645 15.6462 12.7852L15.6397 12.7019L15.1323 9.70185L17.287 7.5713C17.3433 7.51581 17.3845 7.44683 17.4066 7.37091C17.4287 7.29499 17.431 7.21468 17.4133 7.13762C17.3955 7.06056 17.3584 6.98933 17.3053 6.93072C17.2522 6.8721 17.185 6.82806 17.1101 6.80278L17.0286 6.78426L14.0583 6.34537L12.7351 3.62685C12.7002 3.55529 12.6474 3.49395 12.5818 3.44876C12.5162 3.40357 12.4401 3.37606 12.3608 3.36889C12.2814 3.36172 12.2016 3.37514 12.129 3.40784C12.0564 3.44054 11.9934 3.49141 11.9462 3.55556Z"
              fill={`url(#paint0_linear_928_6455_${rank})`}
            />
            <defs>
              <linearGradient
                id={`paint0_linear_928_6455_${rank}`}
                x1="12.5008"
                y1="0"
                x2="12.5008"
                y2="24.7172"
                gradientUnits="userSpaceOnUse"
              >
                <stop stop-color={RANK_COLORS[rank][0]} />
                <stop offset="1" stop-color={RANK_COLORS[rank][1]} />
              </linearGradient>
            </defs>
          </svg>
        )}
      </StyledRankIcon>
      <span>{rank}</span>
    </>
  );
};

export const User = ({ user, avatar }: { user: string; avatar: string }) => {
  return (
    <>
      <StyledUserAvatar src={avatar} />
      <span>{ellipsAccount(user)}</span>
    </>
  );
};

export const PTS = ({ pts }: { pts: number }) => {
  return (
    <>
      <StyledCoin $size={21} />
      <span>{balanceShortFormated(pts, 1)}</span>
    </>
  );
};

const Table = ({ list, maxPage, page, handlePageChange, loading }: any) => {
  return (
    <StyledContainer>
      <StyledHeader>
        {COLUMNS.map((column) => (
          <StyledColumn key={column.key} $width={column.width} $align={column.align}>
            {column.label}
          </StyledColumn>
        ))}
      </StyledHeader>
      {loading ? (
        <LoadingWrapper>
          <Loading size={60} />
        </LoadingWrapper>
      ) : list.length > 0 ? (
        <>
          <StyledBody>
            {list.map((row: any) => (
              <StyledRow key={row.rank}>
                {COLUMNS.map((column) => (
                  <StyledCell key={column.key} $width={column.width} $gap={column.gap} $align={column.align}>
                    {column.key === 'rank' && <Rank rank={row.rank} />}
                    {column.key === 'user' && <User user={row.user} avatar={row.account.avatar} />}
                    {column.key === 'pts' && <PTS pts={row.reward} />}
                  </StyledCell>
                ))}
              </StyledRow>
            ))}
          </StyledBody>
          <StyledPageBox>
            <StyledPageDesc>
              Page {page} of {maxPage}
            </StyledPageDesc>
            <StyledPageButtons>
              <StyledPageButton
                $disabled={page === 1}
                onClick={() => {
                  page > 1 && handlePageChange(-1);
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="10" height="16" viewBox="0 0 10 16" fill="none">
                  <path d="M9 1L2 8L9 15" stroke="#979ABE" stroke-width="2" strokeLinecap="round" />
                </svg>
              </StyledPageButton>
              <StyledPageButton
                $disabled={page === maxPage}
                onClick={() => {
                  maxPage > page && handlePageChange(1);
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="10" height="16" viewBox="0 0 10 16" fill="none">
                  <path d="M1 1L8 8L1 15" stroke="#979ABE" stroke-width="2" strokeLinecap="round" />
                </svg>
              </StyledPageButton>
            </StyledPageButtons>
          </StyledPageBox>
        </>
      ) : (
        <Empty>No Data</Empty>
      )}
    </StyledContainer>
  );
};

export default memo(Table);
