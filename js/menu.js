const menuToggle = document.getElementById("menu-toggle");
const menuDesplegable = document.getElementById("menu-desplegable");
const menuOverlay = document.getElementById("menu-overlay");
const enlaces = document.querySelectorAll("#menu-desplegable a");

function toggleMenu() {
  const isOpen = menuDesplegable.classList.contains("mostrar");

  if (isOpen) {
    cerrarMenu();
  } else {
    abrirMenu();
  }
}

function abrirMenu() {
  menuDesplegable.classList.add("mostrar");
  menuOverlay.classList.add("activo");
  menuToggle.classList.add("activo");
  menuToggle.setAttribute("aria-expanded", "true");

  document.body.style.overflow = "hidden";
}

function cerrarMenu() {
  menuDesplegable.classList.remove("mostrar");
  menuOverlay.classList.remove("activo");
  menuToggle.classList.remove("activo");
  menuToggle.setAttribute("aria-expanded", "false");

  document.body.style.overflow = "auto";
}

menuToggle.addEventListener("click", toggleMenu);
menuOverlay.addEventListener("click", cerrarMenu);

enlaces.forEach((enlace) => {
  enlace.addEventListener("click", (e) => {
    e.preventDefault();

    enlaces.forEach((el) => el.classList.remove("activo"));

    enlace.classList.add("activo");

    setTimeout(() => {
      cerrarMenu();
    }, 300);
  });
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && menuDesplegable.classList.contains("mostrar")) {
    cerrarMenu();
  }
});

setInterval(() => {
  if (!menuToggle.classList.contains("activo")) {
    menuToggle.style.animation = "pulse 0.6s ease";
    setTimeout(() => {
      menuToggle.style.animation = "";
    }, 600);
  }
}, 5000);
