const components = {
  modal: "./modal/modal.html",
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
