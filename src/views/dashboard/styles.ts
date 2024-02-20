import { motion } from 'framer-motion';
import styled from 'styled-components';

export const Container = styled.div`
  padding-top: 85px;
  width: 1244px;
  margin: 0 auto;
`;

export const MainTitle = styled.div`
  color: #fff;
  font-family: Montserrat;
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
};
export const Button = styled.button.attrs<StyledButtonType>((props) => ({
  $fz: props.$fz || '16px',
  $fw: props.$fw || '600',
  $width: props.$width || '100%',
  $height: props.$height || '50px',
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
  color: #ebf479;
  transition: all 0.2s ease-in;
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
    background: #ebf479;
    color: #000;
  }
`;
