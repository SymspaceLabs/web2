// app/_lib/hooks/use-lazy-video.ts
'use client';

import { useState, useCallback } from 'react';

export function useLazyVideo() {
  const [isLoaded, setIsLoaded] = useState(false);

  const handleLoad = useCallback(() => {
    if (!isLoaded) setIsLoaded(true);
  }, [isLoaded]);

  return { isLoaded, handleLoad };
}