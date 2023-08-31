import { useState, useEffect } from 'react';

export default function useIntersectionObserver(
  ref: any,
  options: IntersectionObserverInit | undefined
) {
  const [isIntersecting, setIsIntersecting] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setIsIntersecting(entry.isIntersecting);
    }, options);

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      observer.unobserve(ref.current);
    };
  }, [ref, options]);

  return isIntersecting;
}
