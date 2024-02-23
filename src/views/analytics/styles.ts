import { motion } from 'framer-motion';
import styled from 'styled-components';

export const ContainerBg = styled.div`
  background-image: url(/images/dashboard/bg-blue.png);
  background-repeat: no-repeat;
`;
export const Container = styled.div`
  padding-top: 85px;
  width: 1244px;
  margin: 0 auto;
  font-family: Montserrat;
`;

export const MainTitle = styled.div`
  color: #fff;
  font-size: 42px;
  font-weight: 700;
  display: flex;
  justify-content: space-between;
  align-items: baseline;
`;

export const SubTitle = styled.div`
  color: #fff;
  font-family: Gantari;
  font-size: 32px;
  font-weight: 700;
  margin: 90px 0 22px;
`;

export const MainDate = styled.span``;
export const MainExtra = styled.div`
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 22px;
`;

type StyledButtonType = {
  $fz?: string;
  $fw?: string;
  $width?: string;
  $height?: string;
  $background?: string;
  $borderRadius?: string;
  $borderWidth?: string;
  $borderStyle?: string;
  $borderColor?: string;
  $backgroundHover?: string;
  $color?: string;
  $colorHover?: string;
};
export const Button = styled.button.attrs<StyledButtonType>((props) => ({
  $fz: props.$fz || '16px',
  $fw: props.$fw || '600',
  $color: props.$color || '',
  $width: props.$width || '100%',
  $height: props.$height || '50px',
  $backgroundHover: props.$backgroundHover || 'none',
  $colorHover: props.$colorHover || 'none',
  $background: props.$background || 'none',
  $borderRadius: props.$borderRadius || '10px',
  $borderWidth: props.$borderWidth || '1px',
  $borderStyle: props.$borderStyle || 'solid',
  $borderColor: props.$borderColor || '#EBF479',
}))`
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: Gantari;
  transition: all 0.2s ease-in;
  color: ${(props) => props.$color};
  font-size: ${(props) => props.$fz};
  font-weight: ${(props) => props.$fw};
  width: ${(props) => props.$width};
  height: ${(props) => props.$height};
  background: ${(props) => props.$background};
  border-radius: ${(props) => props.$borderRadius};
  border-width: ${(props) => props.$borderWidth};
  border-style: ${(props) => props.$borderStyle};
  border-color: ${(props) => props.$borderColor};
  cursor: pointer;
  &[disabled] {
    cursor: no-drop;
    opacity: 0.5;
  }
  &:hover {
    background: ${(props) => props.$backgroundHover};
    color: ${(props) => props.$colorHover};
  }
`;
export const Foot = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 56px;
`;
export const Explore = styled.div`
  text-align: center;
  margin-top: 20px;
  color: #979abe;
  font-size: 16px;
  font-weight: 500;
  line-height: normal;
`;

export const DappChartWrap = styled.div`
  height: 420px;
`;
export const UsersDataWrap = styled.div`
  display: flex;
  justify-content: space-between;
`;
export const UsersTotal = styled.div`
  width: 824px;
  height: 408px;
  border-radius: 20px;
  background: rgba(33, 35, 42, 0.9);
`;
export const Title = styled.div`
  color: #fff;
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 5px;
`;
export const Intro = styled.div`
  color: #fff;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

export const UsersTotalTitle = styled.div`
  height: 70px;
  padding: 22px 0 0 22px;
  margin-bottom: 20px;
`;
export const DappTitle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 70px;
  padding: 22px 22px 0 22px;
  margin-bottom: 20px;
`;
export const UsersArea = styled.div`
  width: 400px;
  height: 408px;
  border-radius: 20px;
  background: rgba(33, 35, 42, 0.9);
`;

export const ChainsWrap = styled.div`
  height: 420px;
  border-radius: 20px;
  background: rgba(33, 35, 42, 0.9);
  backdrop-filter: blur(10px);
`;

export const Summary = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 30px 0 93px;
`;

export const White = styled.span`
  color: #fff;
  font-size: 16px;
  font-weight: 500;
`;

export const SummaryItem = styled.div`
  width: 300px;
  height: 170px;
  padding: 24px 22px;
  border-radius: 20px;
  background: rgba(33, 35, 42, 0.9);
  backdrop-filter: blur(10px);
  overflow: hidden;
`;
export const SummaryHead = styled.div`
  display: flex;
  justify-content: space-between;
  height: 60px;
`;

