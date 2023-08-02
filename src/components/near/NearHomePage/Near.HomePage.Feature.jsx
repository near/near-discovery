import styled from 'styled-components';
import NearGradientBackground from '../NearComponents/NearGradientBackground';
import Image from 'next/image';
import NearButton2, { nearButtonColor } from '../NearComponents/NearButton2';
import NearBadge from '@/components/near/NearComponents/NearBadge';
import { LARGE_SCREEN, MEDIUM_SCREEN } from '@/components/near/NearStyleVar';
import { BottomLine, HorizontalLine, TopLine } from '@/components/near/NearComponents/NearLine';
import { StyledT2, StyledT3, StyledT4 } from '@/components/near/NearStyled';

const MOBILE_SIZE = MEDIUM_SCREEN;
const NearHomePageFeature = ({
  title,
  desc,
  btnText,
  onClick,
  image,
  imageBgGradient,
  isRevert,
  tag,
  tagBackground,
  withTopLine = true,
  withBottomLine = true,
  bottomLineHeight,
  ballGradients,
}) => {
  let node = (
    <StyledColumn>
      <ContentBody
        {...{
          title,
          desc,
          btnText,
          onClick,
          tag,
          tagBackground,
          withTopLine,
          withBottomLine,
          bottomLineHeight,
          ballGradients,
        }}
      />
      <ContentImage {...{ image, imageBgGradient, tag, tagBackground }} />
    </StyledColumn>
  );

  if (isRevert) {
    node = (
      <StyledColumn isRevert={isRevert}>
        <ContentImage {...{ image, imageBgGradient, isRevert, tag, tagBackground }} />
        <ContentBody
          {...{
            title,
            desc,
            btnText,
            onClick,
            tag,
            tagBackground,
            isRevert,
            withTopLine,
            withBottomLine,
            bottomLineHeight,
            ballGradients,
          }}
        />
      </StyledColumn>
    );
  }

  return (
    <Container>
      <div
        style={{
          display: 'flex',
          position: 'relative',
          flexGrow: 1,
        }}
      >
        {withTopLine && <StyledHorizontalLine />}
        {node}
      </div>
    </Container>
  );
};

const ContentBody = ({
  title,
  desc,
  btnText,
  onClick,
  tag,
  tagBackground,
  isRevert,
  withTopLine,
  withBottomLine,
  bottomLineHeight,
  ballGradients,
}) => {
  const handleClick = () => {
    if (typeof onClick === 'function') onClick();
  };

  let topLineNode, bottomLineNode;
  if (withTopLine) {
    let style = {
      left: 51,
      borderTopLeftRadius: 'var(--radius)',
      borderRightWidth: 0,
    };
    if (isRevert) {
      style = {
        left: -118,
        borderTopRightRadius: 'var(--radius)',
        borderLeftWidth: 0,
      };
    }
    topLineNode = <TopLine style={style} ballGradients={ballGradients} />;
  }

  if (withBottomLine) {
    let style = {
      left: 0,
      borderBottomLeftRadius: 'var(--radius)',
      borderRightWidth: 0,
    };
    if (isRevert) {
      style = {
        left: -140,
        borderBottomRightRadius: 'var(--radius)',
        borderLeftWidth: 0,
      };
    }
    bottomLineNode = <BottomLine style={style} height={bottomLineHeight} ballGradients={ballGradients} />;
  }

  return (
    <Content>
      {topLineNode}
      {tag && (
        <Tag background={tagBackground} padding={'12px 20px 14px'}>
          {tag}
        </Tag>
      )}
      <Title>{title}</Title>
      <Desc>{desc}</Desc>
      {btnText && (
        <StyledButton onClick={handleClick} color={nearButtonColor.yellow}>
          {btnText}
          <IconArrow />
        </StyledButton>
      )}

      {bottomLineNode}
    </Content>
  );
};

