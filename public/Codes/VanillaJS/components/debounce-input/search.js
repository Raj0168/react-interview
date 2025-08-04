function debounce(callbackFn, wait) {
  let timer;
  return function (...args) {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      callbackFn.apply(this, args);
    }, wait);
  };
}

const API = "https://jsonplaceholder.typicode.com/posts";
const input = document.querySelector("#search-input");
const resultsContainer = document.getElementById("results");
const clearButton = document.querySelector(".clear-button");

async function searchPosts(query) {
  resultsContainer.innerHTML = "<p>Loading</p>";

  try {
    const res = await fetch(`${API}?q=${query}`);
    if (!res.ok) {
      throw new Error("Error while fetching data", res.status);
    }
    const data = await res.json();

    if (data.length === 0) {
      resultsContainer.innerHTML = "<p>No results found!</p>";
      return;
    }

    resultsContainer.innerHTML = data
      .slice(0, 5)
      .map(
        (post, key) => `
      <strong><p>${post?.title}</p></strong>
      <p>${post?.body}</p>
      `
      )
      .join("");
  } catch (err) {
    console.error(err);
  }
}

function clearResults() {
  input.value = "";
  resultsContainer.innerHTML = "<p>Enter a input</p>";
}

function handleInput(e) {
  const query = e.target.value.trim();
  if (query) {
    searchPosts(query);
  } else {
    clearResults();
  }
}

const debouncedSearch = debounce(handleInput, 500);

input.addEventListener("input", debouncedSearch);
clearButton.addEventListener("click", clearResults);
