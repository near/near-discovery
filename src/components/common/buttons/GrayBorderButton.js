import React from "react";
import styled from "styled-components";

import { Button } from "./Button";

const StyledButton = styled(Button)`
  background-color: var(--slate-dark-6);
  border-color: var(--slate-dark-8);
  color: white;
`;

export function GrayBorderButton(props) {
  return <StyledButton {...props}>{props.children}</StyledButton>;
}
