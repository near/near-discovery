import React from 'react';
import styled from 'styled-components';

import { Layout, Tab } from '../utils/const';

const TabButton = styled.button`
  &.active {
    isolation: isolate;
  }
`;

const Tabs = ({ isModule, tab, setTab, widgets, layout, setRenderCode, codeVisible }) => (
  <div style={{ display: 'flex' }}>
    <ul
      className={`nav nav-tabs`}
      style={{
        borderBottom: '0px',
        marginTop: '9px',
      }}
    >
      {isModule && (
        <li className="nav-item">
          <TabButton
            className={`nav-link ${tab === Tab.Editor ? 'active' : 'text-secondary'}`}
            aria-current="page"
            onClick={() => setTab(Tab.Editor)}
          >
            Module
          </TabButton>
        </li>
      )}
      {isModule || (
        <>
          <li className="nav-item">
            <TabButton
              className={`nav-link ${tab === Tab.Editor ? 'active' : 'text-secondary'}`}
              aria-current="page"
              onClick={() => setTab(Tab.Editor)}
            >
              Component
            </TabButton>
          </li>
          <li className="nav-item">
            <TabButton
              className={`nav-link ${tab === Tab.Props ? 'active' : 'text-secondary'}`}
              aria-current="page"
              onClick={() => setTab(Tab.Props)}
            >
              Props
            </TabButton>
          </li>
          {widgets.widgetMetadataEditor && (
            <li className="nav-item">
              <TabButton
                className={`nav-link ${tab === Tab.Metadata ? 'active' : 'text-secondary'}`}
                aria-current="page"
                onClick={() => setTab(Tab.Metadata)}
              >
                Metadata
              </TabButton>
            </li>
          )}
          {/* remove, and add show preview button on the right column */}
          {layout === Layout.Tabs && (
            <li className="nav-item">
              <TabButton
                className={`nav-link ${tab === Tab.Widget ? 'active' : 'text-secondary'}`}
                aria-current="page"
                onClick={() => {
                  setRenderCode(codeVisible);
                  setTab(Tab.Widget);
                }}
              >
                Component Preview
              </TabButton>
            </li>
          )}
        </>
      )}
    </ul>
  </div>
);

export default Tabs;
