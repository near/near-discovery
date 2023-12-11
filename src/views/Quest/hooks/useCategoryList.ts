import { useCallback, useEffect, useState } from 'react';
import { get } from '@/utils/http';
import { QUEST_PATH } from '@/config/quest';

export default function useCategoryList() {
  const [categories, setCategories] = useState<any>({});
  const [loading, setLoading] = useState(false);

  const queryCategories = useCallback(async () => {
    const cached = sessionStorage.getItem('_quest_categories');

    if (cached) {
      setCategories(JSON.parse(cached));
      return;
    }
    if (loading) return;
    setLoading(true);
    try {
      const result = await get(`${QUEST_PATH}:9991/operations/Quest/GetCategoryList`);
      const data = result.data?.data || [];
      const _categories = data.reduce((acc: any, category: any) => ({ ...acc, [category.id]: category }), {});
      setCategories(_categories);
      setLoading(false);
      sessionStorage.setItem('_quest_categories', JSON.stringify(_categories));
    } catch (err) {
      setLoading(false);
    }
  }, [loading]);

  useEffect(() => {
    console.log('00000000000000');
    queryCategories();
  }, []);

  return { loading, categories };
}
