import React from "react";
import PropTypes from "prop-types";
import { Widget } from "near-social-vm";

const SearchDropDown = (props) => {
  const typeAheadContainer = {
    width: "200px",
    height: "194px",
    zIndex: "3",
    backgroundColor: "orange",
    overflow: "scroll", // added overflow property
    padding: "10px", // added padding property
  };

  console.log("searchValue is", props.searchValue);

  return (
    <div style={typeAheadContainer}>
      <Widget
        src='dorgon108.near/widget/SearchPopupFunctions'
        props={{ term: props.term }}
      />
    </div>
  );
};

SearchDropDown.propTypes = {};

export default SearchDropDown;
