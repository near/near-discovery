export const fetchCatalog = async (query: string) => {
  try {
    const response = await fetch(`https://api.nearcatalog.org/search?kw=${query}`);
    return await response.json();
  } catch (error) {
    console.error(error);
    return [];
  }
};
