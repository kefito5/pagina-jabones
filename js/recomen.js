const btnRecomendaciones = document.getElementById("btn-recomendaciones");
const modalRecomendaciones = document.getElementById("modal-recomendaciones");
const closeRecomendaciones = document.getElementById("close-recomendaciones");


btnRecomendaciones.addEventListener("click", () => {
  modalRecomendaciones.classList.add("activo");
});


closeRecomendaciones.addEventListener("click", () => {
  modalRecomendaciones.classList.remove("activo");
});


window.addEventListener("click", (e) => {
  if (e.target === modalRecomendaciones) {
    modalRecomendaciones.classList.remove("activo");
  }
});


document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    modalRecomendaciones.classList.remove("activo");
  }
});
