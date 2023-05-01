import { useWidgets } from "./useWidgets";

export function useTosWidgets() {
  const widgets = useWidgets();

  return {
    checkComponentPath: widgets.tosCheck,
    contentComponentPath: widgets.tosContent,
  };
}
