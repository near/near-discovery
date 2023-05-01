import { Widgets } from "@/data/widgets";

export function useWidgets() {
  // TODO: Refactor widgets import to handle dynamic networkId inside hook
  return Widgets;
}
