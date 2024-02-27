import { memo } from "react"
import useCompassList from '@/views/Home/components/Compass/hooks/useCompassList';
import styled from "styled-components";

interface FlexProps {
  flexDirection?: 'row' | 'column';
  alignItems?: string;
  justifyContent?: string;
  gap?: string;
}
interface FontProps {
  color?: string;
  fontFamily?: string;
  fontSize?: string;
  fontStyle?: string;
  fontWeight?: string;
  lineHeight?: string;
}
const StyledOdyssey = styled.div`
  margin-bottom: 30px;
  padding-bottom: 30px;
  border-bottom: 1px solid #393C47;
`
const StyledContainer = styled.div`
  
`
const StyledImage = styled.img`
  width: 100%;
`;
const StyledMakser = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.10);
  backdrop-filter: blur(2px);
`
const StyledFont = styled.div<FontProps>`
  color: ${(props) => props.color || '#000'};
  font-family: ${(props) => props.fontFamily || 'Space Grotesk'};
  font-size: ${(props) => props.fontSize || '16px'};
  font-style: ${(props) => props.fontStyle || 'normal'};
  font-weight: ${(props) => props.fontWeight || '400'};
  line-height: ${(props) => props.lineHeight || 'normal'};
`;
const StyledFlex = styled.div<FlexProps>`
  display: flex;
  flex-direction: ${(props) => props.flexDirection || 'row'};
  align-items: ${(props) => props.alignItems || 'center'};
  justify-content: ${(props) => props.justifyContent || 'flex-start'};
  gap: ${(props) => props.gap || '0px'};
`;
const Odyssey = function ({ setShow }: any) {
  // const { loading, compassList } = useCompassList()
  return (
    <StyledOdyssey>
      <StyledFlex alignItems="flex-start" gap="86px" style={{ width: '100%' }}>
        <StyledFlex flexDirection="column" alignItems="flex-start" gap="15px" style={{ width: '30%', marginTop: 17 }}>
          <StyledFont color="#FFF" fontSize="20px" fontWeight="700">Odyssey</StyledFont>
          <StyledFont color="#979ABE" fontSize="14px">Obtain spins through on-chain interactive quests as you explore the untapped potential of Ethereum L2s.</StyledFont>
        </StyledFlex>
        <StyledFlex flexDirection="column" gap="14px" style={{ width: '30%' }}>
          <StyledContainer style={{ width: 330, height: 120, overflow: 'hidden', borderRadius: 12, border: '2px solid #373A53' }}>
            <StyledImage src="/images/home/odyssey-1.png" />
          </StyledContainer>
          <StyledFont color="#FFF" fontSize="16px" fontWeight="700">Unveiling Uncharted Realms of L2s</StyledFont>
        </StyledFlex>
        <StyledFlex flexDirection="column" gap="14px" style={{ width: '30%' }}>
          <StyledContainer style={{ position: 'relative', width: 330, height: 120, overflow: 'hidden', borderRadius: 12, border: '2px solid #373A53' }}>
            <StyledImage src="/images/home/odyssey-2.png" />
            <StyledMakser>
              <StyledFont color="#FFF" fontSize="16px" fontWeight="500">Coming soon...</StyledFont>
            </StyledMakser>
          </StyledContainer>
          <StyledFont color="#FFF" fontSize="16px" fontWeight="700">Linea Odyssey</StyledFont>
        </StyledFlex>
      </StyledFlex>
    </StyledOdyssey>
  )
}
export default memo(Odyssey)