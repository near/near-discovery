import { AnimatePresence, motion } from 'framer-motion';
import { memo } from 'react';

import { container } from '@/components/animation';
import Loading from '@/components/Icons/Loading';
import Dapps from '@/components/Dapps';
import useFavoriteDapps from '../../hooks/useFavoriteDapps';
import useFavorites from '../../hooks/useFavorites';
import { QuestPanel } from '../Quests';
import { Empty, LoadingWrapper, StyledContainer, StyledTitle } from './styles';

const Favorites = () => {
  const { loading, list, info } = useFavorites();
  const { loading: dappLoading, list: dappList } = useFavoriteDapps();
  return (
    <AnimatePresence mode="wait">
      <motion.div {...container}>
        <StyledContainer>
          <StyledTitle>Your favorite Dapps ({dappList.length || 0})</StyledTitle>
          {dappLoading ? (
            <LoadingWrapper>
              <Loading size={40} />
            </LoadingWrapper>
          ) : dappList.length > 0 ? (
            <Dapps
              dapps={dappList}
              bp={{
                detail: '40012-001',
                dapp: '40012-002',
              }}
            />
          ) : (
            <Empty>No Apps.</Empty>
          )}

          <QuestPanel title="Your favorite quests" info={info} list={list} loading={loading} bp="40012-003" />
        </StyledContainer>
      </motion.div>
    </AnimatePresence>
  );
};

export default memo(Favorites);
