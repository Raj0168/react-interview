import { useRef, useEffect, useCallback } from "react";

type DebounceOptions = {
  leading?: boolean;
};

export function useDebounce<T extends (...args: any[]) => void>(
  callback: T,
  delay: number,
  options: DebounceOptions = {}
): {
  run: (...args: Parameters<T>) => void;
  cancel: () => void;
  flush: () => void;
} {
  const timer = useRef<number | null>(null);
  const leadingCalled = useRef(false);
  const lastArgs = useRef<Parameters<T> | null>(null);

  const run = useCallback(
    (...args: Parameters<T>) => {
      lastArgs.current = args;

      const callNow = options.leading && !leadingCalled.current;

      if (timer.current) clearTimeout(timer.current);

      if (callNow) {
        callback(...args);
        leadingCalled.current = true;
      }

      timer.current = setTimeout(() => {
        if (!callNow && lastArgs.current) {
          callback(...lastArgs.current);
        }
        leadingCalled.current = false;
        timer.current = null;
      }, delay);
    },
    [callback, delay, options.leading]
  );

  const cancel = useCallback(() => {
    if (timer.current) clearTimeout(timer.current);
    timer.current = null;
    leadingCalled.current = false;
  }, []);

  const flush = useCallback(() => {
    if (timer.current && lastArgs.current) {
      clearTimeout(timer.current);
      callback(...lastArgs.current);
      timer.current = null;
      leadingCalled.current = false;
    }
  }, [callback]);

  useEffect(() => {
    return cancel;
  }, [cancel]);

  return { run, cancel, flush };
}
