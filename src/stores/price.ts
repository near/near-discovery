import { create } from 'zustand';

type PriceState = {
  price: { [key: string]: string };
};

type PriceStore = PriceState & {
  set: (update: PriceState) => void;
};

export const myPriceStore = create<PriceStore>((set) => ({
  price: {},
  set: (params) => set(() => ({ ...params })),
}));
