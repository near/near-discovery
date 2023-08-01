import styled from 'styled-components';
import RefBadge from '../RefComponents/RefBadge';
import { HIDE_LINE_SCREEN, HorizontalLine, TopLine, VerticalLine } from '@/components/ref-org/RefComponents/RefLine';
import { StyledT2, StyledT4 } from '@/components/ref-org/RefStyled';
import { MEDIUM_SCREEN } from '@/components/ref-org/RefStyleVar';
import RefGradientBall from '@/components/ref-org/RefComponents/RefGradientBall';

const RefOrgHomePageIdentity = () => {
  return (
    <div>
      <div className={'position-relative'}>
        <div className={'position-relative'}>
          <VerticalLine
            style={{
              height: 137,
              top: -166,
              left: 71,
            }}
          />
          <StyledGradientBall />
        </div>

        <HorizontalLine
          style={{
            left: 148,
            top: -154,
            width: 435,
          }}
        />

        <Info>
          <Column>
            <StyledBadge background={'linear-gradient(45deg, #FAFFD0, #DEC338)'}>Analytics</StyledBadge>
            <Title>Keep track of DeFi ecosystem</Title>
            <Desc>Tracking and analyzing blockchain data for more insights.</Desc>
          </Column>
          <Column>
            <TopLine
              style={{
                left: -118,
                borderTopRightRadius: 'var(--radius)',
                borderLeftWidth: 0,
              }}
            />
            <StyledBadge background={'linear-gradient(45deg, #FAFFD0, #DEC338)'}>Identity</StyledBadge>
            <Title>Contribute with Web3 enthusiasts</Title>
            <Desc>Make your DeFi actions simple, fast and traceable.</Desc>
          </Column>
        </Info>
      </div>
    </div>
  );
};

const Info = styled.div`
  display: flex;
  justify-content: space-between;
  position: relative;

  @media (max-width: ${MEDIUM_SCREEN}) {
    flex-direction: column;
  }
`;

const Column = styled.div`
  padding: 0 20px;
  text-align: left;
  max-width: 483px;
  position: relative;

  @media (max-width: ${MEDIUM_SCREEN}) {
    padding: 0 5px;
    text-align: center;
    margin: 0 auto 60px;
  }
`;

const StyledBadge = styled(RefBadge)`
  margin-bottom: 20px;
`;

const Title = styled(StyledT2)`
  text-transform: capitalize;
  line-height: 1.2;
  margin-bottom: 13px;
`;

const Desc = styled(StyledT4)``;

const StyledGradientBall = styled(RefGradientBall)`
  position: absolute;
  top: -29px;
  left: 66px;

  @media (max-width: ${HIDE_LINE_SCREEN}) {
    display: none !important;
  }
`;

export default RefOrgHomePageIdentity;
