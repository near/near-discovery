import styled from 'styled-components';
import RefGradientBackground from '../RefComponents/RefGradientBackground';
import Image from 'next/image';
import RefButton, { refButtonColor } from '../RefComponents/RefButton';
import RefBadge from '@/components/ref-org/RefComponents/RefBadge';
import { LARGE_SCREEN, MEDIUM_SCREEN } from '@/components/ref-org/RefStyleVar';
import { BottomLine, HorizontalLine, TopLine } from '@/components/ref-org/RefComponents/RefLine';

const RefOrgHomePageFeature = ({
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
}) => {
  let node = (
    <>
      <ContentBody {...{ title, desc, btnText, onClick, tag, tagBackground, withTopLine, withBottomLine }} />
      <ContentImage {...{ image, imageBgGradient }} />
    </>
  );

  if (isRevert) {
    node = (
      <>
        <ContentImage {...{ image, imageBgGradient, isRevert }} />
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
          }}
        />
      </>
    );
  }

  return (
    <Container>
      <div
        style={{
          display: 'flex',
          position: 'relative',
        }}
      >
        {withTopLine && (
          <HorizontalLine
            style={{
              left: 148,
              top: -154,
              width: 578,
            }}
          />
        )}
        {node}
      </div>
    </Container>
  );
};

const ContentBody = ({ title, desc, btnText, onClick, tag, tagBackground, isRevert, withTopLine, withBottomLine }) => {
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
        left: -121,
        borderTopRightRadius: 'var(--radius)',
        borderLeftWidth: 0,
      };
    }
    topLineNode = <TopLine style={style} />;
  }

  if (withBottomLine) {
    let style = {
      left: 71,
      borderBottomLeftRadius: 'var(--radius)',
      borderRightWidth: 0,
    };
    if (isRevert) {
      style = {
        left: -71,
        borderBottomRightRadius: 'var(--radius)',
        borderLeftWidth: 0,
      };
    }
    bottomLineNode = <BottomLine style={style} />;
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
        <StyledButton onClick={handleClick} color={refButtonColor.yellow}>
          {btnText}
          <IconArrow />
        </StyledButton>
      )}

      {bottomLineNode}
    </Content>
  );
};

const ContentImage = ({ image, imageBgGradient, isRevert }) => {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <StyledImageContainer gradients={imageBgGradient} isRevert={isRevert}>
        {image && <StyledImage src={image} width={690} height={400} />}
      </StyledImageContainer>
    </div>
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

  @media (max-width: ${LARGE_SCREEN}) {
    min-height: 0;
  }
`;

const Content = styled.div`
  text-align: left;
  position: relative;
  max-width: 375px;
`;

const Title = styled.div`
  font-size: 42px;
  font-weight: 700;
  line-height: 1.2;
  margin-bottom: 13px;
`;

const Desc = styled.div`
  font-size: 20px;
  font-weight: 400;
  margin-bottom: 36px;
  max-width: 367px;
`;

const StyledButton = styled(RefButton)`
  padding: 17px 34px !important;
  font-size: 18px;
`;

const StyledImageContainer = styled(RefGradientBackground)`
  max-width: 750px;
  padding: 20px;
  border-radius: 22px;
  margin-left: ${(p) => !p.isRevert && '40px'};
  margin-right: ${(p) => p.isRevert && '40px'};
`;

const StyledImage = styled(Image)`
  width: 100%;
  max-height: 400px;
  height: auto;
  display: block;
  border-radius: 12px;
`;

const Tag = styled(RefBadge)`
  margin-right: 10px;
  margin-bottom: 20px;
`;

export default RefOrgHomePageFeature;
