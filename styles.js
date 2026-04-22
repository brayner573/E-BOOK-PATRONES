const copyBtn = document.getElementById("copyBtn");
const copyMessage = document.getElementById("copyMessage");
const linkButtons = document.querySelectorAll(".link-btn");

copyBtn.addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText(window.location.href);
    copyMessage.textContent = "Enlace copiado correctamente ✅";
  } catch (error) {
    copyMessage.textContent = "No se pudo copiar el enlace ❌";
  }

  setTimeout(() => {
    copyMessage.textContent = "";
  }, 2500);
});

linkButtons.forEach((button) => {
  button.addEventListener("mouseenter", () => {
    button.style.transform = "translateY(-3px) scale(1.01)";
  });

  button.addEventListener("mouseleave", () => {
    button.style.transform = "";
  });

  button.addEventListener("touchstart", () => {
    button.style.transform = "scale(0.99)";
  });

  button.addEventListener("touchend", () => {
    button.style.transform = "";
  });
});
