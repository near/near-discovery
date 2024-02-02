import { memo, useState, useMemo } from 'react';
import Breadcrumb from '@/components/Breadcrumb';
import Bg from './Bg';
import Header from './Header';
import MorePanel from './MorePanel';
import MoreButton from '../MoreButton';
import {
  StyledContainer,
  StyledBox,
  StyledBgWrapper,
  StyledBg,
  StyledBgImg,
  StyledContent,
  StyledMoreButton,
  StyledTags,
  StyledTag,
  StyledTagLabel,
  StyledTagValue,
} from './styles';

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

const Top = ({ chain }: any) => {
  const [more, setMore] = useState(false);
  return (
    <StyledContainer style={{ color: chain?.selectBgColor }} className={more ? 'more' : ''}>
      <StyledBox>
        <StyledBgWrapper>
          <StyledBg>
            <Bg />
          </StyledBg>
          <StyledBgImg src={chain.icon} more={more} />
        </StyledBgWrapper>
        <StyledContent>
          <Breadcrumb
            navs={[
              { name: 'Home', path: '/' },
              { name: 'L2 Blockchains', path: '/blockchains' },
              { name: chain?.title, path: '' },
            ]}
          />
          <Header
            bgColor={chain?.bgColor}
            logo={chain?.icon}
            name={chain?.title}
            chainId={chain?.chainId}
            path={chain?.path}
            deepdive={chain?.deepdive}
            id={chain?.id}
          />
          <StyledTags>
            <StyledTag>
              <StyledTagLabel>Technology</StyledTagLabel>
              <StyledTagValue>{chain?.technology || '-'}</StyledTagValue>
            </StyledTag>
            <StyledTag>
              <StyledTagLabel>Native Token</StyledTagLabel>
              <StyledTagValue>
                {chain?.tbd_token === 'Y' ? 'TBD🔥' : <NativeCurrency nativeCurrency={chain?.native_currency} />}
              </StyledTagValue>
            </StyledTag>
          </StyledTags>
          {more && (
            <MorePanel
              technology={chain?.technology}
              tbd_token={chain?.tbd_token}
              nativeCurrency={chain?.native_currency}
              milestones={chain?.milestones}
              subname={chain?.sub_description}
            />
          )}
        </StyledContent>
      </StyledBox>
      <StyledMoreButton>
        <MoreButton
          isMore={more}
          onClick={() => {
            setMore((prev) => !prev);
          }}
          bp="100121-005"
        />
      </StyledMoreButton>
    </StyledContainer>
  );
};

export default memo(Top);
