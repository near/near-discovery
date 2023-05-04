import copy from 'copy-to-clipboard';
import React from 'react';
import styled from 'styled-components';

import CopyIcon from './icons/copy.svg';

const Wrapper = styled.div`
  .buttons {
    width: 100%;
    margin-top: 0px;
    margin-bottom: 10px;

    button {
      text-align: center;
      width: 100%;
      height: 32px;
      line-height: 32px;
      padding: 0 12px;
      background: #ffffff;
      border-radius: 50px;
      font-size: 12px;
      color: #1b1b18;

      :hover {
        opacity: 0.9;
      }

      img {
        margin: -2px 4px 0;

        &.revert {
          transform: rotate(180deg);
        }
      }
    }
  }
`;

const CodeEx = styled.div`
  padding: 16px;
  margin: 20px 0;
  background: #353431;
  border-radius: 6px;
  color: #a1a09a;
  font-family: Menlo, Monaco, ' Courier New ', monospace;
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 150%;

  pre {
    margin: 0px;
    padding: 0px;
  }
`;

const codeExample = 'Onboarding.ComponentCollection';

export default function Step6() {
  return (
    <Wrapper>
      <div className="title">Search for Community Components </div>
      <div className="desc">
        You can search the platform at any point for community components to inspire new experiences, or to use in your
        own projects.
        <br />
        <br />
        In the search bar, type or paste in:
        <CodeEx>{codeExample}</CodeEx>
        <div className="buttons">
          <button onClick={() => copy(codeExample)}>
            <img src={CopyIcon} /> Copy to Clipboard
          </button>
        </div>
        to search for this component.
      </div>
    </Wrapper>
  );
}
