const debounce = (callbackFn, delay, leading = false) => {
  let timer;
  let called = false;

  return function (...args) {
    if (timer) {
      clearTimeout(timer);
    }

    if (leading && !called) {
      callbackFn(...args);
      called = true;
    }

    timer = setTimeout(() => {
      callbackFn(...args);
    }, delay);
  };
};

const log = debounce(() => console.log("lala"), 500);

log();
log();
log();

setTimeout(() => {
  log();
}, 2000);

const myThrottle = (callbackFn, wait) => {
  let last = 0;
  return function (...args) {
    let now = new Date().getTime();
    if (now - last < wait) return;
    last = now;
    return callbackFn(...args);
  };
};

const searchInput = document.getElementById("searchInput");
const debounceResult = document.getElementById("debounceResult");

const handleSearch = (e) => {
  debounceResult.textContent = `Searching for: ${e.target.value}`;
  console.log("Debounced Search:", e.target.value);
};

const debouncedSearch = myDebounce(handleSearch, 500);
searchInput.addEventListener("input", debouncedSearch);

const scrollStatus = document.getElementById("scrollStatus");

const handleScroll = () => {
  scrollStatus.textContent = `Scroll Y: ${window.scrollY}`;
  console.log("Throttled Scroll:", window.scrollY);
};

const throttledScroll = myThrottle(handleScroll, 1000);
window.addEventListener("scroll", throttledScroll);
