import { useCallback, useEffect, useState } from 'react';
import { get } from '@/utils/http';
import { QUEST_PATH } from '@/config/quest';

export default function useCategoryList() {
  const [categories, setCategories] = useState<any>({});
  const [loading, setLoading] = useState(false);

  const queryCategories = useCallback(async () => {
    const cached = sessionStorage.getItem('_dapp_categories');

    if (cached) {
      setCategories(JSON.parse(cached));
      return;
    }
    if (loading) return;
    setLoading(true);
    try {
      const result = await get(`${QUEST_PATH}/api/dapp/category_list`);
      const data = result.data || [];
      const filteredData = data.filter((category: any) => category.id !== 1);
      const _categories = filteredData.reduce((acc: any, category: any) => ({ ...acc, [category.id]: category }), {});
      setCategories(_categories);
      setLoading(false);
      sessionStorage.setItem('_dapp_categories', JSON.stringify(_categories));
    } catch (err) {
      setLoading(false);
    }
  }, [loading]);

  useEffect(() => {
    queryCategories();
  }, []);

  return { loading, categories };
}
