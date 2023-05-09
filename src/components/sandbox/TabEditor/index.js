import Editor from '@monaco-editor/react';
import React from 'react';

import { Tab } from '../utils/const';

const TabEditor = ({
  tab,
  // codeVisible,
  widgetPath,
  changeCode,
  path,
  reformat,
  refs,
  refEditor,
  filesObject,
}) => {
  const jpath = JSON.stringify(path);
  const codeVisible = filesObject[jpath]?.codeVisible;

  return (
    <div className={`${tab === Tab.Editor ? '' : 'visually-hidden'}`} ref={refEditor}>
      <div ref={refs.step3}>
        <div ref={refs.step2}>
          <div ref={refs.step8}>
            <div className="form-control mb-3" style={{ height: '70vh', borderTopLeftRadius: '0px' }}>
              <Editor
                value={codeVisible}
                path={widgetPath}
                defaultLanguage="javascript"
                onChange={(code) => changeCode(path, code)}
                wrapperProps={{
                  onBlur: () => reformat(path, codeVisible),
                }}
              />
            </div>
            <div className="mb-3 d-flex gap-2 flex-wrap"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TabEditor;
