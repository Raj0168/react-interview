(function initModal() {
  const openButton = document.querySelector("#open-button");
  const closeButton = document.querySelector("#close-button");
  const overlay = document.querySelector(".modal-overlay");

  if (!openButton || !closeButton || !overlay) {
    console.warn("Modal elements not found in DOM.");
    return;
  }

  function openModal() {
    overlay.classList.remove("hidden");
    document.body.style.overflow = "hidden";
  }

  function closeModal() {
    overlay.classList.add("hidden");
    document.body.style.overflow = "";
  }

  openButton.addEventListener("click", openModal);
  closeButton.addEventListener("click", closeModal);
  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) closeModal();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !overlay.classList.contains("hidden")) {
      closeModal();
    }
  });
})();
