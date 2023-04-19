import React from "react";
import PropTypes from "prop-types";
import { Widget } from "near-social-vm";
import styled from "styled-components";

const SearchDropDown = (props) => {
  const typeAheadContainer = {
    width: "513px",
    height: "458px",
    zIndex: "3",
    backgroundColor: "black",
    borderRadius: "10px",
    transform: "translateX(50px)",
    display: "flex",
    flexDirection: "column",
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
  };

  console.log("searchValue is", props.searchValue);

  // Update the Footer styling
  const Footer = styled.div`
    display: flex;
    justify-content: right;
    padding: 24px 0;
    border-top: 1px solid rgba(96, 109, 122, 0.4);
  `;

  const Button = styled.button`
    background-color: transparent;
    border: none;
    font-size: 14px;
    font-weight: 600;
    color: #9799f8;
    cursor: pointer;
    padding: 0;
    text-decoration: underline;

    &:hover {
      color: #9799f8;
    }
  `;

  const MainContainer = styled.div`
    display: flex;
    flex-direction: column;
    height: 100vh; // This ensures that the container takes up the full viewport height
  `;
  const ContentContainer = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
  `;

  const ScrollableContent = styled.div`
    overflow-y: auto;
    flex-grow: 1;
  `;

  const FixedFooter = styled.footer`
    padding: 1rem;
    text-align: right;
    border-top: 1px solid rgba(96, 109, 122, 0.4);
  `;

  return (
    <div
      style={typeAheadContainer}
      onFocus={() => props.focusChange(true)}
      onBlur={() => props.focusChange(false)}
      onClick={async () => {
        console.log("closing typeahead");
        await setTimeout(100);
        props.focusChange(false);
        props.searchFocusChange(false);
      }}
    >
      <ContentContainer>
        <Widget
          src='dorgon108.near/widget/SearchPopupFunctions'
          props={{ term: props.term, focusChange: props.searchFocusChange }}
        />
      </ContentContainer>
    </div>
  );
};

SearchDropDown.propTypes = {};

export default SearchDropDown;
