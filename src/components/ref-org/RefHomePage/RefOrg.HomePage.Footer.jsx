import refAsset from '../RefComponents/RefAsset';
import styled from 'styled-components';

const RefOrgHomePageFooter = () => {
  return (
    <div className={'d-flex flex-column flex-md-row justify-content-md-between align-items-center'}>
      <div className={'d-flex gap-3 mb-3 mb-md-0'}>
        <Nav>BOS</Nav>
        <Nav>near</Nav>
        <Nav>Docs</Nav>
      </div>
      <div className={'d-flex gap-3'}>
        <Icon>{refAsset.svg.twitter}</Icon>
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
  cursor: pointer;
  path {
    fill: #979abe;
  }

  &:hover {
    background: linear-gradient(180deg, #eef3bf 0%, #e9f456 100%);

    path {
      fill: #332c4b;
    }
  }
`;

export default RefOrgHomePageFooter;
