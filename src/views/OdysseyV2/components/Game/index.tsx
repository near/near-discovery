import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import useGame from '../../hooks/useGame';
import useStart from '../../hooks/useStart';
import GameLabel from './Label';
import Header from './Header';
import Card from './Card';
import Footer from './Footer';
import Start from './Start';
import NoEnergy from './NoEnergy';
import Complete from './Complete';
import Rules from './Rules';
import { StyledContainer, StyledCardList } from './styles';

export default function Game({ availableSpins, unclaimedReward, onRefreshDetail }: any) {
  const [modalType, setModalType] = useState(0);
  const { cards, onFilp, start, onStart, posting, count, reward } = useGame(() => {
    onRefreshDetail();
    setModalType(2);
  });
  const { loading: starting, onStartReport } = useStart(() => {
    onStart();
    onRefreshDetail();
  });

  const handlePlay = () => {
    if (availableSpins === 0) {
      setModalType(1);
      return;
    }
    if (!starting) onStartReport();
  };

  return (
    <StyledContainer>
      <GameLabel />
      <Header
        onOpenRules={() => {
          if (modalType === 0) setModalType(3);
        }}
      />
      <StyledCardList>
        {cards.map((card: any, i: number) => (
          <Card
            key={card.i}
            index={card.key}
            flip={card.filp}
            onClick={() => {
              if (!card.filp) onFilp(card, i);
            }}
          />
        ))}
        <AnimatePresence mode="wait" key={modalType}>
          {!start && <Start starting={starting} onStart={handlePlay} />}
          {modalType === 1 && (
            <NoEnergy
              onClose={() => {
                setModalType(0);
              }}
            />
          )}
          {modalType === 2 && (
            <Complete
              amount={reward}
              count={count}
              onClose={() => {
                setModalType(0);
              }}
              onPlayAgain={() => {
                setModalType(0);
                handlePlay();
              }}
            />
          )}
          {modalType === 3 && (
            <Rules
              onClose={() => {
                setModalType(0);
              }}
            />
          )}
        </AnimatePresence>
      </StyledCardList>
      <Footer
        availableSpins={availableSpins}
        unclaimedReward={unclaimedReward}
        onSuccess={() => {
          onRefreshDetail();
        }}
      />
    </StyledContainer>
  );
}
