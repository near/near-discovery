import { AnimatePresence,motion } from 'framer-motion';
import { memo } from 'react';

import { container } from '@/components/animation';
import Campaign from '@/views/Quest/components/Campaign';
import QuestLists from '@/views/Quest/components/QuestLists';

const Quests = ({
  onLoad,
  id,
  campaignLoading,
  campaigns,
  questingLoading,
  quests,
  categoryLoading,
  categories,
}: any) => {
  return (
    <AnimatePresence mode="wait">
      <motion.div {...container}>
        <Campaign
          onLoad={onLoad}
          loading={campaignLoading}
          campaigns={campaigns}
          categoryLoading={categoryLoading}
          categories={categories}
        />
        <QuestLists id={id} loading={questingLoading} quests={quests} />
      </motion.div>
    </AnimatePresence>
  );
};

export default memo(Quests);
