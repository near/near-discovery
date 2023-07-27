import styled from 'styled-components';

const RefContainer = ({ children }) => {
  return <Container>{children}</Container>;
};

const Container = styled.div`
  display: flex;
  max-width: 1150px;
  padding-left: 60px;
  padding-right: 60px;
  margin: 0 auto;
  /*gap: var(--section-gap);*/
  flex-direction: column;
  //-webkit-box-align: center;
  //align-items: center;
  //-webkit-box-pack: center;
  //justify-content: center;
  //text-align: center;

  @media (max-width: 900px) {
  }
`;

export default RefContainer;
