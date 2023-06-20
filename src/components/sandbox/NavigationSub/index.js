import ls from 'local-storage';
import React from 'react';

import OpenInNewTabButton from '../Buttons/OpenInNewTabButton';
import RenderPreviewButton from '../Buttons/RenderPreviewButton';
import { EditorLayoutKey, Layout, Tab } from '../utils/const';

const NavigationSub = ({
  layout,
  path,
  accountId,
  tab,
  widgetPath,
  setTab,
  setLayoutState,
  refs,
  handleRender,
  disable,
}) => {
  const onLayoutChange = (e) => {
    const layout = e.target.value;
    if (layout === Layout.Split && tab === Tab.Widget) {
      setTab(Tab.Editor);
    }
    setLayout(layout);
  };

  const setLayout = (layout) => {
    ls.set(EditorLayoutKey, layout);
    setLayoutState(layout);
  };

  return (
    <>
      <div
        className="ms-auto d-flex"
        style={{
          height: '38px',
          display: 'flex',
          marginBottom: '12px',
          justifyContent: 'end',
        }}
      >
        {(Tab.Widget === tab || layout === Layout.Split) && (
          <div className="d-flex justify-content-end me-2">
            <RenderPreviewButton refs={refs} handleRender={handleRender} disable={disable} />
          </div>
        )}
        {path?.type === 'widget' && accountId && <OpenInNewTabButton widgetPath={widgetPath} disable={disable} />}

        <div className="btn-group" role="group" aria-label="Layout selection">
          <input
            disabled={disable.changeViewButton}
            type="radio"
            className="btn-check"
            name="layout-radio"
            id="layout-tabs"
            autoComplete="off"
            checked={layout === Layout.Tabs}
            onChange={onLayoutChange}
            value={Layout.Tabs}
            title={'Set layout to Tabs mode'}
          />
          <label className="btn btn-outline-secondary" htmlFor="layout-tabs">
            <i className="bi bi-square" />
          </label>

          <input
            disabled={disable.changeViewButton}
            type="radio"
            className="btn-check"
            name="layout-radio"
            id="layout-split"
            autoComplete="off"
            checked={layout === Layout.Split}
            value={Layout.Split}
            title={'Set layout to Split mode'}
            onChange={onLayoutChange}
          />
          <label className="btn btn-outline-secondary" htmlFor="layout-split">
            <i className="bi bi-layout-split" />
          </label>
        </div>
      </div>
    </>
  );
};

export default NavigationSub;
