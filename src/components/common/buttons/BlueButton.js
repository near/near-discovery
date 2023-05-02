import React from "react";
import styled from "styled-components";

import { Button } from "./Button";

const StyledButton = styled(Button)`
  background-color: var(--blue-light-9);
  border-color: var(--blue-light-9);
  color: white;
`;

export function BlueButton(props) {
  return <StyledButton {...props}>{props.children}</StyledButton>;
}
