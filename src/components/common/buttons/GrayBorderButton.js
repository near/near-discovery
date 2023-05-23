import React from "react";
import { Button } from "./Button";
import styled from "styled-components";

const StyledButton = styled(Button)`
  background-color: var(--blue-light-9);
  border-color: var(--blue-light-9);
  color: white;
  &:hover{
    background-color: #fff;
    color: var(--blue-light-9);
  }
`;

export function GrayBorderButton(props) {
  return <StyledButton {...props}>{props.children}</StyledButton>;
}
