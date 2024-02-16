import { memo, useState } from 'react';
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
  <svg xmlns="http://www.w3.org/2000/svg" width="10" height="14" viewBox="0 0 10 14" fill="none">
    <path d="M9.02391 6.21913C9.52432 6.61946 9.52432 7.38054 9.02391 7.78087L1.6247 13.7002C0.969933 14.2241 1.75986e-07 13.7579 1.65987e-07 12.9194L2.48112e-08 1.08062C1.48121e-08 0.242119 0.969932 -0.224055 1.62469 0.299756L9.02391 6.21913Z" fill="#979ABE" />
  </svg>
)
const QA = () => {
  const questionList = [{
    icon: iconHand,
    name: 'What is BNS?',
    desc: 'Base Name Service (BNS) is a native naming service built on Base. BNS maps human readable names like “bob.base” to crypto wallet addresses, AA addresses, decentralized webs, hashes, and metadata.'
  }]
  const [questionIndex, setQuestionIndex] = useState(-1)

  const handleClick = function (index: number) {
    setQuestionIndex(questionIndex > -1 ? -1 : index)
  }
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
                <StyledIconRight className={questionIndex === index ? 'active' : ''} onClick={() => handleClick(index)}>
                  {iconRight}
                </StyledIconRight>
              </StyledQuestionName>
              {questionIndex === index && <StyledQuestionDesc>
                <StyledText $color='#979ABE' $size='16px' $line='120%'>{question.desc}</StyledText>
              </StyledQuestionDesc>}
            </StyledQuestion>
          ))
        }
      </StyledFlex>
    </StyledContainer>
  );
};

export default memo(QA);
