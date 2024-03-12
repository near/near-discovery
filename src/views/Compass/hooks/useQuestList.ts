import { useEffect, useState } from 'react';
import { getQuestList } from '../http/index';
import { useDebounceFn } from 'ahooks';
import useAccount from '@/hooks/useAccount';
import useAuthCheck from '@/hooks/useAuthCheck';

const DefaultList = {
  twitter: [],
  page: [],
  dapp: [],
};

export default function useQuestList(id: string) {
  const { account } = useAccount();
  const { check } = useAuthCheck({ isNeedAk: true, isQuiet: true });
  const [questList, setQuestList] = useState<any>();

  function getQuestGroupList() {
    return getQuestList(id).then((quest) => {
      setQuestList(quest);
    });
  }

  const { run } = useDebounceFn(
    () => {
      if (!account) {
        getQuestList(id).then((quest) => {
          setQuestList(quest);
        });
        return;
      }
      check(() => {
        getQuestList(id).then((quest) => {
          setQuestList(quest);
        });
      });
    },
    { wait: questList ? 800 : 3000 },
  );

  useEffect(() => {
    run();
  }, [account]);

  return {
    questList: questList || DefaultList,
    getQuestGroupList,
  };
}
