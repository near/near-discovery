import React, { useCallback } from "react";
import styled from "styled-components";
import { Close } from "../../../icons/Close";
import NearLogotype from "../icons/near-logotype.svg";
import { Widget, useNear } from "near-social-vm";

const StyledMenu = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 1000000;
  display: flex;
  transition: 350ms;
  transform: translateX(-100%);

  &.show {
    transform: translateX(0);
  }

  .near-logotype {
    width: 110px;
  }

  .left-side {
    flex: 80;
    background-color: white;
    position: relative;
    display: flex;
    flex-direction: column;
    padding: 25px;
    overflow-x: auto;
  }

  .close-button {
    background-color: #f3f3f2;
    border: 0.5px solid #e3e3e0;
    position: absolute;
    right: 25px;
    top: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    border-radius: 50%;

    svg {
      margin: 0;

      path {
        stroke: #1b1b18;
      }
    }
  }

  .right-side {
    flex: 20;
    opacity: 0.8;
    background-color: var(--slate-dark-1);
  }
`;

export function MenuLeft(props) {
  const near = useNear();
  const withdrawStorage = useCallback(async () => {
    await near.contract.storage_withdraw({}, undefined, "1");
  }, [near]);

  return (
    <StyledMenu className={props.showMenu ? "show" : ""}>
      <div className="left-side">
        <button className="close-button" onClick={props.onCloseMenu}>
          <Close />
        </button>
        <img className="near-logotype" src={NearLogotype} />
      </div>
      <div className="right-side" onClick={props.onCloseMenu} />
    </StyledMenu>
  );
}
