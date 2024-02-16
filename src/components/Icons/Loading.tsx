import styled from 'styled-components';

const StyledLoading = styled.div<{ size: number; $mr?: string }>`
  width: ${({ size }) => size + 'px'};
  height: ${({ size }) => size + 'px'};
  line-height: ${({ size }) => size - 4 + 'px'};
  animation: loading 1s linear infinite;
  transform-origin: center center;
  display: inline-block;
  text-align: center;
  ${({ $mr }) => $mr && 'margin-right:' + $mr + ';'}
  @keyframes loading {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

export default function Loading({ size = 18, mr }: { size?: number; mr?: string }) {
  return (
    <StyledLoading size={size} $mr={mr}>
      <svg width={size} height={size} viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle opacity="0.2" cx="9" cy="9" r="8" stroke="white" strokeWidth="2" />
        <path
          d="M1 9C1 13.4183 4.58172 17 9 17C13.4183 17 17 13.4183 17 9C17 4.58172 13.4183 1 9 1"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    </StyledLoading>
  );
}
