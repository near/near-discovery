import { AnimatePresence, motion } from 'framer-motion';
import { memo } from 'react';

import { container } from '@/components/animation';
import Campaign from '@/views/Quest/components/Campaign';
import QuestLists from '@/views/Quest/components/QuestLists';

import { StyledContainer } from './styles';
const Quests = ({
  onLoad,
  id,
  campaignLoading,
  campaigns,
  questingLoading,
  quests,
  categoryLoading,
  categories,
  userInfo,
}: any) => {
  return (
    <AnimatePresence mode="wait">
      <motion.div {...container}>
        <Campaign
          onLoad={onLoad}
          loading={campaignLoading}
          campaigns={campaigns.filter(campaign => campaign.category === '')}
          categoryLoading={categoryLoading}
          categories={categories}
        />
        <StyledContainer>
          <QuestLists id={id} loading={questingLoading} quests={quests} achieved={userInfo?.achieved} />
        </StyledContainer>
      </motion.div>
    </AnimatePresence>
  );
};

export default memo(Quests);
