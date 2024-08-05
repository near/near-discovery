import styled from 'styled-components';

export const RootContentContainer = styled.div`
  /*
    NOTE: We don't want to set max-width or padding on this root container. If we did,
    it would be impossible for application/component developers to have UI that bleeds 
    to the edge for designs that require background colors or images. The developer of 
    the components is responsible for setting an appropriate max-width and/or padding.
  */

  flex-grow: 1;
  width: 100%;
  position: relative;
  overflow: hidden;
`;
