import styled from 'styled-components';
import RefBadge from '../RefComponents/RefBadge';

const RefOrgHomePageDapps = () => {
  return (
    <div>
      <Title>The most popular Dapps</Title>
      <Desc>Make your DeFi actions simple, fast and traceable</Desc>
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

export default RefOrgHomePageDapps;
