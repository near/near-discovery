import styled from 'styled-components';

const StyledContainer = styled.div`
  color: #fff;
  font-family: Trans-America;
  font-size: 36px;
  font-style: normal;
  font-weight: 400;
  line-height: 100%; /* 36px */
`;

export default function Title({ title }: any) {
  return <StyledContainer>{title.toUpperCase()}</StyledContainer>;
}
