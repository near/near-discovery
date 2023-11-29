import Campaign from '@/views/Quest/components/Campaign';
import QuestLists from '@/views/Quest/components/QuestLists';

import { memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import { container } from '@/components/animation';

const Quests = () => {
  return (
    <AnimatePresence mode="wait">
      <motion.div {...container}>
        <Campaign />
        <QuestLists />
      </motion.div>
    </AnimatePresence>
  );
};

export default memo(Quests);
