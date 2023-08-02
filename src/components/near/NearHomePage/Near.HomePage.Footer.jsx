import nearAsset from '../NearComponents/NearAsset';
import styled from 'styled-components';

const NearHomePageFooter = () => {
  return (
    <div className={'d-flex flex-column-reverse flex-md-row justify-content-md-between align-items-center'}>
      <div className={'d-flex gap-md-5 gap-5 mt-4 mb-mt-0'}>
        <Nav>BOS</Nav>
        <Nav>near</Nav>
        <Nav>Docs</Nav>
      </div>
      <div className={'d-flex gap-3'}>
        <Icon>{nearAsset.svg.twitter}</Icon>
        <Icon>{nearAsset.svg.telegram}</Icon>
        <Icon>{nearAsset.svg.discord}</Icon>
        <Icon>{nearAsset.svg.medium}</Icon>
      </div>
    </div>
  );
};

const Nav = styled.div`
  color: #979abe;
  &:hover {
    color: #fff;
  }
`;

const Icon = styled.div`
  border-radius: 12px;
  border: 1px solid #494d69;
  padding: 12px 13px;
  cursor: pointer;
  line-height: 1;

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

export default NearHomePageFooter;
