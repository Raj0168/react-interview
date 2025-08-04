function debounce2(callback, delay, options = {}) {
  let timer = null;
  let lastArgs = null;
  let leadingCalled = false;

  const debounced = (...args) => {
    lastArgs = args;

    const callNow = options.leading && !leadingCalled;

    if (timer) {
      clearTimeout(timer);
    }

    if (callNow) {
      callback(...args);
      leadingCalled = true;
    }

    timer = setTimeout(() => {
      if (!callNow) {
        callback(...args);
      }
      timer = null;
      leadingCalled = false;
    }, delay);
  };

  debounced.cancel = () => {
    if (timer) {
      clearTimeout(timer);
    }
    timer = null;
    leadingCalled = false;
  };

  debounced.flush = () => {
    if (timer) {
      clearTimeout(timer);
      if (lastArgs) {
        callback(...lastArgs);
      }
      timer = null;
      leadingCalled = false;
    }
  };

  return debounced;
}

const log = debounce2((msg) => console.log(msg), 300, { leading: true });

log("Hello");
log("Hello again");
setTimeout(() => log("Delayed"), 500);

log.cancel();

log.flush();
