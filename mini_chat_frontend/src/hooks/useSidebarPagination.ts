import React , { useState, useEffect } from 'react';

type UsePaginationProps<T> = {
  fetchFn: (page: number, limit: number) => Promise<T[]>;
  limit?: number;
  containerRef?: React.RefObject<HTMLElement | null>;
};

export const usePagination = <T>({
  fetchFn,
  limit = 10,
  containerRef,
}: UsePaginationProps<T>) => {
  const [data, setData] = useState<T[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  const loadMore = async () => {
    if (loading || !hasMore) return;
    setLoading(true);
    const newData = await fetchFn(page, limit);
    setData((prev) => [...prev, ...newData]);
    setPage((prev) => prev + 1);
    setHasMore(newData.length === limit);
    setLoading(false);
  };

  useEffect(() => {
    loadMore();
  }, []);

  useEffect(() => {
    if (!containerRef?.current) return;

    const handleScroll = () => {
      const el = containerRef.current;
      if (!el || loading || !hasMore) return;

      const { scrollTop, scrollHeight, clientHeight } = el;
      if (scrollTop + clientHeight >= scrollHeight - 50) {
        loadMore();
      }
    };

    const el = containerRef.current;
    el.addEventListener('scroll', handleScroll);

    return () => {
      el.removeEventListener('scroll', handleScroll);
    };
  }, [containerRef, loading, hasMore]);

  return { data, loadMore, hasMore, loading };
};
