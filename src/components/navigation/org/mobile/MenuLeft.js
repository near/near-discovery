import React from "react";
import styled from "styled-components";
import { Close } from "../../../icons/Close";
import image from "../icons/search.svg";
import NearLogotype from "../icons/near-logotype.svg";
import { useNear } from "near-social-vm";
import AccordionMenu from "./AccordionMenu";
import { NotificationWidget } from "../NotificationWidget";
import UserDropdownMenu from "../wrapper/desktop/UserDropdownMenu";
import { useHistory } from "react-router-dom";

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
    flex: 90;
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

  .search-btn {
    all: unset;
    background-repeat: no-repeat;
    background-position: 12px 12px;
    padding-left: 44px;
    margin: 45px 0;
    border: 1px solid #E3E3E0;
    border-radius: 50px;
    min-height: 48px;
    height: 48px;
    color: #868682;
    width: 100%:
    display: flex;
    align-items: center;

    :focus {
      background-color: white;
      border: 1px solid #604cc8;
      box-shadow: 0px 0px 0px 4px #cbc7f4;
    }
  }

  .current-component {
    margin-bottom: 25px;
  }
  
  .bottom-btns {
    margin-top: auto;

    button {
      width: 100%;
      height: 48px;
      border-radius: 50px;
      font-size: 16px;
      font-weight: 600;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .sign-in {
      background-color: #F3F3F2;
      color: #1B1B18;
      border: 0.5px solid #E3E3E0;
      margin: 20px 0;
    }
    .create-account {
      background-color: #161615;
      color: white;
      border: 0;
    }
  }

  .logged-in-btns {
    margin-top: auto;
    display: flex;

    .nav-notification-widget {
      margin: 0;
      min-width: 46px;
      min-height: 46px;
      margin-right: 20px;

      a {
        min-width: 46px;
        min-height: 46px;
      }
    }

    > div {
      :nth-child(2) {
        width: fill-available;
        > button {
          width: 100%;

          i {
            margin: 0 15px 0 0;
            margin-left: auto;
          }
        }
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
  const history = useHistory();

  return (
    <StyledMenu className={props.showMenu ? "show" : ""}>
      <div className="left-side">
        <button className="close-button" onClick={props.onCloseMenu}>
          <Close />
        </button>
        <img
          className="near-logotype"
          src={NearLogotype}
          onClick={() => history.push("/")}
        />
        <button
          className="search-btn"
          style={{ backgroundImage: `url(${image})` }}
          onClick={() => history.push(`/${props.widgets?.globalSearchPage}`)}
        >
          Search NEAR
        </button>
        <AccordionMenu {...props} />

        {!props.signedIn && (
          <div className="bottom-btns">
            <button
              className="sign-in"
              onClick={() => {
                props.onCloseMenu();
                props.requestSignIn();
              }}
            >
              Sign in
            </button>
            <button
              className="create-account"
              onClick={() => {
                window.location = "https://wallet.near.org/create";
              }}
            >
              Create Account
            </button>
          </div>
        )}
        {props.signedIn && (
          <div className="logged-in-btns">
            <NotificationWidget
              notificationButtonSrc={props.widgets.notificationButton}
            />
            <UserDropdownMenu {...props} />
          </div>
        )}
      </div>
      <div className="right-side" onClick={props.onCloseMenu} />
    </StyledMenu>
  );
}
