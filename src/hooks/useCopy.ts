import { useCallback } from 'react';

import { copyText } from '@/utils/copy';

import useToast from './useToast';

export default function useCopy() {
  const toast = useToast();
  const copy = useCallback((text: string) => {
    copyText(text, () => {
      toast.success({ title: `${text} copied!` });
    });
  }, []);

  return { copy };
}
