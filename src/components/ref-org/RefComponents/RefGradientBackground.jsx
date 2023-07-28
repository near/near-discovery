import styled from 'styled-components';

const RefGradientBackground = ({ children, style, gradients, className }) => {
  return (
    <Background style={style} gradients={gradients} className={className}>
      {children}
    </Background>
  );
};

const Background = styled.div`
  background: linear-gradient(${(p) => p.gradients ?? '180deg, #a35bff 0%, #ff2990 100%'});
`;

export default RefGradientBackground;
