const components = {
  modal: "./components/modal/modal.html",
  search: "./components/debounce-input/search.html",
};

const commons = {
  header: "./commons/header/header.html",
  footer: "./commons/footer/footer.html",
};

async function renderDynamicComponents() {
  const container = document.querySelector(".components");
  for (const componentName in components) {
    try {
      const componentPath = components[componentName];
      const response = await fetch(componentPath);
      const html = await response.text();

      const componentWrapper = document.createElement("div");
      componentWrapper.classList.add("component-container");
      componentWrapper.innerHTML =
        `<h3>${componentName.charAt(0).toUpperCase() + componentName.slice(1)} Component</h3>` +
        html;

      container.appendChild(componentWrapper);

      if (componentName === "modal") {
        injectModalAssets();
      }
      if (componentName === "search") {
        injectSearchAssets();
      }
    } catch (err) {
      console.error(`Error loading dynamic component "${componentName}":`, err);
    }
  }
}

async function renderCommonComponent(containerId, componentPath) {
  try {
    const container = document.getElementById(containerId);
    if (!container) {
      return;
    }
    const response = await fetch(componentPath);
    const html = await response.text();
    container.innerHTML = html;
  } catch (err) {
    console.error(`Error loading common component:`, err);
  }
}

async function init() {
  await renderCommonComponent("header-container", commons.header);
  await renderDynamicComponents();
  await renderCommonComponent("footer-container", commons.footer);
}

window.onload = init;

function injectModalAssets() {
  // const modalCSS = document.createElement("link");
  // modalCSS.rel = "stylesheet";
  // modalCSS.href = "../../../../public/Codes/VanillaJS/modal/modal.css";
  // modalCSS.media = "all";
  // document.head.appendChild(modalCSS);

  const modalScript = document.createElement("script");
  modalScript.src =
    "../../../../public/Codes/VanillaJS/components/modal/modal.js";
  document.body.appendChild(modalScript);
}

function injectSearchAssets() {
  const searchScript = document.createElement("script");
  searchScript.src =
    "../../../../public/Codes/VanillaJS/components/debounce-input/search.js";
  document.body.appendChild(searchScript);
}
