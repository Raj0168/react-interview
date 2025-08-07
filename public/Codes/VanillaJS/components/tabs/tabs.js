const toggle = document.getElementById("mode-toggle");
const container = document.getElementById("tab-container");
const buttons = document.querySelectorAll(".tab-button");
const panels = document.querySelectorAll(".tab-panel");

let isAccordionMode = false;

function switchToTabs() {
  container.classList.remove("accordion");
  panels.forEach((panel, i) => {
    panel.classList.remove("collapsed");
    panel.classList.toggle("active", i === 0);
  });
  buttons.forEach((btn, i) => btn.classList.toggle("active", i === 0));
}

function switchToAccordion() {
  container.classList.add("accordion");
  panels.forEach((panel) => {
    panel.classList.add("collapsed");
    panel.classList.remove("active");
  });
  buttons.forEach((btn) => btn.classList.remove("active"));
}

function handleTabClick(e) {
  const targetId = e.target.dataset.target;

  buttons.forEach((btn) => btn.classList.remove("active"));
  e.target.classList.add("active");

  panels.forEach((panel) => {
    panel.classList.remove("active");
    if (panel.id === targetId) {
      panel.classList.add("active");
    }
  });
}

function handleAccordionToggle(e) {
  const panel = e.currentTarget;
  panel.classList.toggle("collapsed");
}

toggle.addEventListener("change", (e) => {
  isAccordionMode = e.target.checked;

  if (isAccordionMode) {
    switchToAccordion();
  } else {
    switchToTabs();
  }
});

buttons.forEach((btn) => btn.addEventListener("click", handleTabClick));
panels.forEach((panel) =>
  panel.addEventListener("click", () => {
    if (isAccordionMode) handleAccordionToggle(event);
  })
);

switchToTabs();
