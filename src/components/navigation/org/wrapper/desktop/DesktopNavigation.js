import React, { useState, useEffect } from "react";
import MainNavigationMenu from "./main_navigation_menu/MainNavigationMenu";
import styled from "styled-components";
import NearLogotype from "../../icons/near-logotype.svg";
import { Link, useHistory } from "react-router-dom";
import image from "../../icons/search.svg";
import { Return } from "../../icons/Return";

const StyledNavigation = styled.div`
  z-index: 1000;
  position: sticky;
  top: 0;
  left: 0;
  right: 0;
  background-color: white;
  padding-top: 16px;
  padding-bottom: 16px;

  &.border-bottom {
    border-bottom: 1px solid #e3e3e0;
  }

  .container {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  nav {
    margin: 0 auto;
  }

  .form-wrapper {
    position: relative;

    input {
      background-repeat: no-repeat;
      background-repeat: no-repeat;
      border-radius: 50px;
      padding: 7px 25px 7px 44px;
      background-position: 12px 8px;
      border: 1px solid #e3e3e0;
      background-color: white;
      font-size: 16px;
      margin-left: 30px;
      width: 200px;

      :focus {
        outline: 0;
        border: 1px solid #6d62d4;
        box-shadow: 0px 0px 0px 4px #cbc7f4;
      }

      ::placeholder {
        color: #9ba1a6;
      }
    }

    svg {
      position: absolute;
      right: 16px;
      top: 10px;
      width: 20px;
      height: 20px;
    }
  }

  .guest-buttons {
    display: flex;
    align-items: center;
    margin-left: auto;
    button {
      border-radius: 50px;
      display: flex;
      align-items: center;
      justify-content: center;
      height: 40px;
      padding: 0 20px;
      font-size: 14px;
      font-weight: 600;
    }
    .sign-in {
      color: #1b1b18;
      font-weight: 500;
      margin-right: 10px;
      border: 1px solid transparent;
      :hover {
        background-color: #f3f3f2;
      }
      :focus {
        background-color: white;
        border: 1px solid #604cc8;
        box-shadow: 0px 0px 0px 4px #cbc7f4;
      }
    }
    .create-account {
      background-color: #161615;
      color: white;
      :hover {
        background-color: #2e2e2b;
      }
      :focus {
        box-shadow: 0px 0px 0px 4px #cbc7f4;
      }
    }
  }
`;

const DesktopNavigation = () => {
  const [searchInputFocus, setSearchInputFocus] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const history = useHistory();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <StyledNavigation className={`${scrolled ? "border-bottom" : ""}`}>
      <div className="container">
        <Link to="/">
          <img src={NearLogotype} />
        </Link>
        <div className="form-wrapper">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              history.push(
                `/${props.widgets?.globalSearchPage}?term=${e.target[0].value}`
              );
            }}
          >
            <input
              placeholder="Search NEAR"
              style={{ backgroundImage: `url(${image})` }}
              onFocus={() => setSearchInputFocus(true)}
              onBlur={() => setSearchInputFocus(false)}
            />
          </form>
          {searchInputFocus && <Return />}
        </div>
        <MainNavigationMenu />
        <div className="guest-buttons">
          <button className="sign-in">Sign In</button>
          <button className="create-account">Create Account</button>
        </div>
      </div>
    </StyledNavigation>
  );
};

export default DesktopNavigation;
