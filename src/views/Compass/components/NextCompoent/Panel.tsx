import styled from 'styled-components';
import { useRouter } from 'next/router';
import odyssey from '@/config/odyssey';
import LineImg from './img/line.svg';
import g2Img from '../../img/g1.svg';
import compassImg from './img/odyssey.svg';

import { StyledCardButton } from '@/views/Home/components/Compass/styles';

const ProjectLine = styled.div`
  display: flex;
  padding: 30px;
  background: linear-gradient(0deg, #21232a, #21232a), linear-gradient(180deg, #464b56 0%, rgba(0, 0, 0, 0) 100%);
  height: 380px;
  border-radius: 32px;
  position: relative;
  margin-top: 10px;
`;

const IconBox = styled.img`
  width: 646px;
  height: 323px;
`;

const DescBox = styled.div`
  margin-left: 40px;
`;

const TopIcon = styled.img`
  width: 56px;
  height: 56px;
`;

const DescTitle = styled.div`
  color: #fff;
  font-size: 36px;
  font-weight: 700;
  line-height: 44px;
  text-align: left;
  color: #fff;
  margin-top: 24px;
`;

const DescFull = styled.div`
  font-size: 18px;
  font-weight: 400;
  line-height: 27px;
  margin-top: 16px;
  color: rgba(151, 154, 190, 1);
`;
const CompassIcon = styled.img`
  position: absolute;
  right: -20px;
  top: -10px;
`;

const WinIcon = styled.img`
  position: absolute;
  right: -30px;
  top: 15px;
`;

export default function Panel() {
  const router = useRouter();
  const handleExplore = function () {
    router.push(odyssey[2].path);
  };
  return (
    <ProjectLine>
      <IconBox src={LineImg.src} />
      <DescBox>
        <TopIcon src={g2Img.src} />
        <DescTitle>Beyond Linea</DescTitle>
        <DescFull>{"Venture into Linea's Expansive DeFi Ecosystem."}</DescFull>
        <StyledCardButton onClick={handleExplore} data-bp="1001-003">
          <div>Explore now</div>
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="12" viewBox="0 0 18 12" fill="none">
            <path
              d="M1 5.2C0.558172 5.2 0.2 5.55817 0.2 6C0.2 6.44183 0.558172 6.8 1 6.8L1 5.2ZM17.5657 6.56569C17.8781 6.25327 17.8781 5.74674 17.5657 5.43432L12.4745 0.343147C12.1621 0.0307274 11.6556 0.0307274 11.3431 0.343147C11.0307 0.655566 11.0307 1.1621 11.3431 1.47452L15.8686 6L11.3431 10.5255C11.0307 10.8379 11.0307 11.3444 11.3431 11.6569C11.6556 11.9693 12.1621 11.9693 12.4745 11.6569L17.5657 6.56569ZM1 6.8L17 6.8L17 5.2L1 5.2L1 6.8Z"
              fill="black"
            />
          </svg>
        </StyledCardButton>
      </DescBox>
      <CompassIcon src={compassImg.src} />
      {/* <WinIcon src={winImg.src} /> */}
    </ProjectLine>
  );
}
