import React from "react";
import PropTypes from "prop-types";
import { Widget } from "near-social-vm";
import styled from "styled-components";

const SearchDropDown = (props) => {
  // Update the Footer styling

  const ContentContainer = styled.div``;

  return (
    <div
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
