import styled from 'styled-components';

const CloseIcon = styled.div`
  cursor: pointer;
  transition: 0.3s;
  transform-origin: center;
  &:hover {
    opacity: 0.8;
    transform: scale(1.2);
  }
`;

export default function Close({ size = 18, onClose }: { size?: number; onClose: () => void }) {
  return (
    <CloseIcon
      style={{ width: size * 1.5, height: size * 1.5 }}
      onClick={() => {
        onClose?.();
      }}
    >
      <svg width={size} height={size} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M15.5 5L5.5 15M5.5 5L15.5 15"
          stroke="currentColor"
          strokeWidth="1.66667"
          strokeLinecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </CloseIcon>
  );
}
