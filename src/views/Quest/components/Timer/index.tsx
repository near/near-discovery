import { StyledContainer, StyledItem, StyledValue, StyledDesc } from './styles';

import useCountdown from '@/hooks/useCountdown';

import { memo, useEffect, useState } from 'react';
import { getTimePeriods, toTwo } from '../../helpers';

const Timer = () => {
  const [ready, setReady] = useState(false);
  const { secondsRemaining } = useCountdown(new Date('2023-12-25').getTime() / 1000);
  const timeLeft = getTimePeriods(secondsRemaining);

  useEffect(() => {
    setReady(true);
  }, []);

  return ready ? (
    <StyledContainer>
      <StyledItem>
        <StyledValue>{toTwo(timeLeft.days)}</StyledValue>
        <StyledDesc>Days</StyledDesc>
      </StyledItem>
      <StyledItem>
        <StyledValue>:</StyledValue>
      </StyledItem>
      <StyledItem>
        <StyledValue>{toTwo(timeLeft.hours)}</StyledValue>
        <StyledDesc>Hours</StyledDesc>
      </StyledItem>
      <StyledItem>
        <StyledValue>:</StyledValue>
      </StyledItem>
      <StyledItem>
        <StyledValue>{toTwo(timeLeft.minutes)}</StyledValue>
        <StyledDesc>Mins</StyledDesc>
      </StyledItem>
      <StyledItem>
        <StyledValue>:</StyledValue>
      </StyledItem>
      <StyledItem>
        <StyledValue>{toTwo(timeLeft.seconds)}</StyledValue>
        <StyledDesc>sec</StyledDesc>
      </StyledItem>
    </StyledContainer>
  ) : (
    <div />
  );
};

export default memo(Timer);
