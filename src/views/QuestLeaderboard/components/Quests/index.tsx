import Campaign from '@/views/Quest/components/Campaign';
import QuestLists from '@/views/Quest/components/QuestLists';

import { memo } from 'react';
import { motion } from 'framer-motion';

import { container } from '@/components/animation';

const Quests = () => {
  return (
    <motion.div initial="hidden" animate="show" variants={container}>
      <Campaign />
      <QuestLists />
    </motion.div>
  );
};

export default memo(Quests);
