import {
  DefaultEditorCode,
  DefaultEditorModuleCode,
  Filetype,
  StorageDomain,
  StorageType,
} from "./const";

export const toPath = (type, nameOrPath) => {
  const name =
    nameOrPath.indexOf("/") >= 0
      ? nameOrPath.split("/").slice(2).join("/")
      : nameOrPath;
  return { type, name };
};

export const generateNewName = (type, files) => {
  for (let i = 0; ; i++) {
    const name = `Untitled-${i}`;
    const path = toPath(type, name);
    if (!files?.find((file) => file.name === name)) {
      return path;
    }
  }
};

export const getSrcByNameOrPath = (nameOrPath, accountId, type) => {
  return nameOrPath.indexOf("/") >= 0
    ? nameOrPath
    : `${accountId}/${type.toLocaleLowerCase()}/${nameOrPath}`;
};

export const getDefaultCode = (type) => {
  return type === Filetype.Module ? DefaultEditorModuleCode : DefaultEditorCode;
};

export const checkChangesMade = (codeMain, codeDraft, code) => {
  let changesMade;
  if (codeDraft) {
    changesMade = codeDraft != code;
  } else if (codeMain) {
    changesMade = codeMain !== code;
  } else if (code) {
    changesMade = true;
  } else {
    changesMade = false;
  }
  return changesMade;
};

export const getWidgetDetails = (widgetObject) => {
  const codeMain = widgetObject?.[""];
  const codeDraft = widgetObject?.branch?.draft?.[""] || "";
  const isDraft = (!codeDraft && !codeMain) || !!codeDraft;

  return {
    codeMain,
    codeDraft,
    isDraft,
  };
};

export const updateLocalStorage = (newFilesObject, path, cache) => {
  const newFiles = Object.values(newFilesObject).map((file) => ({
    type: file.type || Filetype.Widget,
    name: file.name,
    src: file.src,
  }));
  cache.localStorageSet(
    StorageDomain,
    {
      type: StorageType.Files,
    },
    { files: newFiles, lastPath: path }
  );
};

export const updateCodeLocalStorage = (path, code, cache) => {
  cache.localStorageSet(
    StorageDomain,
    {
      path,
      type: StorageType.Code,
    },
    {
      code,
      time: Date.now(),
    }
  );
};

export const nameToPath = (type, name) => ({ type, name });

export const fileToPath = (file = {}) => ({ type: file.type, name: file.name });

export const fileToJpath = (file = {}) => JSON.stringify(fileToPath(file));

export const fileToSrc = (file = {}, accountId) =>
  `${accountId}/${file.type}/${file.name}/**`;

export const createFilesObject = (files = []) =>
  files.reduce(
    (x, file) => ({
      ...x,
      [fileToJpath(file)]: {
        ...file,
        ...fileObjectDefault,
      },
    }),
    {}
  );
