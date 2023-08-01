import refAsset from '../RefComponents/RefAsset';
import styled from 'styled-components';
import RefImage from '../RefComponents/RefImage';
import RefContainer from '../RefComponents/RefContainer';
import RefOrgHomePageCards from './RefOrg.HomePage.Cards';
import RefGradientBackground from '../RefComponents/RefGradientBackground';
import RefOrgHomePageFeature from './RefOrg.HomePage.Feature';
import { LARGE_SCREEN, MEDIUM_SCREEN } from '../RefStyleVar';
import RefOrgHomePageIdentity from './RefOrg.HomePage.Identity';
import RefOrgHomePagePowered from './RefOrg.HomePage.Powered';
import RefOrgHomePageFooter from './RefOrg.HomePage.Footer';
import RefOrgHomePagePopularDapps from './RefOrg.HomePage.PopularDapps';
import { StyledT1, StyledT2, StyledT3 } from '@/components/ref-org/RefStyled';

const MOBILE_SIZE = MEDIUM_SCREEN;
const RefOrgHomePage = () => {
  return (
    <Wrapper>
      <Section padding={'40px 0 0px'}>
        <RefContainer>
          <StyledT1>
            Decentralized One-stop shop
            <StyledIconImage src={refAsset.img.iconShop} alt={'near'} width={106} height={103} />
          </StyledT1>
          <StyledT1>
            The Easiest way to <StyledIconImage src={refAsset.img.iconGoogle} alt={'near'} width={106} height={103} />
            Dive into Web3.0
          </StyledT1>
          <StyledT3 style={{ margin: '25px 0 0' }}>
            Join a growing family of <b>12,345</b> community members
          </StyledT3>
        </RefContainer>
      </Section>

      <RefOrgHomePageCards />

      <Section>
        <RefContainer>
          <StyledT1 style={{ marginBottom: 10 }}>All you need,</StyledT1>
          <StyledT1>
            <span style={{ marginRight: 10 }}>is</span>
            <RefGradientBackground
              style={{ borderRadius: 16, display: 'inline-block', padding: '1px 20px', color: '#000', fontWeight: 700 }}
              gradients={'180deg, #EEF3BF 0%, #E9F456 100%'}
            >
              All-in-one
            </RefGradientBackground>
          </StyledT1>
        </RefContainer>
      </Section>

      <Section>
        <RefContainer>
          <RefOrgHomePageFeature
            title={'Customized and simplified DeFi experience'}
            desc={'Make your DeFi actions simple, fast and traceable.'}
            image={refAsset.animated.dapps}
            btnText={'Discover'}
            tag={'Dapps'}
            withTopLine={false}
            bottomLineHeight={100}
          />
        </RefContainer>
      </Section>

      <Section>
        <RefContainer>
          <RefOrgHomePageFeature
            title={'Bridge with options'}
            desc={'It places security first while maintaining full functionality.'}
            image={refAsset.animated.bridge}
            btnText={'Discover'}
            tag={'Bridge'}
            tagBackground={'linear-gradient(45deg, #5DF2FF, #824BFF) border-box'}
            imageBgGradient={'180deg, #5BF5FF 0%, #8247FF 100%'}
            bottomLineHeight={150}
            isRevert
          />
        </RefContainer>
      </Section>

      <Section>
        <RefContainer>
          <RefOrgHomePageFeature
            title={'Effectively View and manage your assets in one UI'}
            desc={'All your digital assets, swap, buy, sell in control.'}
            image={refAsset.animated.portfolio}
            btnText={'Discover'}
            tag={'Portfolio'}
            tagBackground={'linear-gradient(45deg, #CFFF96, #16FFE1) border-box'}
            imageBgGradient={'180deg, #D0FF95 0%, #11FFE2 100%'}
            bottomLineHeight={100}
          />
        </RefContainer>
      </Section>

      <Section>
        <RefContainer>
          <RefOrgHomePageIdentity />
        </RefContainer>
      </Section>

      <Section padding={'154px 0'}>
        <RefContainer>
          <RefOrgHomePagePopularDapps />
        </RefContainer>
      </Section>

      <Section
        style={{
          backgroundColor: '#E9F456',
          padding: '46px 0',
        }}
      >
        <RefContainer>
          <RefOrgHomePagePowered />
        </RefContainer>
      </Section>

      <Section
        style={{
          padding: '73px 0 39px',
        }}
      >
        <RefContainer>
          <RefOrgHomePageFooter />
        </RefContainer>
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

const StyledIconImage = styled(RefImage)`
  @media (max-width: ${LARGE_SCREEN}) {
    display: none;
  }
`;

export default RefOrgHomePage;
