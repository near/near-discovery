import Campaign from '@/views/Quest/components/Campaign';
import QuestLists from '@/views/Quest/components/QuestLists';

import { memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import { container } from '@/components/animation';

const Quests = ({ onLoad, id }: { onLoad: (id: string) => void; id?: string }) => {
  return (
    <AnimatePresence mode="wait">
      <motion.div {...container}>
        <Campaign onLoad={onLoad} />
        <QuestLists id={id} />
      </motion.div>
    </AnimatePresence>
  );
};

export default memo(Quests);
