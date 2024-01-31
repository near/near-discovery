import { memo, useMemo } from 'react';
import Milestones from '../Milestones';
import { StyledMorePanel, StyledTags, StyledTag, StyledTagLabel, StyledTagValue, StyledChainDesc } from './styles';

const NativeCurrency = ({ nativeCurrency }: any) => {
  const mergedCurrency = useMemo<any>(() => {
    if (!nativeCurrency) return {};
    return JSON.parse(nativeCurrency);
  }, [nativeCurrency]);
  return (
    <>
      {mergedCurrency?.logo && <img src={mergedCurrency?.logo} alt="" className="token-img" />}
      <span>{mergedCurrency?.symbol}</span>
    </>
  );
};

const MorePanel = ({ technology, tbd_token, nativeCurrency, milestones, subname }: any) => {
  return (
    <StyledMorePanel>
      <StyledTags>
        <StyledTag>
          <StyledTagLabel>Technology</StyledTagLabel>
          <StyledTagValue>{technology || '-'}</StyledTagValue>
        </StyledTag>
        <StyledTag>
          <StyledTagLabel>Native Token</StyledTagLabel>
          <StyledTagValue>
            {tbd_token === 'Y' ? 'TBD🔥' : <NativeCurrency nativeCurrency={nativeCurrency} />}
          </StyledTagValue>
        </StyledTag>
      </StyledTags>
      <StyledChainDesc>{subname}</StyledChainDesc>
      <Milestones milestones={milestones} />
    </StyledMorePanel>
  );
};

export default memo(MorePanel);
