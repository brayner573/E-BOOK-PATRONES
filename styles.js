const copyBtn = document.getElementById("copyBtn");
const copyMessage = document.getElementById("copyMessage");

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
