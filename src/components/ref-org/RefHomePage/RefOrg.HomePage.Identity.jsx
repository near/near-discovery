import styled from 'styled-components';
import RefBadge from '../RefComponents/RefBadge';
import { HorizontalLine, TopLine } from '@/components/ref-org/RefComponents/RefLine';

const RefOrgHomePageIdentity = () => {
  return (
    <div>
      <Info>
        <HorizontalLine
          style={{
            left: 148,
            top: -154,
            width: 435,
          }}
        />

        <Column>
          <StyledBadge background={'linear-gradient(45deg, #FAFFD0, #DEC338)'}>Analytics</StyledBadge>
          <Title>Keep track of DeFi ecosystem</Title>
          <Desc>Tracking and analyzing blockchain data for more insights.</Desc>
        </Column>
        <Column>
          <TopLine
            style={{
              left: -111,
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
  );
};

const Info = styled.div`
  display: flex;
  justify-content: space-between;
  position: relative;
`;

const Column = styled.div`
  padding: 0 20px;
  text-align: left;
  max-width: 483px;
  position: relative;

  @media (max-width: 900px) {
  }
`;

const StyledBadge = styled(RefBadge)`
  margin-bottom: 20px;
`;

const Title = styled.div`
  color: #fff;
  font-size: 42px;
  font-style: normal;
  font-weight: 700;
  text-transform: capitalize;
  line-height: 1.2;
  margin-bottom: 13px;
`;

const Desc = styled.div`
  color: #fff;
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
`;

export default RefOrgHomePageIdentity;
