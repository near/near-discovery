// eslint-disable-next-line @typescript-eslint/no-var-requires
const { generateHtml } = require("generate-html");

const getLastPartOfUrl = (url) => {
  const parsedUrl = new URL(url);
  const pathParts = parsedUrl.pathname.split('/');
  return pathParts[pathParts.length - 1];
}

const urls = process.env.NEXT_PUBLIC_PAGE_URLS.split(", ");
urls.forEach(async (url) => {
  const subFolder = getLastPartOfUrl(url);
  await generateHtml(`dist/${subFolder}`, url);
});