export const SummaryBg = styled.div`
  position: absolute;
  left: 140px;
  top: 58px;
  width: 100%;
  height: 100%;
  background-image: url(/images/onboarding/card_bg.png);
  background-repeat: no-repeat;
  z-index: 1;
  opacity: 0.1;
`;
export const SummaryLeft = styled.div`
  flex-grow: 1;
`;
export const SummaryTitle = styled.div`
  color: #fff;

  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;
export const SummaryCount = styled.div`
  color: #fff;
  margin-top: 12px;
  font-size: 26px;
  font-style: normal;
  font-weight: 700;
  line-height: 120%; /* 31.2px */
`;
export const SummaryIcon = styled.img`
  width: 30px;
  height: 30px;
`;
export const SummaryRight = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 60px;
  height: 60px;
  border-radius: 20px;
  &.time {
    background: rgba(255, 144, 102, 0.3);
  }
  &.people {
    background: rgba(130, 128, 255, 0.3);
  }
  &.polyline {
    background: rgba(43, 241, 255, 0.3);
  }
  &.cube {
    background: rgba(254, 197, 61, 0.3);
  }
`;
export const SummaryFoot = styled.div`
  color: #979abe;

  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  margin-top: 43px;
`;

export const DappsWrap = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 30px;
`;
export const DappsLeft = styled.div`
  width: 612px;
  height: 390px;
  border-radius: 20px;
  background: rgba(33, 35, 42, 0.9);
`;
export const DappsRight = styled.div`
  width: 612px;
  height: 390px;
  display: grid;
  grid-template-columns: 300px 300px;
  grid-template-rows: 188px 188px;
  gap: 12px;
`;

export const TradingBox = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 20px;
  border-radius: 20px;
  background: rgba(33, 35, 42, 0.9);
  overflow: hidden;
  .trading-bg {
    display: none;
  }
  &:hover {
    .trading-bg {
      display: block;
    }
  }
`;
export const TradingType = styled.div`
  display: flex;
  align-items: center;
  color: #fff;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  gap: 10px;
`;
export const TradingIcon = styled.img`
  width: 17px;
`;

export const TradingValue = styled.div`
  color: #fff;
  font-size: 26px;
  font-style: normal;
  font-weight: 700;
`;

export const TradingBg = styled.img`
  height: 210px;
  position: absolute;
  margin-top: 10px;
`;
export const QuestWrap = styled.div`
  height: 608px;
  border-radius: 20px;
  background: rgba(33, 35, 42, 0.9);
`;
export const GridHeader = styled.div`
  display: grid;
  padding: 0 36px;
  grid-template-columns: 32% 12% 12% 12% 12% 20%;
  border-bottom: 1px solid #979abe;
`;
export const HeadItem = styled.div`
  padding: 34px 0 20px;
  text-align: center;
  color: #979abe;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;
export const GridBody = styled.div`
  padding: 36px 36px 0;
`;
export const GridRow = styled.div`
  display: grid;
  grid-template-columns: 32% 12% 12% 12% 12% 20%;
`;
export const GridCol = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 90px;
  color: #fff;
  font-size: 16px;
  font-weight: 600;
  padding: 0 8px;
`;

export const Ellipsis = styled.div`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const PtsWrap = styled.div`
  display: flex;
  justify-content: space-between;
`;
export const PtsLeft = styled.div`
  width: 383px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;
export const PtsItem = styled.div`
  height: 227px;
  padding: 21px 26px;
  border-radius: 20px;
  background: rgba(33, 35, 42, 0.9);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
export const PtsTitle = styled.div`
  color: #fff;
  font-size: 20px;
  font-weight: 700;
`;
export const PtsTotal = styled.div`
  color: #fff;
  font-size: 36px;
  font-weight: 700;
  text-align: center;
`;
export const PtsFoot = styled.div`
  color: #979abe;
  font-size: 16px;
  font-weight: 400;
`;
export const PtsRight = styled.div`
  width: 840px;
  height: 474px;
  border-radius: 20px;
  background: rgba(33, 35, 42, 0.9);
`;
export const PtsWhite = styled.span`
  color: #fff;
  font-size: 16px;
  font-weight: 400;
`;

export const PieWrap = styled.div`
  margin: 30px auto 0;
  width: 642px;
`;
