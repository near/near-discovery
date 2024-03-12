import { useEffect, useState } from 'react';
import { useDebounceFn } from 'ahooks';
import useAccount from '@/hooks/useAccount';
import useAuthCheck from '@/hooks/useAuthCheck';
import { getCompassDetail } from '../http/index';

export interface SummaryData {
  participants: number;
  winners: string[];
  totalRewardsPts: number;
  totalSpins: number;
  availableSpins: number;
  unclaimedReward: number;
  description: string;
  name: string;
  setTotalSpins: (arg: number) => void;
  setAvailableSpins: (arg: number) => void;
  setUnclaimedReward: (arg: number) => void;
  getDetail: () => void;
}

export default function useSummary(id: string): SummaryData {
  const [description, setDescription] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [participants, setParticipants] = useState<number>(0);
  const [winners, setWinners] = useState<string[]>([]);
  const [totalRewardsPts, setTotalRewardsPts] = useState<number>(0);
  const [totalSpins, setTotalSpins] = useState<number>(0);
  const [availableSpins, setAvailableSpins] = useState<number>(0);
  const [unclaimedReward, setUnclaimedReward] = useState<number>(0);
  const { account } = useAccount();
  const { check } = useAuthCheck({ isNeedAk: true, isQuiet: true });

  function getDetail() {
    getCompassDetail(id).then((data: any) => {
      if (data) {
        setParticipants(data.total_users || 0);
        setWinners(data.winners);
        setTotalRewardsPts(data.claimed_reward || 0);
        setDescription(data.description);
        setName(data.name);
        if (data.user) {
          const { user } = data;
          setTotalSpins(user.total_spins || 0);
          setAvailableSpins(user.available_spins || 0);
          setUnclaimedReward(user.unclaimed_reward || 0);
        }
      }
    });
  }

  const { run } = useDebounceFn(
    () => {
      if (!account) {
        getDetail();
        return;
      }
      check(getDetail);
    },
    { wait: name ? 800 : 3000 },
  );

  useEffect(() => {
    if (id) run();
  }, [id, account]);

  return {
    participants,
    winners,
    totalRewardsPts,
    totalSpins,
    availableSpins,
    unclaimedReward,
    setTotalSpins,
    setAvailableSpins,
    setUnclaimedReward,
    description,
    name,
    getDetail,
  };
}
