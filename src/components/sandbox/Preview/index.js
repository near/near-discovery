import React from 'react';

import { VmComponent } from '@/components/vm/VmComponent';

import { Layout, Tab } from '../utils/const';

const Preview = ({ tab, layout, renderCode, jpath, parsedWidgetProps, isModule, widgets }) => (
  <div
    className={`${tab === Tab.Widget || (layout === Layout.Split && tab !== Tab.Metadata) ? '' : 'visually-hidden'}`}
  >
    <div style={{}}>
      <div
        className="container"
        style={
          tab === Tab.Widget
            ? {
                border: '1px solid #ced4da',
                appearance: 'none',
                borderRadius: '0.375rem',
                height: '70vh',
                maxWidth: '100%',
                padding: '20px',
              }
            : {
                padding: '20px',
                border: '1px solid #ced4da',
                appearance: 'none',
                borderRadius: '0.375rem',
                height: '70vh',
              }
        }
      >
        <div className="h-100 row">
          <div className="d-inline-block position-relative overflow-auto h-100">
            {renderCode ? (
              <div
                style={{
                  padding: 0,
                  margin: 0,
                }}
              >
                <VmComponent
                  key={widgets.wrapper}
                  src={widgets.wrapper}
                  props={{
                    children: <VmComponent key={`preview-${jpath}`} code={renderCode} props={parsedWidgetProps} />,
                  }}
                />
              </div>
            ) : (
              !isModule && (
                <div
                  style={{
                    padding: 0,
                    margin: 0,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {/* <RenderPreviewButton
                    setRenderCode={setRenderCode}
                    layout={layout}
                    setTab={setTab}
                    codeVisible={codeVisible}
                    refs={refs}
                  /> */}
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default Preview;
