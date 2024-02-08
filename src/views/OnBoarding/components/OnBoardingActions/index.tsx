import { memo } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { container } from '@/components/animation';
import Total from './Total';
import Actions from './Actions';
import { StyledContainer } from './styles';

const OnBoardingActions = ({ chain, openModal }: any) => {
  return (
    <AnimatePresence mode="wait">
      <motion.div {...container}>
        <StyledContainer>
          <Total chainId={chain.chainId} />
          <Actions
            chainId={chain.chainId}
            bgColor={chain?.selectBgColor}
            chainName={chain?.title}
            openModal={openModal}
          />
        </StyledContainer>
      </motion.div>
    </AnimatePresence>
  );
};

export default memo(OnBoardingActions);
