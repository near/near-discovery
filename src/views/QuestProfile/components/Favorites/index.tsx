import { motion, AnimatePresence } from 'framer-motion';
import { memo } from 'react';
import { container } from '@/components/animation';
import Loading from '@/components/Icons/Loading';

import FavoriteDapp from './FavoriteDapp';
import { QuestPanel } from '../Quests';
import { StyledContainer, StyledTitle, StyledDapps, LoadingWrapper, Empty } from './styles';

import useFavorites from '../../hooks/useFavorites';
import useFavoriteDapps from '../../hooks/useFavoriteDapps';

const Favorites = () => {
  const { loading, list, info } = useFavorites();
  const { loading: dappLoading, list: dappList } = useFavoriteDapps();
  return (
    <AnimatePresence mode="wait">
      <motion.div {...container}>
        <StyledContainer>
          <StyledTitle>Your favorite Dapps ({list.length})</StyledTitle>
          {dappLoading ? (
            <LoadingWrapper>
              <Loading size={40} />
            </LoadingWrapper>
          ) : dappList.length > 0 ? (
            <StyledDapps>
              {dappList.map((dapp: any) => (
                <FavoriteDapp key={dapp.id} {...dapp} />
              ))}
            </StyledDapps>
          ) : (
            <Empty>No Apps.</Empty>
          )}

          <QuestPanel title="Your favorite quests" info={info} list={list} loading={loading} />
        </StyledContainer>
      </motion.div>
    </AnimatePresence>
  );
};

export default memo(Favorites);
