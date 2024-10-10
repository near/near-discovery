export const fetchCatalog = async (query: string) => {
  try {
    const response = await fetch(`https://indexer.nearcatalog.xyz/wp-json/nearcatalog/v1/search?kw=${query}`);
    return await response.json();
  } catch (error) {
    console.error(error);
    return [];
  }
};
