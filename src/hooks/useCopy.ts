import { useCallback } from 'react';
import useToast from './useToast';

import { copyText } from '@/utils/copy';

export default function useCopy() {
  const toast = useToast();
  const copy = useCallback((text: string) => {
    copyText(text, () => {
      toast.success({ title: `${text} copied!` });
    });
  }, []);

  return { copy };
}
