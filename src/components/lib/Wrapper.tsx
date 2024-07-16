import styled from 'styled-components';

export const Wrapper = styled.div`
  --section-gap: 120px;
  --text-hero: 500 72px/1 'FK Grotesk', 'Mona Sans', sans-serif;
  margin-top: calc(var(--body-top-padding) * -1);

  .darkButton {
    color: #fff !important;
    background: transparent !important;
    border-color: #00ec97 !important;
    &:focus {
      border-color: var(--violet9) !important;
    }
    &:hover {
      color: #000 !important;
      background: #00ec97 !important;
    }
    &:active {
      color: #000 !important;
      background: var(--sand3) !important;
      border-color: var(--sand3) !important;
    }
  }

  @media (max-width: 900px) {
    --section-gap: 80px;
  }
`;
