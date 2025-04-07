import { useEffect, useLayoutEffect, useState } from "react";

const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

type UseMediaQueryOptions = {
  defaultValue?: boolean;
  initializeWithValue?: boolean;
};

const IS_SERVER = typeof window === "undefined";

const query = {
  sm: "(min-width: 640px)", // (width >= 40rem)
  md: "(min-width: 768px)", // (width >= 48rem)
  lg: "(min-width: 1024px)", // (width >= 64rem)
  xl: "(min-width: 1280px)", // (width >= 80rem)
  "2xl": "(min-width: 1536px)", // (width >= 96rem)
};

/**
 * Hook for checking if a media query matches.
 *
 * @param {string} query - The media query to check.
 * @param {UseMediaQueryOptions} options - Options for the hook.
 * @returns {Boolean} matches - A boolean indicating whether the media query matches.
 */
export default function useMediaQuery(
  queryString: keyof typeof query,
  {
    defaultValue = false,
    initializeWithValue = true,
  }: UseMediaQueryOptions = {},
): boolean {
  const getMatches = (query: string): boolean => {
    if (IS_SERVER) {
      return defaultValue;
    }
    return window.matchMedia(query).matches;
  };

  const [matches, setMatches] = useState<boolean>(() => {
    if (initializeWithValue) {
      return getMatches(query[queryString]);
    }
    return defaultValue;
  });

  // Handles the change event of the media query.
  function handleChange() {
    setMatches(getMatches(query[queryString]));
  }

  useIsomorphicLayoutEffect(() => {
    const matchMedia = window.matchMedia(query[queryString]);

    // Triggered at the first client-side load and if query changes
    handleChange();

    // Use deprecated `addListener` and `removeListener` to support Safari < 14 (#135)
    if (matchMedia.addListener) {
      matchMedia.addListener(handleChange);
    } else {
      matchMedia.addEventListener("change", handleChange);
    }

    return () => {
      if (matchMedia.removeListener) {
        matchMedia.removeListener(handleChange);
      } else {
        matchMedia.removeEventListener("change", handleChange);
      }
    };
  }, [query]);

  return matches;
}