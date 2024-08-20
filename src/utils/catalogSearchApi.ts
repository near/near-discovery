export const fetchCatalog = async (query: string) => {
  try {
    const response = await fetch(`https://nearcatalog.xyz/wp-json/nearcatalog/v1/search?kw=${query}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching catalog:', error);
    return { error: (error as Error).message };
  }
};
