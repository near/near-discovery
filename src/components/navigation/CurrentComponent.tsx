import React from 'react';
import styled from 'styled-components';

import { VmComponent } from '@/components/client/VmComponent';
import { useBosComponents } from '@/hooks/useBosComponents';
import { useCurrentComponentStore } from '@/stores/current-component';

const StyledCurrentComponent = styled.div`
  border: 1px solid #eeeeec;
  background-color: #f9f9f8;
  border-radius: 4px;
  min-height: 100%;

  .title {
    color: #868682;
    font-size: 12px;
    text-align: center;
    background-color: #f3f3f2;
    padding: 5px;
    margin-bottom: 20px;
  }
  h1 {
    color: #1b1b18;
  }
  p {
    color: #706f6c;
  }
  a {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  > div {
    padding: 15px;
    div:nth-child(1) {
      flex-direction: column;
      text-align: center;
    }
    div:nth-child(2) {
      a {
        :nth-child(1) {
          flex: 100%;
          background-color: #161615;
          color: white !important;
        }
        :nth-child(2) {
          flex: auto;
        }
        :nth-child(3) {
          flex: auto;
        }
      }
      > button {
        display: none;
      }
    }
  }
`;

export const CurrentComponent = () => {
  const src = useCurrentComponentStore((store) => store.src);
  const components = useBosComponents();

  if (!src) return null;

  return (
    <StyledCurrentComponent className="current-component">
      <div className="title">Current Component</div>
      <VmComponent
        src={components.componentSummary}
        props={{
          src,
          size: 'medium',
          showTags: true,
        }}
      />
    </StyledCurrentComponent>
  );
};
