export const formatDescription = (description: string) => {
  if (!description) return '';
  return description.replaceAll('\n', '<br/>');
};
