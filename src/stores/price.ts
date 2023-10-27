import { create } from 'zustand';

type PriceState = {
  price: { [key: string]: string };
};

type PriceStore = PriceState & {
  set: (update: PriceState) => void;
};

export const usePriceStore = create<PriceStore>((set) => ({
  price: {},
  set: (params) => set(() => ({ ...params })),
}));
