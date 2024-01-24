import styled from 'styled-components';

export { StyledCoin } from '@/views/Quest/styles';
export { StyledButton, StyledFlex, StyledLoadingWrapper, StyledSvg, StyledWrapper } from '../../styles';

import {
  StyledText
} from '../../styles';

export {
  StyledText
};


export const StyledContainer = styled.div`
`;

export const StyledHeader = styled.div`
  color: #FFF;
  font-family: Gantari;
  font-size: 26px;
  font-style: normal;
  font-weight: 700;
  line-height: 120%;
  text-transform: capitalize;
`;

export const StyledSubTitle = styled.div`
  font-size: 20px;
  font-weight: 700;
  line-height: 120%;
  margin-top: 20px;
`;

export const StyledHeaderProcessBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 244px;
`;

export const StyledHeaderProcessDesc = styled.div`
  color: #fff;
  font-size: 14px;
  font-weight: 400;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const StyledListBox = styled.div`
  margin-top: 14px;
  display: flex;
  gap: 14px;
  flex-wrap: wrap;
  margin-bottom: 40px;
`;

export const StyledCampaign = styled.div`
  width: 100%;
  display: flex;
  align-items: flex-start;
  gap: 35px;
  padding: 30px 0 30px 30px;
  min-height: 300px;
  border-radius: 20px;
  border: 1px solid #32353F;
  background: #21232A;
`

export const StyledExplore = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 227px;
  height: 50px;
  border-radius: 12px;
  border: 1px solid #979ABE;
  fill: white;
  &:hover {
    border: none;
    background: linear-gradient(180deg, #EEF3BF 0%, #E9F456 100%);
    fill: black;
    ${StyledText} {
      color: black;
    }
  }
`