function camelToNormal(camelCaseString) {
  let normalString = camelCaseString
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .toLowerCase();
  return normalString.charAt(0).toUpperCase() + normalString.slice(1);
}

export default camelToNormal;
