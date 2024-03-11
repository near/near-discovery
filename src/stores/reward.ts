import { create } from 'zustand';

type RewardState = {
  reward: { [key: string]: string };
};

type RewardStore = RewardState & {
  set: (update: RewardState) => void;
};

export const useRewardStore = create<RewardStore>((set) => ({
  reward: {},
  set: (params) => set(() => ({ ...params })),
}));
