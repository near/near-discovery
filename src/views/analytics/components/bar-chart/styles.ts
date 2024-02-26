import { motion } from 'framer-motion';
import styled from 'styled-components';

export const CustomTooltip = styled.div`
  min-width: 239px;
  padding: 12px;
  border-radius: 12px;
  border: 1px solid #373a53;
  background: #2e3142;
  color: #fff;
  font-family: Montserrat;
  font-size: 14px;
  font-weight: 500;
`;
export const Wrap = styled.div`
  font-weight: 700;
  line-height: normal;
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 17px;
`;

export const Logo = styled.img`
  width: 30px;
  height: 30px;
`;

export const Icon = styled.span`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: ${(props) => props.color};
`;
export const Item = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const Key = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`;
export const Value = styled.div``;
