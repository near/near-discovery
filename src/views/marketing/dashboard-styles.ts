import { motion } from 'framer-motion';
import styled from 'styled-components';

export const Container = styled.div`
  /* background-color: #212633; */
`;

export const Welcome = styled.div`
  font-size: 16px;
  display: flex;
  align-items: center;
  color: white;
  margin-bottom: 40px;
  /* font-weight: 700; */
`;

export const KolName = styled.span`
  font-weight: bold;
  margin-left: 5px;
`;
export const Handclap = styled.img`
  width: 24px;
  margin-left: 5px;
`;
export const BannerTitle = styled.div`
  font-size: 56px;
  font-weight: 700;
  color: white;
  margin-bottom: 20px;
`;
export const KOL = styled.span`
  color: rgba(235, 244, 121, 1);
`;
export const Banner = styled.div`
  height: 376px;
  margin-bottom: 60px;
  background-size: cover;
  background-repeat: no-repeat;
  background-image: url('/images/marketing/bg-dashboard.png');
`;
export const BannerContent = styled.div`
  width: 1244px;
  margin: 0 auto;
  padding-top: 40px;
`;

export const BtnWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
`;

export const Intro = styled.div`
  font-size: 16px;
  font-weight: 500;
  color: white;
  margin-bottom: 40px;
`;
export const StatWrap = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;
export const FreshStat = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 34px;
  height: 34px;
  border-radius: 10px;
  background-color: rgba(55, 58, 83, 0.5);
  border: 1px solid rgba(255, 255, 255, 0.15);
`;

export const StatBox = styled.div`
  display: flex;
  align-items: center;
  width: 340px;
  height: 62px;
  border: 1px solid rgba(48, 48, 56, 1);
  border-radius: 10px;
`;
export const StatLeft = styled.div`
  width: 169px;
  display: flex;
  padding-left: 14px;
`;
export const StatLine = styled.span`
  width: 1px;
  height: 24px;
  border: 1px solid rgba(151, 154, 190, 1);
`;
export const StatRight = styled.div`
  width: 169px;
  display: flex;
  padding-left: 20px;
`;

export const StatIcon = styled.img`
  width: 36px;
`;
export const StatDetail = styled.div`
  flex-grow: 1;
  padding-left: 10px;
`;
export const DetailTitle = styled.div`
  font-size: 13px;
  font-weight: 300;
  color: rgba(151, 154, 190, 1);
`;
export const DetailCount = styled.div`
  font-size: 16px;
  font-weight: 600;
  color: white;
  &.pts {
    color: rgba(255, 221, 77, 1);
  }
`;

export const Box = styled.div`
  width: 1244px;
  margin: 0 auto;
`;

export const Title = styled.div`
  font-size: 36px;
  font-weight: 700;
  background-image: linear-gradient(to right, rgba(151, 154, 190, 1) 0%, rgba(235, 244, 121, 1) 100%);
  -webkit-background-clip: text;
  color: transparent;
  margin: 80px auto 32px;
  text-align: center;
`;

export const Info = styled.div`
  margin-top: 10px;
  font-size: 26px;
  font-weight: 500;
  margin-bottom: 60px;
  text-align: center;
  color: rgba(151, 154, 190, 1);
`;
export const SubTitle = styled.span`
  color: #ffdd4d;
  font-size: 14px;
  font-weight: 700;
  display: flex;
  align-items: end;
  gap: 5px;
`;

export const Step = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px auto 10px;
  gap: 38px;
`;
export const Sub = styled.div`
  color: #979abe;
  font-size: 16px;
  font-weight: 500;
  text-align: center;
`;
export const Coin = styled.img`
  width: 20px;
  margin: 0 5px;
