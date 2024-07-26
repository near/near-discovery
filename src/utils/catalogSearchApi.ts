export const fetchCatalog = async (query: string) => {
  const response = await fetch(`https://nearcatalog.xyz/wp-json/nearcatalog/v1/search?kw=${query}`);
  return await response.json();
};
