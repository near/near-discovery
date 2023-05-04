export const DISABLE_MODULES = true;

const LsKey = 'social.near:v01:';
export const EditorLayoutKey = LsKey + 'editorLayout:';
export const WidgetPropsKey = LsKey + 'widgetProps:';

export const DefaultEditorCode = 'return <div>Hello World</div>;';
export const DefaultEditorModuleCode = 'function square(number) {\n  return number * number;\n}\n';

export const Filetype = {
  Widget: 'widget',
  Module: 'module',
};

export const StorageDomain = {
  page: 'editor',
};

export const StorageType = {
  Code: 'code',
  Files: 'files',
};

export const Tab = {
  Editor: 'Editor',
  Props: 'Props',
  Metadata: 'Metadata',
  Widget: 'Widget',
};

export const Layout = {
  Tabs: 'Tabs',
  Split: 'Split',
};

export const ModalTypes = {
  RenameModal: 'RenameModal',
  OpenModal: 'OpenModal',
  OpenModuleModal: 'OpenModuleModal',
  AddModal: 'AddModal',
  CreateModal: 'CreateModal',
  SaveDraftModal: 'SaveDraftModal',
};
