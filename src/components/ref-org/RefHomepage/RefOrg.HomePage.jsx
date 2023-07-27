import styles from './RefOrg.HomePage.module.css';
import refAsset from '../RefComponents/RefAsset';
import styled from 'styled-components';
import RefImage from '../RefComponents/RefImage';
import RefContainer from '../RefComponents/RefContainer';
import RefOrgHomePageCards from './RefOrg.HomePage.Cards';
import RefGradientBackground from '../RefComponents/RefGradientBackground';
import RefOrgHomePageFeature from './RefOrg.HomePage.Feature';
import { MEDIUM_SCREEN } from '../RefStyleVar';
import RefOrgHomePageIdentity from '@/components/ref-org/RefHomepage/RefOrg.HomePage.Identity';
import RefOrgHomePagePowered from '@/components/ref-org/RefHomepage/RefOrg.HomePage.Powered';
import RefOrgHomePageFooter from './RefOrg.HomePage.Footer';
import RefOrgHomePagePopularDapps from './RefOrg.HomePage.PopularDapps';

export function RefOrgHomePage() {
  return (
    <div className={styles['ref-org-homepage']}>
      <Section padding={'40px 0 0px'}>
        <RefContainer>
          <Text size={'60px'} lineHeight={'normal'} weight={700}>
            Decentralized One-stop shop
            <RefImage src={refAsset.img.iconShop} alt={'near'} width={106} height={103} />
          </Text>
          <Text size={'60px'} lineHeight={'normal'} weight={700}>
            The Easiest way to <RefImage src={refAsset.img.iconGoogle} alt={'near'} width={106} height={103} />
            Dive into Web3.0
          </Text>
          <Text margin={'25px 0 0'} size={'26px'}>
            Join a growing family of <b>12,345</b> community members
          </Text>
        </RefContainer>
      </Section>

      <RefOrgHomePageCards />

      <Section>
        <RefContainer>
          <Text size={'60px'}>All you need,</Text>
          <Text size={'60px'}>
            <span style={{ marginRight: 10 }}>is</span>
            <RefGradientBackground
              style={{ borderRadius: 16, display: 'inline-block', padding: '1px 20px', color: '#000', fontWeight: 700 }}
              gradients={'180deg, #EEF3BF 0%, #E9F456 100%'}
            >
              All-in-one
            </RefGradientBackground>
          </Text>
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
          padding: '93px 0 39px',
        }}
      >
        <RefContainer>
          <RefOrgHomePageFooter />
        </RefContainer>
      </Section>
    </div>
  );
}

const Section = styled.div`
  position: relative;
  padding: ${(p) => p.padding ?? '154px 0 77px'};
  justify-content: center;
  text-align: center;
`;

const Text = styled.div`
  font-family: 'Gantari', sans-serif;
  font-size: ${(p) => p.size ?? '18px'};
  line-height: ${(p) => p.lineHeight ?? '1.5'};
  font-weight: ${(p) => p.weight ?? '400'};
  color: ${(p) => p.color ?? '#fff'};
  margin: ${(p) => p.margin ?? 0};

  @media (max-width: ${MEDIUM_SCREEN}) {
    font-size: 50px;
  }
`;
