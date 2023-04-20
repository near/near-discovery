import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import LogoBlack from "../icons/logo-black.svg";
import { Widget } from "near-social-vm";
import { useHistory } from "react-router-dom";

const StyledNavigation = styled.div`
  position: sticky;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  background-color: white;
  z-index: 1000;
  padding: 16px 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  &.border-bottom {
    border-bottom: 1px solid #e3e3e0;
  }

  .logo-link {
    img {
      width: 28px;
      height: 28px;
    }
  }

  .nav-notification-widget {
    margin: 0;
  }

  .mobile-nav-profile-btn {
    width: 40px;
    height: 40px;
    padding: 0;
    outline: none;
    border: 0;
    border-radius: 50%;

    img,
    svg {
      border-radius: 50% !important;
    }

    .menu-icon {
      background-color: #161615;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 50%;
      width: 40px;
      height: 40px;
      i {
        color: white;
      }
    }
  }

  .mobile-nav-develop-btn {
    background-color: #f3f3f2;
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 0.5px solid #e3e3e0;
    padding: 0;
    outline: none;
    border-radius: 50%;
  }

  i {
    font-size: 20px;
  }
`;

export function TopNavigation(props) {
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
      <button
        onClick={() => props.onClickShowMenu("left")}
        className="mobile-nav-profile-btn"
      >
        {props.signedIn ? (
          <Widget
            src={props.widgets.profileImage}
            props={{
              accountId: props.signedAccountId,
              className: "d-inline-block",
              style: { width: "40px", height: "40px" },
            }}
          />
        ) : (
          <div className="menu-icon">
            <i className="ph-bold ph-list"></i>
          </div>
        )}
      </button>
      <Link to="/" className="logo-link">
        <img src={LogoBlack} />
      </Link>
      <button
        className="mobile-nav-develop-btn"
        onClick={() => history.push("/applications")}
      >
        <i className="ph-bold ph-shapes"></i>
      </button>
    </StyledNavigation>
  );
}
