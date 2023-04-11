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
    path.unnamed = true;
    if (!files?.find((file) => file.name === name)) {
      return path;
    }
  }
};
