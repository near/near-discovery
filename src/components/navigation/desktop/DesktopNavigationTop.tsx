import styled from 'styled-components';

export const DesktopNavigationTop = () => {
  const Container = styled.div`
    color: #979abe;
    padding: 26px 36px 76px 36px;
    display: flex;
    align-items: center;
  `;

  const LogoContainer = styled.div`
    flex: 1;
  `;

  const MenuContainer = styled.div`
    flex: 1;
    display: flex;
    justify-content: center;
    font-family: Gantari;
    font-size: 18px;
    font-weight: 500;
    line-height: 22px;
    letter-spacing: 0em;
    text-align: left;
  `;

  const LoginBoxContainer = styled.div`
    flex: 1;
    display: flex;
    justify-content: flex-end;
  `;

  const logoUrl = 'https://ipfs.near.social/ipfs/bafkreifzlmyfwus3t24c5xwz5hg5j4p7tk2pa4lisq4qkxuyky5huxkz6e';

  return (
    <Container>
      <LogoContainer>
        <img src={logoUrl} alt="" />
      </LogoContainer>
      <MenuContainer>
        <div className="container-menu-item">Home</div>
      </MenuContainer>
      <LoginBoxContainer>
        登陆
      </LoginBoxContainer>
    </Container>
  );
};
