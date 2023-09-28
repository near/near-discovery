import styled from 'styled-components';

import { StyledT1, StyledT2, StyledT3, StyledT6 } from '@/components/near/NearStyled';

import nearAsset from '../NearComponents/NearAsset';
import NearContainer from '../NearComponents/NearContainer';
import NearGradientBackground from '../NearComponents/NearGradientBackground';
import NearImage from '../NearComponents/NearImage';
import { LARGE_SCREEN, MEDIUM_SCREEN, SMALL_SCREEN } from '../NearStyleVar';
import NearHomePageCards from './Near.HomePage.Cards';
import NearHomePageFeature from './Near.HomePage.Feature';
import NearHomePageFooter from './Near.HomePage.Footer';
import NearHomePageIdentity from './Near.HomePage.Identity';
import NearHomePagePopularDapps from './Near.HomePage.PopularDapps';
import NearHomePagePowered from './Near.HomePage.Powered';

const MOBILE_SIZE = MEDIUM_SCREEN;
const NearHomePage = () => {
  return (
    <Wrapper>
      <Section padding={'40px 0 0px'}>
        <NearContainer>
          {/* <StyledT1>
            Decentralized One-stop shop
            <StyledIconImage src={nearAsset.img.iconShop} alt={'near'} width={106} height={103} />
          </StyledT1> */}
          <StyledT6>
            Your Universal Entry  <StyledIconImage src={nearAsset.img.iconNewHome} alt={'near'} width={130} height={136} style={{ margin: "0 -24px 14px 4px" }} />
            Point Into <span style={{ color: '#EBF479' }}>L2s</span>
          </StyledT6>
          <StyledT3 style={{ margin: '25px 0 0' }}>
            Join a growing family of <b>12,345</b> community members
          </StyledT3>
        </NearContainer>
      </Section>

      <NearHomePageCards />

      <Section>
        <NearContainer>
          <StyledT1 style={{ marginBottom: 10 }}>All you need,</StyledT1>
          <StyledT1>
            <span style={{ marginRight: 10 }}>is</span>
            <NearGradientBackground
              style={{ borderRadius: 16, display: 'inline-block', position: 'relative', marginTop: 10 }}
              gradients={'180deg, #EEF3BF 0%, #E9F456 100%'}
            >
              <AllInOneText>All-in-one</AllInOneText>
              <StyledSweetIcon src={nearAsset.svg.sweat} width={42} height={51} />
            </NearGradientBackground>
          </StyledT1>
        </NearContainer>
      </Section>

      <Section>
        <NearContainer>
          <NearHomePageFeature
            title={'Customized and simplified DeFi experience'}
            desc={'Make your DeFi actions simple, fast and traceable.'}
            image={nearAsset.animated.dapps}
            btnText={'Discover'}
            tag={'Dapps'}
            withTopLine={false}
            bottomLineHeight={100}
            ballGradients={['#A55BFE', '#FD2B94']}
          />
        </NearContainer>
      </Section>

      <Section>
        <NearContainer>
          <NearHomePageFeature
            title={'Bridge with options'}
            desc={'It places security first while maintaining full functionality.'}
            image={nearAsset.animated.bridge}
            btnText={'Discover'}
            tag={'Bridge'}
            tagBackground={'linear-gradient(45deg, #5DF2FF, #824BFF) border-box'}
            imageBgGradient={'180deg, #5BF5FF 0%, #8247FF 100%'}
            bottomLineHeight={150}
            ballGradients={['#5DF2FF', '#824BFF']}
            isRevert
          />
        </NearContainer>
      </Section>

      <Section>
        <NearContainer>
          <NearHomePageFeature
            title={'Effectively View and manage your assets in one UI'}
            desc={'All your digital assets, swap, buy, sell in control.'}
            image={nearAsset.animated.portfolio}
            btnText={'Discover'}
            tag={'Portfolio'}
            tagBackground={'linear-gradient(45deg, #CFFF96, #16FFE1) border-box'}
            imageBgGradient={'180deg, #D0FF95 0%, #11FFE2 100%'}
            ballGradients={['#D0FF95', '#11FFE2']}
            bottomLineHeight={100}
          />
        </NearContainer>
      </Section>

      <Section>
        <NearContainer>
          <NearHomePageIdentity />
        </NearContainer>
      </Section>

      <Section mobilePadding={'60px 0 300px 0'} padding={'154px 0'}>
        <NearContainer>
          <NearHomePagePopularDapps />
        </NearContainer>
      </Section>

      <Section
        className={'mt-5 mt-md-0'}
        style={{
          backgroundColor: '#E9F456',
          padding: '46px 0',
        }}
      >
        <NearContainer>
          <NearHomePagePowered />
        </NearContainer>
      </Section>

      <Section
        style={{
          padding: '73px 0 39px',
        }}
      >
        <NearContainer>
          <NearHomePageFooter />
        </NearContainer>
      </Section>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  color: #fff;
  font-family: 'Gantari', sans-serif;
  overflow: hidden;
  margin: 0 -36px;
  padding: 0;
  @media (max-width: 900px) {
    margin: 0 -4px;
  }
`;

const Section = styled.div`
  position: relative;
  padding: ${(p) => p.padding ?? '154px 0 77px'};
  justify-content: center;
  text-align: center;

  @media (max-width: ${MOBILE_SIZE}) {
    padding: ${(p) => (p.mobilePadding ? p.mobilePadding : '60px 0')};
  }
`;

const StyledIconImage = styled(NearImage)`
  @media (max-width: ${LARGE_SCREEN}) {
    display: none;
  }
`;

const AllInOneText = styled.div`
  padding: 10px 20px 11px;
  color: #000;
  font-weight: 700;
`;

const StyledSweetIcon = styled(NearImage)`
  position: absolute;
  top: -30px;
  right: -40px;

  @media (max-width: ${SMALL_SCREEN}) {
    width: 27px;
    right: -26px;
    display: none;
  }
`;

export default NearHomePage;
