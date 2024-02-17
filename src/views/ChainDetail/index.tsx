import { memo, useMemo, useEffect } from 'react';

import chainsConfig, { PathToId } from '@/config/all-in-one/chains';
import useReport from '@/views/Landing/hooks/useReport';
import useDetail from './hooks/useDetail';

import Top from './components/Top';
import QuickOnboarding from './components/QuickOnboarding';
import Dapps from './components/Dapps';
import Quests from './components/Quests';
import { StyledContainer } from './styles';

const ChainDetail = ({ path }: any) => {
  const { loading, detail, hotDapps, quests } = useDetail(PathToId[path]);
  const { handleReport } = useReport();
  const currentChain = useMemo(() => {
    return chainsConfig[path];
  }, [path]);

  useEffect(() => {
    if ([4, 6].includes(Number(PathToId[path]))) {
      handleReport(`network/${path}`);
    }
  }, [path]);

  return (
    <StyledContainer>
      <Top chain={{ ...currentChain, ...detail }} />
      <QuickOnboarding path={path} />
      <Dapps dapps={hotDapps} chainName={currentChain.title} />
      <Quests quests={quests} />
    </StyledContainer>
  );
};

export default memo(ChainDetail);
