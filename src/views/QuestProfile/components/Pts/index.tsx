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
} from './styles';

import { motion, AnimatePresence } from 'framer-motion';
import { memo } from 'react';
import { container } from '@/components/animation';

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

const data = [
  {
    quest: 1,
    rewards: 20,
    time: 'Sep 12, 2023, 20:45',
  },
  {
    quest: 2,
    rewards: 20,
    time: 'Sep 12, 2023, 20:45',
  },
  {
    quest: 3,
    rewards: 20,
    time: 'Sep 12, 2023, 20:45',
  },
];

const Quest = () => {
  return (
    <>
      <StyledQuestIconBox>
        <StyledQuestIcon />
      </StyledQuestIconBox>
      <div>
        <StyledQuestTitle>Newbie</StyledQuestTitle>
        <StyledQuestRewards>
          <StyledCoin $size={19} />
          <span>20</span>
        </StyledQuestRewards>
      </div>
    </>
  );
};

const Pts = () => {
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
          <StyledBody>
            {data.map((row) => (
              <StyledRow key={row.quest}>
                {COLUMNS.map((column) => (
                  <StyledCell key={column.key} $width={column.width} $gap={column.gap} $align={column.align}>
                    {column.key === 'quest' && <Quest />}
                    {column.key === 'reward' && <StyledRewards>{row.rewards}</StyledRewards>}
                    {column.key === 'time' && <span>{row.time}</span>}
                  </StyledCell>
                ))}
              </StyledRow>
            ))}
          </StyledBody>
        </StyledContainer>
      </motion.div>
    </AnimatePresence>
  );
};

export default memo(Pts);
