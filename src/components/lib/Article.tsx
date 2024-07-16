import Link from 'next/link';
import styled from 'styled-components';

export const Article = styled(Link)`
  display: flex;
  flex-direction: column;
  gap: 6px;
  text-decoration: none !important;
  outline: none;
  box-shadow: 0 0 0 0px var(--violet4);

  i {
    color: var(--sand12);
  }

  &:hover {
    h3 {
      text-decoration: underline;
    }

    div:first-child {
      &::before {
        opacity: 1;
      }
    }
  }

  &:focus {
    div:first-child {
      box-shadow: 0 0 0 4px var(--violet4);
    }
  }
`;

export const ArticleImage = styled.div`
  border-radius: 8px;
  overflow: hidden;
  width: 100%;
  height: 220px;
  transition: all 200ms;
  margin-bottom: 10px;
  position: relative;

  img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
    position: relative;
    z-index: 5;
  }

  &::before {
    content: '';
    display: block;
    inset: 0;
    background: var(--whiteA6);
    z-index: 10;
    position: absolute;
    opacity: 0;
    transition: all 200ms;
  }
`;
