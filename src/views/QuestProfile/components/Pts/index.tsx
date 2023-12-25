import { format } from 'date-fns';
import { AnimatePresence, motion } from 'framer-motion';
import { memo } from 'react';

import { container } from '@/components/animation';
import Loading from '@/components/Icons/Loading';

import useClaimedList from '../../hooks/useClaimedList';
import {
  Empty,
  LoadingWrapper,
  StyledBody,
  StyledCell,
  StyledCoin,
  StyledColumn,
  StyledContainer,
  StyledHeader,
  StyledPageBox,
  StyledPageButton,
  StyledPageButtons,
  StyledPageDesc,
  StyledQuestIcon,
  StyledQuestIconBox,
  StyledQuestRewards,
  StyledQuestTitle,
  StyledRewards,
  StyledRow,
} from './styles';
import type { Column } from './types';

export const COLUMNS: Column[] = [
  {
    label: 'Quest',
    width: 60,
    key: 'quest',
    gap: 26,
    align: 'left',
  },
  {
    label: 'Reward',
    width: 60,
    key: 'reward',
    align: 'center',
  },
  {
    label: 'Claimed time',
    width: 20,
    key: 'time',
    align: 'center',
  },
];

const Quest = ({ logo, name, reward }: any) => {
  return (
    <>
      <StyledQuestIconBox>
        <StyledQuestIcon src={logo} />
      </StyledQuestIconBox>
      <div>
        <StyledQuestTitle>{name}</StyledQuestTitle>
        <StyledQuestRewards>
          <StyledCoin $size={19} />
          <span>{reward}</span>
        </StyledQuestRewards>
      </div>
    </>
  );
};

const Pts = () => {
  const { loading, list, page, maxPage, handlePageChange } = useClaimedList();
  return (
    <AnimatePresence mode="wait">
      <motion.div {...container}>
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
              <Loading size={40} />
            </LoadingWrapper>
          ) : list.length > 0 ? (
            <>
              <StyledBody>
                {list.map((row: any) => (
                  <StyledRow key={row.id}>
                    {COLUMNS.map((column) => (
                      <StyledCell key={column.key} $width={column.width} $gap={column.gap} $align={column.align}>
                        {column.key === 'quest' && <Quest {...row} />}
                        {column.key === 'reward' && <StyledRewards>{row.reward}</StyledRewards>}
                        {column.key === 'time' && <span>{format(row.claim_time * 1000, 'MMM dd,yyyy,HH:mm')}</span>}
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
            <Empty>No Data.</Empty>
          )}
        </StyledContainer>
      </motion.div>
    </AnimatePresence>
  );
};

export default memo(Pts);
