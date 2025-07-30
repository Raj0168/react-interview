const { useRef, useEffect, useCallback } = require("react");

const myDebounce = (callbackFn, wait) => {
  let timer;

  return function (...args) {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      callbackFn(...args);
    }, wait);
  };
};

const useDebounce = (callback, delay) => {
  const callbackRef = useRef(callback);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  const debouncedCallback = useCallback(
    myDebounce((...args) => callbackRef.current(...args), delay)
  );

  return debouncedCallback;
};

export default useDebounce;
