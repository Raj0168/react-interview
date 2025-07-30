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