const ContentImage = ({ image, imageBgGradient, isRevert, tag, tagBackground }) => {
  return (
    <StyledContentImage isRevert={isRevert}>
      {tag && (
        <MobileTag background={tagBackground} padding={'12px 20px 14px'}>
          {tag}
        </MobileTag>
      )}
      <StyledImageContainer gradients={imageBgGradient} isRevert={isRevert}>
        {image && <StyledImage src={image} width={690} height={400} />}
      </StyledImageContainer>
    </StyledContentImage>
  );
};

const IconArrow = () => {
  return (
    <svg
      style={{ marginLeft: 10 }}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="16"
      viewBox="0 0 24 16"
      fill="none"
    >
      <path
        d="M1 7C0.447715 7 0 7.44772 0 8C0 8.55228 0.447715 9 1 9V7ZM23.7071 8.70711C24.0976 8.31658 24.0976 7.68342 23.7071 7.29289L17.3431 0.928932C16.9526 0.538408 16.3195 0.538408 15.9289 0.928932C15.5384 1.31946 15.5384 1.95262 15.9289 2.34315L21.5858 8L15.9289 13.6569C15.5384 14.0474 15.5384 14.6805 15.9289 15.0711C16.3195 15.4616 16.9526 15.4616 17.3431 15.0711L23.7071 8.70711ZM1 9H23V7H1V9Z"
        fill="black"
      />
    </svg>
  );
};

const Container = styled.div`
  display: flex;
  min-height: 440px;
  justify-content: center;
  position: relative;
  flex-grow: 1;

  @media (max-width: ${LARGE_SCREEN}) {
    min-height: 0;
  }
`;

const StyledColumn = styled.div`
  display: flex;
  flex-grow: 1;

  @media (max-width: ${MOBILE_SIZE}) {
    flex-direction: ${(p) => (p.isRevert ? 'column' : 'column-reverse')};
  }
`;

const Content = styled.div`
  text-align: left;
  position: relative;
  // max-width: 375px;
  width: 441px;

  @media (max-width: ${MOBILE_SIZE}) {
    margin: auto;
    text-align: center;
    max-width: none;
    width: 100%;
  }
`;

const Title = styled(StyledT2)`
  margin-bottom: 13px;
`;

const Desc = styled(StyledT4)`
  margin-bottom: 36px;
  max-width: 367px;

  @media (max-width: ${MOBILE_SIZE}) {
    max-width: none;
  }
`;

const StyledButton = styled(NearButton2)`
  padding: 17px 34px !important;
  font-size: 18px;
`;

const StyledContentImage = styled.div`
  display: flex;
  align-items: center;
  padding-left: ${(p) => !p.isRevert && '40px'};
  padding-right: ${(p) => p.isRevert && '40px'};
  flex-grow: 1;

  @media (max-width: ${MOBILE_SIZE}) {
    padding: 0;
  }
`;

const StyledImageContainer = styled(NearGradientBackground)`
  max-width: 750px;
  padding: 20px;
  border-radius: 22px;
  flex-grow: 1;
  // margin-left: ${(p) => !p.isRevert && '40px'};
  // margin-right: ${(p) => p.isRevert && '40px'};

  @media (max-width: ${MOBILE_SIZE}) {
    margin: 0 auto 40px;
    padding: 15px;
  }
`;

const StyledImage = styled(Image)`
  width: 100%;
  max-height: 400px;
  height: auto;
  display: block;
  border-radius: 12px;
`;

const Tag = styled(NearBadge)`
  margin-right: 10px;
  margin-bottom: 20px;

  @media (max-width: ${MOBILE_SIZE}) {
    display: none;
  }
`;

const MobileTag = styled(NearBadge)`
  position: absolute;
  top: -20px;
  left: 50%;
  transform: translate(-50%);

  @media (min-width: ${MOBILE_SIZE}) {
    display: none;
  }
`;

const StyledHorizontalLine = styled(HorizontalLine)`
  left: 211px;
  top: -154px;
  width: 427px;
`;

export default NearHomePageFeature;
