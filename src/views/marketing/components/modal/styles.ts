import { motion } from 'framer-motion';
import styled from 'styled-components';

export const Mask = styled.div`
  position: fixed;
  inset: 0;
  z-index: 1000;
  height: 100%;

  backdrop-filter: blur(5px);
`;
export const Wrap = styled(motion.div)`
  position: fixed;
  outline: 0;
  z-index: 1000;
  background-image: linear-gradient(to bottom, rgba(22, 24, 30, 1), rgba(38, 40, 54, 1));
  left: 14px;
  right: 14px;
  height: 352px;
  padding: 0 18px 36px;
  text-align: center;
`;
export const Close = styled.img`
  position: absolute;
  right: 18px;
  top: 18px;
`;
export const WinIcon = styled.img`
  width: 100%;
  margin-top: -80px;
`;
export const FailIcon = styled.img`
  margin-top: 20px;
`;

export const Title = styled.div`
  font-size: 32px;
  font-weight: 700;
  color: white;
  margin-top: 20px;
`;

export const SucTxt = styled.div`
  font-size: 20px;
  font-weight: 700;
  color: rgba(235, 244, 121, 1);
  margin-top: 16px;
`;
export const FailTxt = styled.div`
  font-size: 16px;
  font-weight: 500;
  color: white;
  margin-top: 16px;
`;
export const Coin = styled.img`
  width: 20px;
  margin: 0 5px;
`;

export const SucFoot = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: rgba(151, 154, 190, 1);
  text-decoration: underline;
  margin-top: 140px;
`;

export const FailFoot = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: rgba(151, 154, 190, 1);
  text-decoration: underline;
  margin-top: 70px;
`;
