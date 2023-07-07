import { useState, useEffect } from 'react';

export default function useWindowWidth() {
  // window is undefined in SSR
  const [width, setWidth] = useState(window?.innerWidth || 1200);

  function changeWindowSize() {
    setWidth(window.innerWidth);
  }

  useEffect(() => {
    window.addEventListener('resize', changeWindowSize);

    return () => {
      window.removeEventListener('resize', changeWindowSize);
    };
  }, []);

  return width;
}
