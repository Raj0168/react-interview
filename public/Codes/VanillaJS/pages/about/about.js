const commons = {
  header: "../../../../../public/Codes/VanillaJS/commons/header/index.html",
  footer: "../../../../../public/Codes/VanillaJS/commons/footer/index.html",
};

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

async function initAboutPage() {
  await renderCommonComponent("header-container", commons.header);
  await renderCommonComponent("footer-container", commons.footer);
}

window.onload = initAboutPage;
