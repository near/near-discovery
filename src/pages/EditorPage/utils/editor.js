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
  } else {
    // no code on chain
    changesMade = true;
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
    type: file.type,
    name: file.name,
  }));
  cache.localStorageSet(
    StorageDomain,
    {
      type: StorageType.Files,
    },
    { files: newFiles, lastPath: path }
  );
};
