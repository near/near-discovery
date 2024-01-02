import { AnimatePresence, motion } from 'framer-motion';
import { memo } from 'react';

import { container } from '@/components/animation';

import Table, { PTS, User } from '../Table';
import { COLUMNS } from '../Table/config';
import Total from '../Total';
import {
  StyledCell,
  StyledContainer,
  StyledCurrentRow,
  StyledHeader,
  StyledRefreshIcon,
  StyledTitle,
  StyledUpdateButton,
} from './styles';

const Leaderboard = ({
  loading,
  list,
  page,
  info,
  maxPage,
  handlePageChange,
  userLoading,
  handleRefresh,
  userInfo,
}: any) => {
  return (
    <AnimatePresence mode="wait">
      <motion.div {...container}>
        <StyledContainer>
          <StyledHeader>
            <StyledTitle>Leaderboard</StyledTitle>
            <StyledUpdateButton
              onClick={() => {
                handleRefresh();
              }}
            >
              <StyledRefreshIcon className={(loading || userLoading) && 'loading'}>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path
                    d="M3.66135 8.30123C3.38153 9.3438 3.3632 10.4393 3.608 11.4906C3.8528 12.542 4.35316 13.5167 5.06474 14.3284C5.77633 15.1401 6.67716 15.7638 7.68741 16.1441C8.69766 16.5244 9.78613 16.6497 10.8564 16.5087C11.1011 16.4798 11.3474 16.5485 11.5419 16.6998C11.7364 16.8511 11.8635 17.0729 11.8957 17.3173C11.9279 17.5616 11.8626 17.8088 11.7139 18.0053C11.5653 18.2019 11.3452 18.332 11.1014 18.3675C9.72558 18.5486 8.32636 18.3877 7.02765 17.8989C5.72895 17.41 4.57085 16.6085 3.65595 15.5651C2.74106 14.5218 2.09761 13.2689 1.78261 11.9175C1.46762 10.5661 1.4908 9.15781 1.8501 7.81748L0.731352 7.51748C0.689922 7.50659 0.651985 7.48523 0.621182 7.45546C0.590379 7.42569 0.567743 7.38851 0.555445 7.34747C0.543147 7.30644 0.5416 7.26293 0.550952 7.22112C0.560304 7.17932 0.580242 7.14062 0.608852 7.10873L3.7176 3.60373C3.74833 3.56885 3.78818 3.54322 3.83266 3.52973C3.87715 3.51624 3.92452 3.51543 3.96944 3.52737C4.01437 3.53932 4.05508 3.56356 4.08699 3.59736C4.1189 3.63116 4.14076 3.67319 4.1501 3.71873L5.08885 8.30998C5.09726 8.35161 5.09493 8.3947 5.08207 8.43518C5.06921 8.47566 5.04625 8.5122 5.01535 8.54134C4.98445 8.57049 4.94664 8.59128 4.90548 8.60176C4.86432 8.61224 4.82117 8.61206 4.7801 8.60123L3.66135 8.30123ZM16.3376 11.7C16.6174 10.6574 16.6358 9.56192 16.391 8.51058C16.1462 7.45924 15.6458 6.48452 14.9342 5.6728C14.2226 4.86107 13.3218 4.23742 12.3115 3.8571C11.3013 3.47678 10.2128 3.35154 9.1426 3.49248C9.01971 3.51038 8.89449 3.50369 8.77421 3.47279C8.65393 3.44189 8.54099 3.3874 8.44194 3.31249C8.3429 3.23757 8.25972 3.14373 8.19725 3.0364C8.13477 2.92907 8.09425 2.8104 8.07802 2.68728C8.06179 2.56416 8.07018 2.43904 8.10271 2.3192C8.13524 2.19935 8.19126 2.08715 8.26751 1.98913C8.34377 1.89112 8.43873 1.80922 8.5469 1.74821C8.65506 1.6872 8.77427 1.64829 8.8976 1.63373C10.2734 1.45258 11.6726 1.61354 12.9713 2.10235C14.27 2.59117 15.4281 3.39275 16.343 4.43608C17.2579 5.47942 17.9013 6.7323 18.2163 8.08372C18.5313 9.43515 18.5082 10.8434 18.1489 12.1837L19.2676 12.4837C19.309 12.4946 19.347 12.516 19.3778 12.5458C19.4086 12.5755 19.4312 12.6127 19.4435 12.6537C19.4558 12.6948 19.4574 12.7383 19.448 12.7801C19.4387 12.8219 19.4187 12.8606 19.3901 12.8925L16.2814 16.3975C16.2506 16.4324 16.2108 16.458 16.1663 16.4715C16.1218 16.485 16.0744 16.4858 16.0295 16.4738C15.9846 16.4619 15.9439 16.4377 15.912 16.4039C15.8801 16.3701 15.8582 16.328 15.8489 16.2825L14.9101 11.6912C14.9017 11.6496 14.904 11.6065 14.9169 11.566C14.9297 11.5256 14.9527 11.489 14.9836 11.4599C15.0145 11.4307 15.0523 11.4099 15.0935 11.3995C15.1346 11.389 15.1778 11.3892 15.2189 11.4L16.3376 11.7Z"
                    fill="#979ABE"
                  />
                </svg>
              </StyledRefreshIcon>
              <span>Update every 15 mins</span>
            </StyledUpdateButton>
          </StyledHeader>
          <Total info={info} />
          {userInfo.address && (
            <StyledCurrentRow>
              {COLUMNS.map((column) => (
                <StyledCell key={column.key} $width={column.width} $gap={column.gap} $align={column.align}>
                  {column.key === 'rank' && `#${userInfo.rank}`}
                  {column.key === 'user' && <User user={userInfo.address} avatar={userInfo.avatar} />}
                  {column.key === 'pts' && <PTS pts={userInfo.reward} />}
                </StyledCell>
              ))}
            </StyledCurrentRow>
          )}
          <Table list={list} maxPage={maxPage} page={page} handlePageChange={handlePageChange} loading={loading} />
        </StyledContainer>
      </motion.div>
    </AnimatePresence>
  );
};

export default memo(Leaderboard);