`;

export const Button = styled.div`
  width: 400px;
  height: 56px;
  border-radius: 12px;
  background: linear-gradient(180deg, #eef3bf 0%, #e9f456 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #1e2028;
  font-size: 18px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease 0s;

  &.blur {
    -webkit-filter: blur(2px);
    -moz-filter: blur(2px);
    -ms-filter: blur(2px);
    filter: blur(2px);
  }
`;

// export const Tips = styled.div`
//   background-color: rgba(44, 46, 62, 1);
//   border-radius: 10px;
//   height: 50px;
//   color: white;
//   font-size: 12px;
//   font-weight: 400;
//   text-align: center;
//   padding-top: 5px;
//   &.blur {
//     -webkit-filter: blur(2px);
//     -moz-filter: blur(2px);
//     -ms-filter: blur(2px);
//     filter: blur(2px);
//   }
// `;

export const Fresh = styled.img`
  width: 20px;
  height: 20px;
  @keyframes loading {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
  &.spin {
    animation: loading 1s linear infinite;
    transform-origin: center center;
  }
`;

export const Spinner = styled.img`
  width: 18px;
  height: 18px;
`;

export const Tag = styled.div`
  display: inline-block;
  padding: 5px 8px;
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.15);
  background: rgba(0, 0, 0, 0.3);
  color: #ebf479;
  font-size: 12px;
  font-weight: 500;
`;
export const CardBox = styled.div`
  display: table;
  margin-right: -30px;
  /* display: grid; */
  /* grid-template-columns: 607px 607px;
  grid-template-rows: 177px 177px;
  gap: 30px; */
  &.blur {
    -webkit-filter: blur(2px);
    -moz-filter: blur(2px);
    -ms-filter: blur(2px);
    filter: blur(2px);
  }
`;
export const Card = styled.div`
  float: left;
  width: 607px;
  height: 177px;
  margin-right: 30px;
  margin-bottom: 30px;
  border-radius: 20px;
  border: 1px solid #373a53;
  background: #2c2e3e;
  display: flex;
  padding: 20px;
  &:last-child {
    width: 1244px;
  }
`;
export const CardIcon = styled.img`
  width: 84px;
  margin-right: 22px;
`;
export const CardTitle = styled.div`
  color: #fff;
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 16px;
`;
export const CardDone = styled.img`
  width: 23px;
  height: 23px;
`;
export const CardBtn = styled.button`
  width: 104px;
  height: 42px;
  border-radius: 10px;
  background: linear-gradient(180deg, #eef3bf 0%, #e9f456 100%);
  color: #02051e;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  &:disabled {
    border: 1px solid #373a53;
    background: rgba(55, 58, 83, 0.5);
    cursor: not-allowed;
    color: white;
  }
`;

export const CardLeft = styled.div`
  flex-grow: 1;
  display: flex;
  align-items: flex-start;
  cursor: pointer;
`;
export const CardRight = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  align-items: end;
`;

export const Rotate = styled.div`
  -webkit-transform: rotate(360deg);
  transform: rotate(360deg);
  -webkit-transition: -webkit-transform 1s linear;
  transition: transform 1s linear;
`;
export const List = styled.div`
  font-size: 16px;
  font-weight: 500;
  color: white;
  padding-top: 50px;
  display: flex;
  align-items: center;
  gap: 20px;
  &:last-child {
    padding-bottom: 50px;
  }
`;
export const ListOrder = styled.span``;

export const CopyIcon = styled.img`
  width: 20px;
`;

export const AllRewards = styled.div`
  position: fixed;
  top: 260px;
  right: 20px;
  width: 185px;
  height: 66px;
  z-index: 1;
  border-radius: 33px;

  &.bitget {
    border: 1px solid rgba(255, 255, 255, 0.15);
    background: radial-gradient(72.14% 104.62% at 47.64% 100%, rgba(255, 255, 255, 0.2) 0%, rgba(0, 0, 0, 0) 100%),
      radial-gradient(185.62% 109.56% at 0% 71.21%, #7efbfd 0%, #7138cd 55.21%, #4400b2 100%);
    box-shadow: 0px 0px 50px 0px rgba(255, 255, 255, 0.15) inset;
  }
  &.coin68 {
    border: 1px solid rgba(255, 255, 255, 0.15);
    background: radial-gradient(72.14% 104.62% at 47.64% 100%, rgba(253, 126, 126, 1) 0%, rgba(255, 154, 61, 1) 100%),
      radial-gradient(185.62% 109.56% at 0% 71.21%, #7efbfd 0%, #7138cd 55.21%, #4400b2 100%);
    box-shadow: 0px 0px 50px 0px rgba(255, 255, 255, 0.15) inset;
  }
`;
export const AllRewardsLeft = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: center;
  height: 100%;
  padding-left: 30px;
`;
export const AllRewardsTitle = styled.div`
  color: #fff;
  text-align: center;
  font-size: 14px;
  font-weight: 400;
`;
export const AllRewardsPoints = styled.div`
  color: #fff;
  font-size: 20px;
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: 3px;
`;
export const AllRewardsIcon = styled.img`
  width: 69px;
  position: absolute;
  top: -9px;
  right: 0;
`;
export const AllRewardsCoin = styled.img`
  width: 19px;
`;

export const InviteBodyIcon = styled.img`
  width: 38px;
  height: 38px;
  margin-right: 20px;
`;

export const InviteBodyRight = styled.div`
  margin-top: 33px;
  display: flex;
  width: 370px;
  height: 132px;
  padding: 23px;
  border-radius: 20px;
  color: white;
  background-color: rgba(44, 46, 62, 1);
  border: 1px solid rgba(55, 58, 83, 1);
`;
export const PromptsTitle = styled.div`
  font-size: 16px;
  font-weight: 700;
  margin-bottom: 8px;
`;
export const PromptsTxt = styled.div`
  font-size: 14px;
  font-weight: 400;
  color: #979abe;
`;

export const More = styled.div`
  height: 300px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  border-radius: 20px;
  align-items: center;
  justify-content: center;
  border: 1px solid rgba(50, 53, 63, 1);
  background-color: rgba(33, 35, 42, 1);
`;
export const MoreIcon = styled.img``;
export const MoreTxt = styled.div`
  font-size: 20px;
  font-weight: 500;
  color: rgba(177, 180, 214, 1);
`;

export const RewardList = styled.div`
  display: flex;
  gap: 20px;
  margin-bottom: 30px;
`;
export const RewardQuest = styled.div`
  flex-grow: 1;
  height: 158px;
  border-radius: 16px;
  background: linear-gradient(0deg, #373a53, #373a53),
    linear-gradient(0deg, rgba(55, 58, 83, 0.2), rgba(55, 58, 83, 0.2));
`;
export const RewardBox = styled.div`
  width: 207px;
  height: 158px;
  border-radius: 16px;
  background: linear-gradient(180deg, rgba(44, 46, 62, 0) 0%, #2c2e3e 100%),
    linear-gradient(180deg, rgba(55, 58, 83, 0) 0%, #373a53 100%);
`;
