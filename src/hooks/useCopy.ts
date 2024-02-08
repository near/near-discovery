import { useCallback } from 'react';

import { copyText } from '@/utils/copy';

import useToast from './useToast';

export default function useCopy() {
  const toast = useToast();
  const copy = useCallback((text: string, msg?: string) => {
    copyText(text, () => {
      toast.success({ title: msg || `${text} copied!` });
    });
  }, []);

  return { copy };
}
