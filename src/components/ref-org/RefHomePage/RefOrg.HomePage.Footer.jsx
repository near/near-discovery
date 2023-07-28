import refAsset from '../RefComponents/RefAsset';
import styled from 'styled-components';

const RefOrgHomePageFooter = () => {
  return (
    <div className={'d-flex justify-content-between align-items-center'}>
      <div className={'d-flex gap-3'}>
        <Nav>BOS</Nav>
        <Nav>near</Nav>
        <Nav>Docs</Nav>
      </div>
      <div className={'d-flex gap-3'}>
        <Icon
          style={{
            background: 'linear-gradient(180deg, #EEF3BF 0%, #E9F456 100%)',
          }}
        >
          {refAsset.svg.twitter}
        </Icon>
        <Icon>{refAsset.svg.telegram}</Icon>
        <Icon>{refAsset.svg.discord}</Icon>
        <Icon>{refAsset.svg.medium}</Icon>
      </div>
    </div>
  );
};

const Nav = styled.div``;

const Icon = styled.div`
  border-radius: 12px;
  border: 1px solid #494d69;
  padding: 10px 13px;
`;

export default RefOrgHomePageFooter;
