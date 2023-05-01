import { create } from "zustand";

type CurrentWidgetStore = {
  widgetSrc: string | null;
  setWidgetSrc: (widgetSrc: string | null) => void;
};

export const useCurrentWidgetStore = create<CurrentWidgetStore>((set) => ({
  widgetSrc: null,
  setWidgetSrc: (widgetSrc) => set(() => ({ widgetSrc })),
}));
