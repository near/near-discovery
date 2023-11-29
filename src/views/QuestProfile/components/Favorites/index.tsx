import FavoriteDapp from './FavoriteDapp';
import { QuestPanel } from '../Quests';
import { StyledContainer, StyledTitle, StyledDapps } from './styles';

import { motion, AnimatePresence } from 'framer-motion';
import { memo } from 'react';

import { container } from '@/components/animation';

const Favorites = () => {
  return (
    <AnimatePresence mode="wait">
      <motion.div {...container}>
        <StyledContainer>
          <StyledTitle>Your favorite Dapps (5)</StyledTitle>
          <StyledDapps>
            <FavoriteDapp />
          </StyledDapps>
          <QuestPanel title="Your favorite quests" />
        </StyledContainer>
      </motion.div>
    </AnimatePresence>
  );
};

export default memo(Favorites);
