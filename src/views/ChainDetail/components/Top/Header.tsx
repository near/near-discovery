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

const Header = ({ logo, name, chainId, bgColor, path }: any) => {
  return (
    <StyledHeaderWrapper>
      <StyledTitleWrapper>
        <StyledChainLogoWrapper style={{ backgroundColor: bgColor }}>
          <StyledChainLogo src={logo} />
        </StyledChainLogoWrapper>
        <div>
          <StyledChainName>{name}</StyledChainName>
          <AddMetaMask chainId={chainId} />
        </div>
      </StyledTitleWrapper>
      <Actions path={path} />
    </StyledHeaderWrapper>
  );
};

export default memo(Header);
