import { useChainsStore } from '@/stores/chains';

import Banner from './components/Banner';
import Actions from './components/Actions';
import Compass from './components/Compass';
import Decentralised from './components/Decentralised';
import DiscoveryDapps from './components/DiscoveryDapps';
import QuickOnboarding from './components/️QuickOnboarding ';
import SeamlessNavigation from './components/SeamlessNavigation';
import TrendingEthereum from './components/TrendingEthereum';
import Learn from './components/Learn';
import { StyledContainer } from './styles';

const Home = () => {
  const chains = useChainsStore((store: any) => store.chains);
  return (
    <StyledContainer>
      <Banner />
      <Actions />
      {/* <Compass /> */}
      <DiscoveryDapps />
      <TrendingEthereum chains={chains} />
      <QuickOnboarding />
      <SeamlessNavigation chains={chains} />
      <Decentralised />
      <Learn />
    </StyledContainer>
  );
};

export default Home;
