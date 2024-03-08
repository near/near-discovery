import { useUserStore } from '@/stores/user';
import { memo, useMemo } from "react";
import styled from "styled-components";
import useCopy from '@/hooks/useCopy';
import {
  StyledContainer,
  StyledFlex,
  StyledFont,
  StyledSvg
} from '@/styled/styles';
const StyledLink = styled.div`
  position: relative;
`
const StyledTips = styled.div`
  position: absolute;
  left: 8px;
  top: -15px;
  width: 132px;
  height: 25px;
  border-radius: 5px;
  background: linear-gradient(to left, #000 0%, #414D58 100%);
  display: flex;
  align-items: center;
  justify-content: center;
`

const InviteLink = function ({ showCodes, setShowCodes }: { showCodes: boolean, setShowCodes: (show: boolean) => void }) {
  const userInfo = useUserStore((store: any) => store.user);
  const { copy } = useCopy()

  const link = useMemo(() => location.origin + (userInfo?.is_kol ? `/invite/${userInfo?.kol_name}` : `/referral/${userInfo?.invite_code}`), [userInfo])
  return (
    <StyledContainer style={{ paddingLeft: 24, paddingRight: 20, paddingTop: 20 }}>
      <StyledFlex flexDirection="column" gap="31px">
        <StyledFlex
          justifyContent="space-between"
          style={{ width: '100%' }}
        >
          <StyledFont fontWeight="700" color="#FFF">Your Invite Link</StyledFont>
          <StyledFont
            fontWeight="500"
            color="#FFF"
            style={{ cursor: 'pointer', textDecoration: 'underline' }}
            onClick={() => setShowCodes(true)}
          >{userInfo?.total_invited} invited</StyledFont>
        </StyledFlex>
        <StyledLink>
          <StyledSvg>
            <svg width="308" height="53" viewBox="0 0 308 53" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M8 0H249.615C249.767 1.51433 251.046 2.69653 252.6 2.69653C254.155 2.69653 255.433 1.51433 255.585 0H300C304.418 0 308 3.58172 308 8V45C308 49.4183 304.418 53 300 53H255.555C255.309 51.5911 254.08 50.5203 252.6 50.5203C251.121 50.5203 249.891 51.5911 249.645 53H8C3.58172 53 0 49.4183 0 45V8C0 3.58172 3.58172 0 8 0Z" fill="url(#paint0_linear_7047_6093)" />
              <line x1="252.5" y1="4.5" x2="252.5" y2="48.5" stroke="black" stroke-linecap="round" strokeDasharray="1 3" />
              <defs>
                <linearGradient id="paint0_linear_7047_6093" x1="-2.84001e-06" y1="31.8316" x2="53.2945" y2="-31.4454" gradientUnits="userSpaceOnUse">
                  <stop stop-color="#62FFF6" />
                  <stop offset="0.520833" stop-color="#B479FF" />
                  <stop offset="1" stop-color="#FFC289" />
                </linearGradient>
              </defs>
            </svg>
          </StyledSvg>
          <StyledFlex
            justifyContent="space-between"
            style={{
              position: 'absolute',
              left: 0,
              top: 0,
              right: 0,
              bottom: 0,
              paddingTop: 10,
              paddingRight: 18,
              paddingBottom: 10,
              paddingLeft: 10
            }}
          >
            <StyledFont
              fontSize="14px"
              fontWeight="500"
              style={{ width: 232, wordBreak: 'break-all' }}
            >
              {link}
            </StyledFont>
            <StyledSvg style={{ cursor: 'pointer' }} onClick={() => copy(link)}>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M14.2665 9.50751C14.3752 10.3125 14.3752 11.3025 14.3752 12.3813V14.2438C14.3752 14.4913 14.3752 14.6138 14.4552 14.6888C14.5352 14.7625 14.6552 14.7538 14.8952 14.7363C15.0933 14.7222 15.2909 14.7022 15.4877 14.6763C16.2877 14.5688 16.9515 14.3525 17.5115 13.8925C17.7119 13.7284 17.8957 13.545 18.0602 13.345C18.5452 12.7538 18.7577 12.0463 18.8602 11.1875C18.959 10.35 18.959 9.29251 18.959 7.95751V7.87626C18.959 6.54126 18.959 5.48251 18.859 4.64626C18.759 3.78626 18.5452 3.08001 18.059 2.48876C17.8965 2.28876 17.7115 2.10501 17.5115 1.94001C16.9202 1.45501 16.2127 1.24251 15.354 1.14001C14.5165 1.04126 13.459 1.04126 12.1252 1.04126H12.044C10.709 1.04126 9.65148 1.04126 8.81398 1.14126C7.95523 1.24126 7.24773 1.45501 6.65648 1.94126C6.45648 2.10376 6.27273 2.28876 6.10898 2.48876C5.64898 3.04876 5.43398 3.71376 5.32524 4.51376C5.30023 4.69876 5.28023 4.89626 5.26523 5.10501C5.24773 5.34501 5.23899 5.46501 5.31273 5.54501C5.38773 5.62501 5.51023 5.62501 5.75773 5.62501H7.62023C8.69898 5.62501 9.68773 5.62501 10.4952 5.73376C11.3827 5.85251 12.3227 6.13376 13.0952 6.90626C13.8677 7.67876 14.149 8.61876 14.2677 9.50626L14.2665 9.50751Z" fill="black" />
                <path d="M6.62125 6.875H7.54625C8.685 6.875 9.60375 6.875 10.3263 6.9725C11.0763 7.0725 11.7075 7.28875 12.21 7.79C12.7113 8.2925 12.9275 8.92375 13.0275 9.67375C13.125 10.3962 13.125 11.315 13.125 12.4538V13.3787C13.125 14.5188 13.125 15.4375 13.0275 16.16C12.9275 16.91 12.7113 17.5413 12.21 18.0425C11.7075 18.545 11.0763 18.76 10.3263 18.8612C9.60375 18.9587 8.685 18.9587 7.54625 18.9587H6.62125C5.48125 18.9587 4.5625 18.9587 3.84 18.8612C3.09 18.7612 2.45875 18.545 1.9575 18.0425C1.455 17.5425 1.24 16.91 1.13875 16.16C1.04125 15.4375 1.04125 14.5188 1.04125 13.3787V12.4538C1.04125 11.315 1.04125 10.3962 1.13875 9.67375C1.23875 8.92375 1.455 8.2925 1.9575 7.79C2.4575 7.28875 3.09 7.0725 3.84 6.9725C4.5625 6.875 5.48125 6.875 6.62125 6.875Z" fill="black" />
              </svg>
            </StyledSvg>
          </StyledFlex>
          {
            userInfo?.is_kol && (
              <StyledTips>
                <StyledFont
                  color='transparent'
                  fontSize='12px'
                  fontWeight='700'
                  style={{ background: 'linear-gradient(90deg, #FFF 0%, #999 100%)', backgroundClip: 'text' }}
                >KOL SPECIAL LINK</StyledFont>
              </StyledTips>
            )
          }
        </StyledLink>
      </StyledFlex>
    </StyledContainer>

  )
}
export default memo(InviteLink)