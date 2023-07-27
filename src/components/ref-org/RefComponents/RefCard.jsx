import RefImage from './RefImage';
import styled from 'styled-components';

const RefCard = ({ bg, title, subTitle, icon, avatar, children, rightText, className }) => {
  return (
    <Container className={className}>
      <RefImage src={bg} width={500} height={192} />
      <Content>
        <Header>
          {icon && (
            <Icon>
              <RefImage src={icon} width={72} height={72} />
            </Icon>
          )}
          <HeaderContent>
            <div>
              <Title>{title}</Title>
              <SubTitle>
                {avatar && (
                  <Avatar>
                    <StyledImage src={avatar} width={20} height={20} />
                  </Avatar>
                )}
                {subTitle}
              </SubTitle>
            </div>

            <HeaderRight>{rightText}</HeaderRight>
          </HeaderContent>
        </Header>
        {children && <div>{children}</div>}
      </Content>
    </Container>
  );
};

const Container = styled.div`
  border-radius: 20px;
  background: #373a53;
  overflow: hidden;
`;

const Content = styled.div`
  padding: 5px 15px 15px;
`;

const Header = styled.div`
  display: flex;
`;

const Icon = styled.div`
  border-radius: 20px;
  background: #373a53;
  margin-top: -30px;
  padding: 8px;
  margin-right: 10px;
`;

const Avatar = styled.div`
  margin-right: 10px;
  border-radius: 50%;
  overflow: hidden;
  width: 20px;
  height: 20px;
`;

const StyledImage = styled(RefImage)`
  display: block;
`;

const Title = styled.div`
  font-size: 20px;
  font-weight: 700;
  color: #fff;
`;

const SubTitle = styled.div`
  display: flex;
  font-size: 16px;
  font-weight: 400;
  color: #fff;
  align-items: center;
`;

const HeaderContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: end;
  width: 100%;
`;

const HeaderRight = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: #979abe;
  white-space: pre-wrap;
  text-align: right;
  line-height: 16px;
`;

export default RefCard;
