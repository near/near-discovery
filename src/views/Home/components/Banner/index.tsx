import { memo } from 'react';
import Bg from './Bg';
import Title from './Title';
import { StyledContainer, StyledContent, StyledSubTitleWrapper, StyledSubTitleBg, StyledPower } from './styles';

const Banner = () => {
  return (
    <StyledContainer>
      <Bg />
      <StyledContent>
        <Title />
        <StyledSubTitleWrapper>
          <div>Your Universal Gateway into </div>
          <StyledSubTitleBg>Ethereum L2s</StyledSubTitleBg>
        </StyledSubTitleWrapper>
        <StyledPower>
          <div>Powered by</div>
          <svg xmlns="http://www.w3.org/2000/svg" width="83" height="20" viewBox="0 0 83 20" fill="none">
            <path
              d="M34.0608 2.85712C32.557 2.85712 31.4292 3.23306 30.5269 4.06012L28.8728 5.4887C28.7224 5.56388 28.4217 5.71426 28.2713 5.4887C28.0457 5.33832 28.0457 5.11276 28.1961 4.88719L29.0984 3.53381C29.2487 3.30824 29.0984 3.08268 28.8728 3.08268H26.7675C26.542 3.08268 26.3164 3.30824 26.3164 3.53381V16.4661C26.3164 16.6917 26.542 16.9173 26.7675 16.9173H28.948C29.1735 16.9173 29.3991 16.6917 29.3991 16.4661V9.17291C29.3991 5.86464 32.1811 5.33832 33.2337 5.33832C35.4893 5.33832 36.2412 6.91727 36.2412 8.12028V16.4661C36.2412 16.6917 36.4668 16.9173 36.6923 16.9173H38.948C39.1736 16.9173 39.3991 16.6917 39.3991 16.4661V7.81952C39.3991 4.73682 37.369 2.85712 34.0608 2.85712Z"
              fill="white"
            />
            <path
              d="M48.346 2.78198C44.0603 2.78198 41.3535 5.41356 41.3535 8.9474V10.9023C41.3535 14.6617 44.0603 17.2181 48.346 17.2181C52.1054 17.2181 54.8122 15.2632 55.0377 12.6316C55.0377 12.3309 54.8874 12.1805 54.5866 12.1805H52.4813C52.2558 12.1805 52.1054 12.2557 52.0302 12.4812C51.7295 13.3835 50.4513 14.6617 48.346 14.6617C46.2407 14.6617 44.2107 13.0827 44.2858 10.9023V8.42108C44.2858 6.54138 46.2407 5.33837 48.346 5.33837C50.2257 5.33837 52.1054 6.39101 52.331 8.19552C52.331 8.42108 52.1806 8.57146 52.0302 8.64664L45.7896 9.84965C45.564 9.92484 45.3385 10.1504 45.3385 10.376C45.3385 10.6015 45.564 10.8271 45.94 10.8271H54.8873C55.1129 10.8271 55.3385 10.6015 55.3385 10.376V8.64664C55.3385 5.41356 52.4813 2.78198 48.346 2.78198Z"
              fill="white"
            />
            <path
              d="M63.8354 2.78198C60.3767 2.78198 57.3692 4.81206 57.3692 7.44364C57.3692 7.6692 57.5948 7.81958 57.8203 7.81958H60.076C60.3015 7.81958 60.4519 7.6692 60.5271 7.44364C60.6775 6.24063 62.1812 5.33837 63.7602 5.33837C65.6399 5.33837 66.9181 6.46619 66.9181 8.49627V10.9023C66.9181 13.3835 65.1136 14.5865 62.8579 14.5865C61.0534 14.5865 60.076 13.9098 60.076 12.8572C60.076 11.9549 60.6023 11.1278 62.6324 10.6767L65.5647 9.84965C65.8654 9.77446 66.0158 9.5489 65.9406 9.24815C65.9406 9.02258 65.6399 8.9474 65.4143 8.9474H62.3316C59.7 8.9474 57.0685 10.6015 57.0685 13.0075V13.3835C57.0685 15.8647 59.3993 17.1429 62.106 17.1429C63.8354 17.1429 65.2639 16.4662 66.1662 15.7143L67.5196 14.5865C67.7451 14.3609 67.9707 14.3609 68.1211 14.5865C68.2715 14.7369 68.1963 15.0376 68.1211 15.188L67.294 16.4662C67.1436 16.6918 67.294 16.9173 67.5196 16.9173H69.5497C69.7752 16.9173 70.0008 16.6918 70.0008 16.4662V8.12033C70.0008 4.88725 67.67 2.78198 63.8354 2.78198Z"
              fill="white"
            />
            <path
              d="M81.9551 3.0827H78.8724C77.8198 3.0827 76.7671 3.75939 76.0153 4.3609L74.8123 5.41353C74.6619 5.48872 74.4363 5.63909 74.2859 5.48872C74.0604 5.33834 73.9852 5.03759 74.2108 4.88721L75.113 3.53383C75.2634 3.30827 75.113 3.0827 74.8874 3.0827H72.7822C72.5566 3.0827 72.3311 3.30827 72.3311 3.53383V16.4662C72.3311 16.6917 72.5566 16.9173 72.7822 16.9173H75.0378C75.2634 16.9173 75.4889 16.6917 75.4889 16.4662V9.84962C75.4889 6.99248 76.6168 5.71428 79.1732 5.71428H82.0303C82.2559 5.71428 82.4814 5.48872 82.4814 5.26315V3.53383C82.4062 3.30827 82.1807 3.0827 81.9551 3.0827Z"
              fill="white"
            />
            <path
              d="M17.9699 0C17.218 0 16.5414 0.37594 16.1654 1.05263L11.9549 7.29323C11.8045 7.5188 11.8797 7.74436 12.1053 7.89474C12.2556 7.96993 12.4812 7.96993 12.6316 7.89474L16.7669 4.28571C16.8421 4.21053 16.9173 4.21053 16.9925 4.28571C16.9925 4.28571 17.0677 4.3609 17.0677 4.43609V15.6391C17.0677 15.7143 16.9925 15.7895 16.9173 15.7895C16.8421 15.7895 16.8421 15.7895 16.7669 15.7143L4.21053 0.75188C3.83459 0.300752 3.23308 0 2.55639 0H2.18045C0.977443 0 0 0.977444 0 2.10526V17.8195C0 19.0226 0.977444 19.9248 2.10526 19.9248C2.85714 19.9248 3.53383 19.5489 3.90977 18.8722L8.1203 12.6316C8.27068 12.406 8.19549 12.1805 7.96992 12.0301C7.81955 11.9549 7.59399 11.9549 7.44361 12.0301L3.30827 15.6391C3.23308 15.7143 3.1579 15.7143 3.08271 15.6391C3.08271 15.6391 3.00752 15.5639 3.00752 15.4887V4.43609C3.00752 4.3609 3.08271 4.28571 3.15789 4.28571C3.23308 4.28571 3.23308 4.28571 3.30827 4.3609L15.7895 19.2481C16.1654 19.6992 16.7669 20 17.4436 20H17.8947C19.0977 20 20 19.0226 20 17.8947V2.10526C20.0752 0.977444 19.1729 0 17.9699 0Z"
              fill="white"
            />
          </svg>
          <div>(B.O.S).</div>
        </StyledPower>
      </StyledContent>
    </StyledContainer>
  );
};

export default memo(Banner);
