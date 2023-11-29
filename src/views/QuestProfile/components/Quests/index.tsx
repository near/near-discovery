import QuestItem from '@/views/Quest/components/QuestItem';
import { StyledContainer, StyledHeader, StyledTitle, StyledLabels, StyledLabel, StyledQuests } from './styles';

import { motion, AnimatePresence } from 'framer-motion';
import { memo } from 'react';

import { container } from '@/components/animation';

type QuestPanelProps = {
  title?: string;
};

export const QuestPanel = ({ title }: QuestPanelProps) => {
  return (
    <StyledContainer>
      <StyledHeader>
        <StyledTitle>{title} (9)</StyledTitle>
        <StyledLabels>
          <StyledLabel>In process (2)</StyledLabel>
          <StyledLabel>Completed (5)</StyledLabel>
          <StyledLabel>Unclaimed (1)</StyledLabel>
        </StyledLabels>
      </StyledHeader>
      <StyledQuests>
        <QuestItem live={true} claimable={true} mt={30} />
        <QuestItem isCampaign={true} mt={30} />
      </StyledQuests>
    </StyledContainer>
  );
};

const Quests = (props: QuestPanelProps) => {
  return (
    <AnimatePresence mode="wait">
      <motion.div {...container}>
        <QuestPanel {...props} title="Quest of participation" />
      </motion.div>
    </AnimatePresence>
  );
};

export default memo(Quests);
