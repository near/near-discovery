import React from 'react';
import styled from 'styled-components';

import { VmComponent } from '@/components/vm/VmComponent';
import { useBosComponents } from '@/hooks/useBosComponents';
import { useCurrentComponentStore } from '@/stores/current-component';

const Wrapper = styled.div`
  border: 1px solid #eeeeec;
  background-color: #f9f9f8;
  border-radius: 4px;
  min-width: 253px;

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
    padding: 15px 15px 0;
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
type Props = {
  onCloseMenu?: () => void;
};

export const CurrentComponent = (props: Props) => {
  const src = useCurrentComponentStore((store) => store.src);
  const components = useBosComponents();

  if (!src) return null;

  const handleCloseMenu = () => {
    if (props.onCloseMenu) {
      props.onCloseMenu();
    }
  };

  return (
    <Wrapper>
      <div className="title">Current Component</div>
      <VmComponent
        src={components.componentSummary}
        props={{
          src,
          size: 'medium',
          showTags: true,
          onCloseMenu: handleCloseMenu,
        }}
      />
    </Wrapper>
  );
};
