import { useCallback, useEffect, useState } from 'react';
import { get } from '@/utils/http';

export default function useCategoryList() {
  const [categories, setCategories] = useState<any>({});
  const [loading, setLoading] = useState(false);

  const queryCategories = useCallback(async () => {
    if (loading) return;
    setLoading(true);
    try {
      const result = await get('http://139.162.85.48:9991/operations/Quest/GetCategoryList');
      const data = result.data?.data || [];
      const _categories = data.reduce((acc: any, category: any) => ({ ...acc, [category.id]: category }), {});
      setCategories(_categories);
      setLoading(false);
    } catch (err) {
      setLoading(false);
    }
  }, [loading]);

  useEffect(() => {
    queryCategories();
  }, []);

  return { loading, categories };
}
