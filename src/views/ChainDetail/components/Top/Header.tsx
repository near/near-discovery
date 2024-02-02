import { memo } from 'react';
import AddMetaMask from '../AddMetaMask';
import Actions from './Actions';
import {
  StyledHeaderWrapper,
  StyledTitleWrapper,
  StyledChainLogoWrapper,
  StyledChainLogo,
  StyledChainName,
} from './styles';

const Header = ({ logo, name, chainId, bgColor, path, id }: any) => {
  return (
    <StyledHeaderWrapper>
      <StyledTitleWrapper>
        <StyledChainLogoWrapper style={{ backgroundColor: bgColor }}>
          <StyledChainLogo src={logo} />
        </StyledChainLogoWrapper>
        <div>
          <StyledChainName>{name}</StyledChainName>
          <AddMetaMask chainId={chainId} bp="100121-001" />
        </div>
      </StyledTitleWrapper>
      <Actions path={path} id={id} />
    </StyledHeaderWrapper>
  );
};

export default memo(Header);
