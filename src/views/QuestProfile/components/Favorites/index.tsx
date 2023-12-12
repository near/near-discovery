import { AnimatePresence,motion } from 'framer-motion';
import { memo } from 'react';

import { container } from '@/components/animation';
import Loading from '@/components/Icons/Loading';

import useFavoriteDapps from '../../hooks/useFavoriteDapps';
import useFavorites from '../../hooks/useFavorites';
import { QuestPanel } from '../Quests';
import FavoriteDapp from './FavoriteDapp';
import { Empty,LoadingWrapper, StyledContainer, StyledDapps, StyledTitle } from './styles';

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
