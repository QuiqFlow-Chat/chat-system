// src/hooks/useSidebarPagination.ts
import { useState, useEffect, useRef, useCallback } from "react";

export function useSidebarPagination<T>(
  items: T[],
  query: string,
  filterFn: (item: T, query: string) => boolean,
  step = 5
) {
  const [visibleCount, setVisibleCount] = useState(step);
  const observerRef = useRef<HTMLDivElement | null>(null);

  const filteredItems = items.filter((item) => filterFn(item, query));
  const visibleItems = filteredItems.slice(0, visibleCount);
  const hasMore = visibleCount < filteredItems.length;

  useEffect(() => {
    setVisibleCount(step); // reset on query change
  }, [query]);

  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const target = entries[0];
      if (target.isIntersecting && hasMore) {
        setVisibleCount((prev) => prev + step);
      }
    },
    [hasMore, step]
  );

  useEffect(() => {
    const observer = new IntersectionObserver(handleObserver, {
      threshold: 1.0,
    });
    if (observerRef.current) observer.observe(observerRef.current);

    return () => {
      if (observerRef.current) observer.unobserve(observerRef.current);
    };
  }, [handleObserver]);

  return {
    visibleItems,
    observerRef,
    hasMore,
  };
}
