import styled from 'styled-components';

const Loading = styled.div<{ size: number }>`
  width: ${({ size }) => size + 'px'};
  height: ${({ size }) => size + 'px'};
  line-height: ${({ size }) => size + 'px'};
  animation: loading 1s linear infinite;
  transform-origin: center center;
  display: inline-block;
  text-align: center;
  @keyframes loading {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

export default ({ size = 18 }: { size?: number }) => {
  return (
    <Loading size={size}>
      <svg width={size} height={size} viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle opacity="0.2" cx="9" cy="9" r="8" stroke="white" stroke-width="2" />
        <path
          d="M1 9C1 13.4183 4.58172 17 9 17C13.4183 17 17 13.4183 17 9C17 4.58172 13.4183 1 9 1"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
        />
      </svg>
    </Loading>
  );
};
