import { useCallback, useEffect, useState } from 'react';
import { cloneDeep } from 'lodash';
import { post } from '@/utils/http';
import useToast from '@/hooks/useToast';
import { getSignature } from '../helpers';

const LIST = [...Array(18).keys()];

let prevKey: null | number = null;
let prevI: null | number = null;
let filpedPair = 0;
let clickCount = 0;
let locked = false;

export default function useCards(onSuccess: VoidFunction) {
  const [cards, setCards] = useState<any>([]);
  const [start, setStart] = useState(false);
  const [reward, setReward] = useState(0);
  const [posting, setPosting] = useState(false);
  const toast = useToast();

  const postResult = useCallback(async (signature: string) => {
    setPosting(true);
    try {
      const result = await post('/api/compass/flip/finish', { id: 2, signature });
      if (result.code === 0) {
        onSuccess();
        setReward(result.data.reward);
      } else {
        toast.fail({ title: result.msg || 'Submit failed' });
      }
      setPosting(false);
    } catch (err) {
      setPosting(false);
    }
  }, []);

  const onFilp = (card: any, i: number) => {
    if (locked || !start) return;
    clickCount++;
    if (prevKey === null) {
      card.filp = true;
      prevI = i;
      prevKey = card.key;
      cards.splice(i, 1, card);
      setCards(cloneDeep(cards));
      return;
    }
    if (prevKey !== card.key) {
      card.filp = true;
      const _prevI = prevI;
      prevKey = null;
      prevI = null;
      cards.splice(i, 1, card);
      setCards(cloneDeep(cards));
      locked = true;
      setTimeout(() => {
        card.filp = false;
        if (_prevI !== null) cards[_prevI].filp = false;
        cards.splice(i, 1, card);
        locked = false;
        setCards(cloneDeep(cards));
      }, 300);

      return;
    }
    if (prevKey === card.key) {
      card.filp = true;
      prevI = null;
      prevKey = null;
      filpedPair++;
    }
    cards.splice(i, 1, card);
    setCards(cloneDeep(cards));
    if (filpedPair === 9) {
      const signature = getSignature(`times=${clickCount}&time=${Math.ceil(Date.now() / 1000)}`);
      if (signature) postResult(signature);
    }
  };

  const onStart = () => {
    setStart(true);
  };

  useEffect(() => {
    const list = LIST.map((i) => ({ key: i % 9, i })).sort(() => 0.5 - Math.random());
    setCards(list);
  }, []);

  return { cards, start, posting, reward, count: clickCount, onFilp, onStart };
}
