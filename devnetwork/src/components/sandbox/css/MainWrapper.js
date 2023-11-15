import styled from 'styled-components';

export default styled.div`
  position: relative;

  .glow {
    -webkit-animation: glowing 1000ms infinite;
    -moz-animation: glowing 1000ms infinite;
    -o-animation: glowing 1000ms infinite;
    animation: glowing 1000ms infinite;

    border-radius: 6px;

    @-webkit-keyframes glowing {
      0% {
        border-color: #0d6efd;
        -webkit-box-shadow: 0 0 3px #0d6efd;
      }
      50% {
        border-color: #0d6efd;
        -webkit-box-shadow: 0 0 15px #0d6efd;
      }
      100% {
        border-color: #0d6efd;
        -webkit-box-shadow: 0 0 3px #0d6efd;
      }
    }
    @keyframes glowing {
      0% {
        border-color: #0d6efd;
        box-shadow: 0 0 3px #0d6efd;
      }
      50% {
        border-color: #0d6efd;
        box-shadow: 0 0 15px #0d6efd;
      }
      100% {
        border-color: #0d6efd;
        box-shadow: 0 0 3px #0d6efd;
      }
    }
  }

  .onboardingDisable {
    &::before {
      border: 10px;
      content: '';
      display: block;
      width: 100%;
      height: 100%;
      position: absolute;
      z-index: 10;
      background: white;
      opacity: 0.5;
    }
  }
`;
