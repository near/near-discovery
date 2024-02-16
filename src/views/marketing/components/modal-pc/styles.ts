import { motion } from 'framer-motion';
import styled from 'styled-components';

export const Mask = styled.div`
  position: fixed;
  inset: 0;
  z-index: 50;
  top: 86px;

  backdrop-filter: blur(5px);
`;
export const Wrap = styled(motion.div)`
  position: fixed;
  outline: 0;
  z-index: 1000;
  background-image: linear-gradient(to bottom, rgba(22, 24, 30, 1), rgba(38, 40, 54, 1));
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  width: 500px;
  height: 323px;
  margin: auto;
  border-radius: 32px;
  border: 1px solid #373a53;
  background: #262836;
  padding: 24px;
  text-align: center;
`;
export const Close = styled.img`
  position: absolute;
  right: 18px;
  top: 18px;
`;
export const WinIcon = styled.img`
  width: 100%;
  margin-top: -130px;
`;
export const FailIcon = styled.img``;

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
  margin-top: 14px;
`;
export const FailTxt = styled.div`
  font-size: 16px;
  font-weight: 500;
  color: white;
  margin-top: 14px;
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
  margin-top: 56px;
  cursor: pointer;
`;

export const FailFoot = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: rgba(151, 154, 190, 1);
  text-decoration: underline;
  margin-top: 56px;
  cursor: pointer;
`;
