import { motion } from 'framer-motion';
import styled from 'styled-components';

export const Container = styled.div`
  /* background-color: #212633; */
`;

export const Banner = styled.div`
  height: 356px;
  margin-bottom: 60px;
  padding: 40px 40px 0;
  background-size: cover;
  background-repeat: no-repeat;
  background-image: url('/images/marketing/invit-bg-pc.png');
`;
export const BtnWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
`;
export const Inviter = styled.div`
  width: 220px;
  height: 65px;
  border-radius: 70px;
  display: flex;
  padding: 8px;
  background-color: rgba(33, 35, 42, 0.9);
`;
export const InviterAvatar = styled.img`
  width: 45px;
  height: 45px;
  border-radius: 50%;
  margin-right: 10px;
`;
export const InviterContent = styled.div`
  flex-grow: 1;
`;
export const InviterTitle = styled.div`
  font-size: 14px;
  font-weight: 400;
  color: rgba(151, 154, 190, 1);
`;
export const InviterAddr = styled.div`
  font-size: 18px;
  font-weight: 500;
  color: white;
`;

export const Intro = styled.div`
  font-size: 42px;
  font-weight: 700;
  color: white;
  text-align: center;
  margin-bottom: 40px;
`;

export const Box = styled.div`
  width: 1244px;
  margin: 27px auto 0;
`;

export const Title = styled.div`
  font-size: 36px;
  font-weight: 700;
  background-image: linear-gradient(to right, #ebf479 0%, #979abe 100%);
  -webkit-background-clip: text;
  color: transparent;
  margin: 80px auto 32px;
  display: flex;
  justify-content: space-between;
  align-items: end;
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

export const Foot = styled.div`
  margin-top: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const FootTxt = styled.span`
  color: #fff;
  font-size: 36px;
  font-weight: 700;
  justify-content: center;
`;
export const Star = styled.img`
  width: 30px;
  height: 30px;
  margin-left: 4px;
`;

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

export const Link = styled.div`
  margin-top: 10px;
  color: #979abe;
  text-align: center;
  font-size: 16px;
  font-weight: 400;
  text-decoration-line: underline;
`;
export const TabsBox = styled.div`
  position: relative;
  margin-top: 84px;
`;
export const Quote = styled.div`
  color: #979abe;
  font-size: 26px;
  font-weight: 500;
  margin: 20px auto 0;
  text-align: center;
`;

export const InviteBox = styled.div`
  border-radius: 20px;
  border: 1px solid #373a53;
  padding: 28px 26px;
  background: #2c2e3e;
  &.blur {
    -webkit-filter: blur(2px);
    -moz-filter: blur(2px);
    -ms-filter: blur(2px);
    filter: blur(2px);
  }
`;

export const InviteHead = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const InviteBody = styled(motion.div)`
  height: 435px;
  border-radius: 20px;
  background: rgba(33, 35, 42, 0.9);
  backdrop-filter: blur(10px);
  overflow-y: scroll;
  padding: 0 20px;
  /* display: flex; */
  border: 1px solid #373a53;
`;

export const Text = styled.div`
  color: #fff;
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 20px;
`;
export const InviteBtn = styled.div`
  width: 238px;
  height: 74px;
  border-radius: 12px;
  background: linear-gradient(180deg, #eef3bf 0%, #e9f456 100%);
  color: #02051e;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  font-weight: 700;
  gap: 5px;
  cursor: pointer;
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
