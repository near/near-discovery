import chainCofig from '@/config/all-in-one/chains';
import { StyledBgContainer, StyledBgBox, StyledBgBoxWrapper, StyledBgBoxList, StyledBgIcon } from './styles';

const chains = Object.values(chainCofig);

const Bg = () => {
  return (
    <StyledBgContainer>
      <StyledBgBoxWrapper>
        <StyledBgBox className="animation right">
          {[1, 2].map((item) => (
            <StyledBgBoxList key={item}>
              {chains.map((chain) => (
                <StyledBgIcon key={chain.chainId} src={chain.bgIcon || chain.icon} />
              ))}
            </StyledBgBoxList>
          ))}
        </StyledBgBox>
      </StyledBgBoxWrapper>
      <StyledBgBoxWrapper>
        <StyledBgBox className="animation left">
          {[1, 2].map((item) => (
            <StyledBgBoxList key={item}>
              {chains.map((chain) => (
                <StyledBgIcon key={chain.chainId} src={chain.bgIcon || chain.icon} />
              ))}
            </StyledBgBoxList>
          ))}
        </StyledBgBox>
      </StyledBgBoxWrapper>
    </StyledBgContainer>
  );
};

export default Bg;
