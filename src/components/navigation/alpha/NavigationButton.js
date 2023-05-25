import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";

const StyledNavigationButton = styled.div`
  a {
    color: #0f1d40;
    font-size: 16px;
    padding: 10px;
    border-radius: 8px;
    font-weight: 900;
    height: 40px;
    font-family: "SF Pro Display", sans-serif;
    text-decoration: none;
    display: inline-block;
    position: relative;
    transition: all 0.3s ease-out;

    &:hover,
    &.active {
      text-decoration: none;
    }
    ::before {
      content: "";
      position: absolute;
      top: 100%;
      left: 9px;
      width: 25px;
      height: 3px;
      background: var(--blue-light-9);
      transform: scaleX(0);
      transform-origin: left center;
      transition: all 0.3s ease-out;
    }
    &:hover::before{
      transform: scaleX(1);
    }
  }
  &.disabled {
    opacity: 0.5;
  }
`;

export function NavigationButton(props) {
  return (
    <StyledNavigationButton
      onMouseEnter={props.onMouseEnter}
      className={props.disabled ? "disabled" : ""}
    >
      {props.route ? (
        <NavLink
          onClick={(e) => {
            if (props.disabled) {
              e.preventDefault();
            }
          }}
          to={props.route}
          exact
          isActive={(match, location) => {
            if (
              location.pathname !== "/" &&
              props.route.includes(location.pathname)
            ) {
              return true;
            }
            if (props.homeRoute) {
              if (location.pathname === "/") {
                return true;
              }
              return (
                location.pathname === "/jgodwill.near/widget/GenaDropMultiListing"
              );
            }
          }}
        >
          {props.children}
        </NavLink>
      ) : (
        <a href={props.href} target="_blank" rel="noopener noreferrer">
          {props.children}
        </a>
      )}
    </StyledNavigationButton>
  );
}
