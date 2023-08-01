import nearAsset from '../NearComponents/NearAsset';
import styled from 'styled-components';
import NearImage from '../NearComponents/NearImage';
import NearContainer from '../NearComponents/NearContainer';
import NearHomePageCards from './Near.HomePage.Cards';
import NearGradientBackground from '../NearComponents/NearGradientBackground';
import NearHomePageFeature from './Near.HomePage.Feature';
import { LARGE_SCREEN, MEDIUM_SCREEN } from '../NearStyleVar';
import NearHomePageIdentity from './Near.HomePage.Identity';
import NearHomePagePowered from './Near.HomePage.Powered';
import NearHomePageFooter from './Near.HomePage.Footer';
import NearHomePagePopularDapps from './Near.HomePage.PopularDapps';
import { StyledT1, StyledT2, StyledT3 } from '@/components/near/NearStyled';

const MOBILE_SIZE = MEDIUM_SCREEN;
const NearHomePage = () => {
  return (
    <Wrapper>
      <Section padding={'40px 0 0px'}>
        <NearContainer>
          <StyledT1>
            Decentralized One-stop shop
            <StyledIconImage src={nearAsset.img.iconShop} alt={'near'} width={106} height={103} />
          </StyledT1>
          <StyledT1>
            The Easiest way to <StyledIconImage src={nearAsset.img.iconGoogle} alt={'near'} width={106} height={103} />
            Dive into Web3.0
          </StyledT1>
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
              style={{ borderRadius: 16, display: 'inline-block', padding: '1px 20px', color: '#000', fontWeight: 700 }}
              gradients={'180deg, #EEF3BF 0%, #E9F456 100%'}
            >
              All-in-one
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
            bottomLineBallGradients={['#5DF2FF', '#824BFF']}
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
            bottomLineHeight={100}
          />
        </NearContainer>
      </Section>

      <Section>
        <NearContainer>
          <NearHomePageIdentity />
        </NearContainer>
      </Section>

      <Section padding={'154px 0'}>
        <NearContainer>
          <NearHomePagePopularDapps />
        </NearContainer>
      </Section>

      <Section
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
  margin: 0 -36px;
  overflow: hidden;
`;

const Section = styled.div`
  position: relative;
  padding: ${(p) => p.padding ?? '154px 0 77px'};
  justify-content: center;
  text-align: center;

  @media (max-width: ${MOBILE_SIZE}) {
    padding: 60px 0 !important;
  }
`;

const StyledIconImage = styled(NearImage)`
  @media (max-width: ${LARGE_SCREEN}) {
    display: none;
  }
`;

export default NearHomePage;
