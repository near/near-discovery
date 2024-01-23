import { memo } from 'react';
import {
  StyledContainer,
  StyledFlex,
  StyledHead,
  StyledIconRight,
  StyledQuestion,
  StyledQuestionDesc,
  StyledQuestionName,
  StyledSvg,
  StyledText
} from './styles';

import iconHand from '@/assets/images/icon_hand.svg';
import Image from 'next/image';

const iconRight = (
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="10" viewBox="0 0 14 10" fill="none">
    <path d="M7.78087 9.02391C7.38054 9.52432 6.61946 9.52432 6.21913 9.02391L0.299758 1.62469C-0.224053 0.969931 0.24212 -1.29017e-06 1.08063 -1.21687e-06L12.9194 -1.81894e-07C13.7579 -1.08589e-07 14.2241 0.969932 13.7002 1.62469L7.78087 9.02391Z" fill="#979ABE" />
  </svg>
)
const QA = () => {
  const questionList = [{
    icon: iconHand,
    name: 'What is BNS?',
    desc: 'Base Name Service (BNS) is a native naming service built on Base. BNS maps human readable names like “bob.base” to crypto wallet addresses, AA addresses, decentralized webs, hashes, and metadata.'
  }]
  return (
    <StyledContainer>
      <StyledHead>Q&A</StyledHead>
      <StyledFlex $direction='column' $gap='30px'>
        {
          questionList.map((question, index) => (
            <StyledQuestion key={index}>
              <StyledQuestionName>
                <StyledFlex $gap='16px'>
                  <StyledSvg><Image src={question.icon} alt={question.name} /></StyledSvg>
                  <StyledText $size='20px' $weight='700' $line='120%'>{question.name}</StyledText>
                </StyledFlex>
                <StyledIconRight>
                  {iconRight}
                </StyledIconRight>
              </StyledQuestionName>
              <StyledQuestionDesc>
                <StyledText $color='#979ABE' $size='16px' $line='120%'>{question.desc}</StyledText>
              </StyledQuestionDesc>
            </StyledQuestion>
          ))
        }
      </StyledFlex>
    </StyledContainer>
  );
};

export default memo(QA);
