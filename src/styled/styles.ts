import styled from 'styled-components';
import {
  FlexProps,
  FontProps
} from './types';

export const StyledContainer = styled.div``

export const StyledFont = styled.div<FontProps>`
  color: ${(props) => props.color || '#000'};
  font-family: ${(props) => props.fontFamily || 'Montserrat'};
  font-size: ${(props) => props.fontSize || '16px'};
  font-style: ${(props) => props.fontStyle || 'normal'};
  font-weight: ${(props) => props.fontWeight || '400'};
  line-height: ${(props) => props.lineHeight || 'normal'};
  white-space: ${(props) => props.whiteSpace || 'normal'};
`;
export const StyledFlex = styled.div<FlexProps>`
  display: flex;
  flex-direction: ${(props) => props.flexDirection || 'row'};
  align-items: ${(props) => props.alignItems || 'center'};
  justify-content: ${(props) => props.justifyContent || 'flex-start'};
  gap: ${(props) => props.gap || '0px'};
`;
export const StyledSvg = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`