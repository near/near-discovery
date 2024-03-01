import { useEffect, useState } from 'react';
import useCheck from '../../hooks/useCheck';
import { useLayoutStore } from '@/stores/layout';
import { useAllInOneTabCachedStore } from '@/stores/all-in-one';
import useDappOpen from '@/hooks/useDappOpen';
import Card from '../Card';
import ArrowIcon from '../ArrowIcon';
import RefreshButton from '../RefreshButton';
import CardFlip from '../CardFlip';
import {
  StyledTop,
  StyledDappWrapper,
  StyledDappIcon,
  StyledDappTitleWrapper,
  StyledDappTitle,
  StyledDappDesc,
  StyledFooter,
  StyledExecution,
  StyledFooterActions,
} from './styles';

const ICON_MAP: any = {
  'Li.Fi': 'https://s3.amazonaws.com/dapdap.prod/images/lifi.png',
  Stargate: 'https://s3.amazonaws.com/dapdap.prod/images/stargate.png',
};

export default function DappCard({
  id,
  operators,
  name,
  category_name,
  source,
  description,
  times,
  spins,
  total_spins,
  onRefreshDetail,
}: any) {
  const [execution, setExecution] = useState(times);
  const { checking, handleRefresh } = useCheck({ id, total_spins, times, spins }, (_times: number) => {
    onRefreshDetail();
    setExecution(_times);
  });
  const { open: dappOpen } = useDappOpen();
  const setLayout = useLayoutStore((store?: any) => store.set);
  const setCachedTab = useAllInOneTabCachedStore((store: any) => store.setCachedTab);

  const handleDappRedirect = (dapp: any) => {
    dapp.route && dappOpen({ dapp: { ...dapp, route: `/${dapp.route}` }, from: 'quest', isCurrentTab: false });
  };

  const onItemClick = () => {
    if (operators?.length) {
      handleDappRedirect(operators[0]);
      return;
    }
    if (source === 'wallet/bridge') {
      setLayout({
        showAccountSider: true,
        defaultTab: 'bridge',
      });
      return;
    }
    if (category_name === 'Bridge' && name === 'Stargate') {
      setCachedTab(category_name, 59144);
    }
    if (!source) return;
    window.open(source, '_blank');
  };

  useEffect(() => {
    console.log(73);
    setExecution(times);
  }, [times]);

  return (
    <Card onClick={onItemClick}>
      <StyledTop>
        <StyledDappWrapper>
          <StyledDappIcon src={ICON_MAP[name] || operators?.[0]?.dapp_logo} />
          <StyledDappTitleWrapper>
            <StyledDappTitle>{name}</StyledDappTitle>
            <StyledDappDesc>{description}</StyledDappDesc>
          </StyledDappTitleWrapper>
        </StyledDappWrapper>
        <ArrowIcon style={{ marginTop: '6px' }} />
      </StyledTop>
      <StyledFooter>
        <StyledExecution>Execution: {execution}</StyledExecution>
        <StyledFooterActions>
          <RefreshButton
            onClick={(ev: any) => {
              ev.stopPropagation();
              if (!checking) handleRefresh();
            }}
          />
          <CardFlip amount={spins * execution} />
        </StyledFooterActions>
      </StyledFooter>
    </Card>
  );
}
