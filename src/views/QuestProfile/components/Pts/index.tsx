import { motion, AnimatePresence } from 'framer-motion';
import { memo } from 'react';
import { container } from '@/components/animation';
import { format } from 'date-fns';
import Loading from '@/components/Icons/Loading';
import useClaimedList from '../../hooks/useClaimedList';

import {
  StyledContainer,
  StyledHeader,
  StyledColumn,
  StyledBody,
  StyledCell,
  StyledRow,
  StyledRewards,
  StyledQuestIconBox,
  StyledQuestIcon,
  StyledQuestTitle,
  StyledQuestRewards,
  StyledCoin,
  LoadingWrapper,
  Empty,
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
  const { loading, list } = useClaimedList();
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
            <StyledBody>
              {list.map((row: any) => (
                <StyledRow key={row.id}>
                  {COLUMNS.map((column) => (
                    <StyledCell key={column.key} $width={column.width} $gap={column.gap} $align={column.align}>
                      {column.key === 'quest' && <Quest {...row} />}
                      {column.key === 'reward' && <StyledRewards>{row.reward}</StyledRewards>}
                      {column.key === 'time' && <span>{format(row.claimed_at, 'MMM dd,yyyy,HH:mm')}</span>}
                    </StyledCell>
                  ))}
                </StyledRow>
              ))}
            </StyledBody>
          ) : (
            <Empty>No Data.</Empty>
          )}
        </StyledContainer>
      </motion.div>
    </AnimatePresence>
  );
};

export default memo(Pts);
