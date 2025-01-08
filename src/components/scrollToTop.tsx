import { Button } from '@near-pagoda/ui';
import { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

const ScrollToTopButton = styled(Button)<{ isVisible: boolean }>`
  position: fixed;
  bottom: 15px;
  cursor: pointer;
  z-index: 1000;
  animation: ${fadeIn} 0.5s;
`;

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.scrollY > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
  }, []);

  return <>{isVisible && <ScrollToTopButton label="back to top" isVisible={isVisible} onClick={scrollToTop} />}</>;
}
