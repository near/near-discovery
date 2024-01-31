import { memo, useState } from 'react';
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
} from './styles';

const Top = ({ chain }: any) => {
  const [more, setMore] = useState(false);
  return (
    <StyledContainer style={{ color: chain?.bgColor }} className={more ? 'more' : ''}>
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
          {more && (
            <MorePanel
              technology={chain?.technology}
              tbd_token={chain?.tbd_token}
              nativeCurrency={chain?.native_currency}
              milestones={chain?.milestones}
              subname={chain?.sub_name}
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
        />
      </StyledMoreButton>
    </StyledContainer>
  );
};

export default memo(Top);
