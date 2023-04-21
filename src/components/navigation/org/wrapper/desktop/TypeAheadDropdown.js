import React from "react";
import { Widget } from "near-social-vm";
import styled from "styled-components";

const TypeAheadDropdown = (props) => {
  const ContentContainer = styled.div``;

  return (
    <div
      onFocus={() => props.focusChange(true)}
      onBlur={() => props.focusChange(false)}
      onClick={async () => {
        await setTimeout(100);
        props.focusChange(false);
        props.searchFocusChange(false);
      }}
    >
      <ContentContainer>
        <Widget
          src={props.widgetSrc}
          props={{ term: props.term, focusChange: props.searchFocusChange }}
        />
      </ContentContainer>
    </div>
  );
};

export default TypeAheadDropdown;
