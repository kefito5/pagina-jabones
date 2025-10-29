document.addEventListener("DOMContentLoaded", function () {
  const config = {
    animationDuration: 1000,
    staggerDelay: 150,
    scrollThreshold: 100,
    particleCount: 20,
    videoEffects: true,
    touchDevice: "ontouchstart" in window,
  };

  class ParticleSystem {
    constructor(container) {
      this.container = container;
      this.particles = [];
      this.colors = ["#4caf50", "#66bb6a", "#81c784", "#a5d6a7"];
      this.init();
    }

    init() {
      for (let i = 0; i < config.particleCount; i++) {
        this.createParticle();
      }
    }

    createParticle() {
      const particle = document.createElement("div");
      particle.className = "floating-particle";
      particle.style.cssText = `
                position: absolute;
                width: ${Math.random() * 8 + 3}px;
                height: ${Math.random() * 8 + 3}px;
                background: ${
                  this.colors[Math.floor(Math.random() * this.colors.length)]
                };
                border-radius: 50%;
                pointer-events: none;
                z-index: 1;
                box-shadow: 0 0 10px rgba(76, 175, 80, 0.3);
            `;

      this.resetParticle(particle);
      this.container.appendChild(particle);
      this.particles.push(particle);
      this.animateParticle(particle);
    }

    resetParticle(particle) {
      particle.style.left = Math.random() * 100 + "%";
      particle.style.top = "110%";
      particle.style.opacity = Math.random() * 0.8 + 0.2;
    }

    animateParticle(particle) {
      const duration = Math.random() * 4000 + 3000;
      const startTime = Date.now();

      const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = elapsed / duration;

        if (progress < 1) {
          const y = 110 - progress * 130;
          const x =
            parseFloat(particle.style.left) +
            Math.sin(progress * Math.PI * 3) * 2;

          particle.style.top = y + "%";
          particle.style.left = x + "%";
          particle.style.opacity = Math.sin(progress * Math.PI) * 0.8;

          requestAnimationFrame(animate);
        } else {
          this.resetParticle(particle);
          this.animateParticle(particle);
        }
      };

      requestAnimationFrame(animate);
    }
  }

  function initVideoEffects() {
    const videoSection = document.getElementById("video-portada");
    const video = document.getElementById("videoFondo");
    const contenido = document.querySelector(".contenido-portada");

    if (!video || !videoSection) return;

    const overlay = document.createElement("div");
    overlay.className = "video-overlay";
    overlay.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(45deg, rgba(76, 175, 80, 0.3), rgba(102, 187, 106, 0.2));
            z-index: 1;
            transition: all 0.3s ease-out;
        `;
    videoSection.appendChild(overlay);

    const shimmer = document.createElement("div");
    shimmer.className = "shimmer-effect";
    shimmer.style.cssText = `
            position: absolute;
            top: -50%;
            left: -50%;
            width: 200%;
            height: 200%;
            background: linear-gradient(45deg, transparent, rgba(255, 255, 255, 0.1), transparent);
            z-index: 2;
            animation: shimmer 4s infinite;
            pointer-events: none;
        `;
    videoSection.appendChild(shimmer);

    if (contenido) {
      contenido.style.transform = "translateY(50px)";
      contenido.style.opacity = "0";
      contenido.style.transition =
        "all 1s cubic-bezier(0.25, 0.46, 0.45, 0.94)";
      contenido.style.zIndex = "3";

      setTimeout(() => {
        contenido.style.transform = "translateY(0)";
        contenido.style.opacity = "1";
      }, 500);
    }

    videoSection.addEventListener("mouseenter", function () {
      overlay.style.background =
        "linear-gradient(45deg, rgba(76, 175, 80, 0.4), rgba(102, 187, 106, 0.3))";
      if (contenido) {
        contenido.style.transform = "translateY(-10px) scale(1.02)";
      }
    });

    videoSection.addEventListener("mouseleave", function () {
      overlay.style.background =
        "linear-gradient(45deg, rgba(76, 175, 80, 0.3), rgba(102, 187, 106, 0.2))";
      if (contenido) {
        contenido.style.transform = "translateY(0) scale(1)";
      }
    });
  }

  function initScrollReveal() {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const element = entry.target;
          element.classList.add("animate-in");

          if (
            element.classList.contains("ingrediente") ||
            element.classList.contains("producto")
          ) {
            const delay =
              Array.from(element.parentNode.children).indexOf(element) * 200;
            setTimeout(() => {
              element.style.transform = "translateY(0) scale(1)";
              element.style.opacity = "1";
            }, delay);
          }
        }
      });
    }, observerOptions);

    const sections = document.querySelectorAll("section");
    sections.forEach((section) => {
      section.style.opacity = "0";
      section.style.transform = "translateY(30px)";
      section.style.transition =
        "all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)";
      observer.observe(section);
    });

    const elements = document.querySelectorAll(
      ".ingrediente, .producto, .beneficio, .razon"
    );
    elements.forEach((element) => {
      element.style.opacity = "0";
      element.style.transform = "translateY(20px) scale(0.95)";
      element.style.transition = "all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)";
      observer.observe(element);
    });
  }

  function initHoverEffects() {
    const buttons = document.querySelectorAll(".btn-catalogo, .btn-ver-mas");
    buttons.forEach((button) => {
      button.addEventListener("mouseenter", function () {
        this.style.transform = "translateY(-5px) scale(1.05)";
        this.style.boxShadow = "0 15px 35px rgba(76, 175, 80, 0.4)";
        this.style.background = "linear-gradient(45deg, #4caf50, #66bb6a)";

        createRippleEffect(this);
      });

      button.addEventListener("mouseleave", function () {
        this.style.transform = "translateY(0) scale(1)";
        this.style.boxShadow = "";
        this.style.background = "";
      });
    });

    const items = document.querySelectorAll(
      ".ingrediente, .producto, .beneficio, .razon"
    );
    items.forEach((item) => {
      item.addEventListener("mouseenter", function () {
        this.style.transform = "translateY(-10px) scale(1.1) rotateY(5deg)";
        this.style.boxShadow = "0 20px 40px rgba(0, 0, 0, 0.15)";
        this.style.zIndex = "10";

        const img = this.querySelector("img");
        if (img) {
          img.style.transform = "scale(1.2) rotate(5deg)";
          img.style.filter = "brightness(1.1) saturate(1.2)";
        }
      });

      item.addEventListener("mouseleave", function () {
        this.style.transform = "translateY(0) scale(1) rotateY(0deg)";
        this.style.boxShadow = "";
        this.style.zIndex = "1";

        const img = this.querySelector("img");
        if (img) {
          img.style.transform = "scale(1) rotate(0deg)";
          img.style.filter = "brightness(1) saturate(1)";
        }
      });
    });

    const mockup = document.getElementById("mockup-destacado");
    if (mockup) {
      mockup.addEventListener("mouseenter", function () {
        const img = this.querySelector("img");
        if (img) {
          img.style.transform = "scale(1.1) rotate(3deg)";
          img.style.filter = "drop-shadow(0 20px 40px rgba(76, 175, 80, 0.3))";
        }
      });

      mockup.addEventListener("mouseleave", function () {
        const img = this.querySelector("img");
        if (img) {
          img.style.transform = "scale(1) rotate(0deg)";
          img.style.filter = "drop-shadow(0 0 0 rgba(76, 175, 80, 0))";
        }
      });
    }
  }

  function createRippleEffect(element) {
    const ripple = document.createElement("div");
    ripple.className = "ripple-effect";
    ripple.style.cssText = `
            position: absolute;
            border-radius: 50%;
            background: radial-gradient(circle, rgba(255, 255, 255, 0.5), transparent);
            transform: scale(0);
            animation: ripple-animation 0.6s linear;
            pointer-events: none;
            z-index: 1;
        `;

    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    ripple.style.width = ripple.style.height = size + "px";
    ripple.style.left = rect.width / 2 - size / 2 + "px";
    ripple.style.top = rect.height / 2 - size / 2 + "px";

    element.style.position = "relative";
    element.appendChild(ripple);

    setTimeout(() => {
      ripple.remove();
    }, 600);
  }

  function initCarousel() {
    const carrusel = document.querySelector(".carrusel");
    const novedadesList = document.querySelector(".novedades-lista");

    function makeCarouselInteractive(container) {
      if (!container) return;

      const items = container.children;
      if (items.length <= 1) return;

      let currentIndex = 0;

      const indicators = document.createElement("div");
      indicators.className = "carousel-indicators";
      indicators.style.cssText = `
                display: flex;
                justify-content: center;
                gap: 10px;
                margin-top: 20px;
            `;

      for (let i = 0; i < items.length; i++) {
        const indicator = document.createElement("div");
        indicator.className = "indicator";
        indicator.style.cssText = `
                    width: 12px;
                    height: 12px;
                    border-radius: 50%;
                    background: ${i === 0 ? "#4caf50" : "#ccc"};
                    cursor: pointer;
                    transition: all 0.3s ease-out;
                `;

        indicator.addEventListener("click", () => {
          currentIndex = i;
          updateCarousel();
        });

        indicators.appendChild(indicator);
      }

      container.parentNode.appendChild(indicators);

      function updateCarousel() {
        Array.from(items).forEach((item, index) => {
          item.style.transform = `translateX(${(index - currentIndex) * 100}%)`;
          item.style.opacity = index === currentIndex ? "1" : "0.5";
        });

        Array.from(indicators.children).forEach((indicator, index) => {
          indicator.style.background =
            index === currentIndex ? "#4caf50" : "#ccc";
        });
      }

      setInterval(() => {
        currentIndex = (currentIndex + 1) % items.length;
        updateCarousel();
      }, 4000);

      updateCarousel();
    }

    makeCarouselInteractive(carrusel);
    makeCarouselInteractive(novedadesList);
  }

  function initDynamicHeader() {
    const header = document.querySelector("header");
    if (!header) return;

    let lastScrollY = window.scrollY;

    window.addEventListener("scroll", () => {
      const scrollY = window.scrollY;

      if (scrollY > config.scrollThreshold) {
        header.style.background = "rgba(255, 255, 255, 0.95)";
        header.style.backdropFilter = "blur(20px)";
        header.style.boxShadow = "0 2px 30px rgba(0, 0, 0, 0.1)";
        header.style.transform =
          scrollY > lastScrollY ? "translateY(-100%)" : "translateY(0)";
      } else {
        header.style.background = "transparent";
        header.style.backdropFilter = "none";
        header.style.boxShadow = "none";
        header.style.transform = "translateY(0)";
      }

      lastScrollY = scrollY;
    });
  }

  function initTypingEffect() {
    const titles = document.querySelectorAll("h1, h2");

    titles.forEach((title) => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const originalText = title.textContent;
              title.textContent = "";
              title.style.borderRight = "2px solid #4caf50";

              let index = 0;
              const typeInterval = setInterval(() => {
                title.textContent += originalText[index];
                index++;

                if (index >= originalText.length) {
                  clearInterval(typeInterval);
                  setTimeout(() => {
                    title.style.borderRight = "none";
                  }, 1000);
                }
              }, 50);

              observer.unobserve(title);
            }
          });
        },
        { threshold: 0.5 }
      );

      observer.observe(title);
    });
  }

  function initNotificationSystem() {
    const notifications = [
      "¡Nuevo cliente satisfecho en San José! 🌟",
      "Jabón de Lavanda disponible ahora 💜",
      "Envío gratis en compras mayores a ₡15,000 🚚",
      "¡Más de 100 clientes felices! 😊",
    ];

    let currentNotification = 0;

    function showNotification() {
      const notification = document.createElement("div");
      notification.className = "floating-notification";
      notification.textContent = notifications[currentNotification];
      notification.style.cssText = `
                position: fixed;
                top: 20px;
                right: 20px;
                background: linear-gradient(45deg, #4caf50, #66bb6a);
                color: white;
                padding: 15px 25px;
                border-radius: 25px;
                font-size: 14px;
                font-weight: bold;
                z-index: 1000;
                transform: translateX(100%);
                transition: transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
                box-shadow: 0 10px 30px rgba(76, 175, 80, 0.3);
                cursor: pointer;
            `;

      document.body.appendChild(notification);

      setTimeout(() => {
        notification.style.transform = "translateX(0)";
      }, 100);

      setTimeout(() => {
        notification.style.transform = "translateX(100%)";
        setTimeout(() => {
          notification.remove();
        }, 500);
      }, 4000);

      notification.addEventListener("click", () => {
        notification.style.transform = "translateX(100%)";
        setTimeout(() => {
          notification.remove();
        }, 500);
      });

      currentNotification = (currentNotification + 1) % notifications.length;
    }

    setTimeout(showNotification, 3000);

    setInterval(showNotification, 15000);
  }

  function initCustomCursor() {
    if (config.touchDevice) return;

    const cursor = document.createElement("div");
    cursor.className = "custom-cursor";
    cursor.style.cssText = `
            position: fixed;
            width: 25px;
            height: 25px;
            border: 2px solid #4caf50;
            border-radius: 50%;
            pointer-events: none;
            z-index: 10000;
            transition: all 0.1s ease-out;
            mix-blend-mode: difference;
        `;
    document.body.appendChild(cursor);

    const cursorTrail = document.createElement("div");
    cursorTrail.className = "cursor-trail";
    cursorTrail.style.cssText = `
            position: fixed;
            width: 6px;
            height: 6px;
            background: #4caf50;
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            transition: all 0.2s ease-out;
        `;
    document.body.appendChild(cursorTrail);

    document.addEventListener("mousemove", (e) => {
      cursor.style.left = e.clientX - 12.5 + "px";
      cursor.style.top = e.clientY - 12.5 + "px";
      cursorTrail.style.left = e.clientX - 3 + "px";
      cursorTrail.style.top = e.clientY - 3 + "px";
    });

    document
      .querySelectorAll("a, button, .ingrediente, .producto, .beneficio")
      .forEach((element) => {
        element.addEventListener("mouseenter", () => {
          cursor.style.transform = "scale(1.5)";
          cursor.style.background = "rgba(76, 175, 80, 0.2)";
          cursorTrail.style.transform = "scale(1.5)";
        });

        element.addEventListener("mouseleave", () => {
          cursor.style.transform = "scale(1)";
          cursor.style.background = "transparent";
          cursorTrail.style.transform = "scale(1)";
        });
      });
  }

  function initAllEffects() {
    const styles = document.createElement("style");
    styles.textContent = `
            @keyframes ripple-animation {
                to { transform: scale(4); opacity: 0; }
            }
            
            @keyframes shimmer {
                0% { transform: translateX(-100%) translateY(-100%) rotate(45deg); }
                100% { transform: translateX(100%) translateY(100%) rotate(45deg); }
            }
            
            .animate-in {
                opacity: 1 !important;
                transform: translateY(0) !important;
            }
            
            .floating-particle {
                animation: particleFloat 4s linear infinite;
            }
            
            @keyframes particleFloat {
                0% { transform: translateY(0) rotate(0deg); }
                100% { transform: translateY(-100vh) rotate(360deg); }
            }
            
            .carrusel, .novedades-lista {
                display: flex;
                overflow: hidden;
                position: relative;
            }
            
            .carrusel > *, .novedades-lista > * {
                flex: 0 0 100%;
                transition: all 0.5s ease-out;
            }
            
            header {
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                z-index: 1000;
                transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
            }
            
            body {
                padding-top: 80px;
            }
            
            .ingrediente img, .producto img, .beneficio img, .razon img {
                transition: all 0.3s ease-out;
            }
            
            #mockup-destacado img {
                transition: all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
            }
            
            .btn-catalogo, .btn-ver-mas {
                transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
                position: relative;
                overflow: hidden;
            }
            
            .video-overlay {
                transition: all 0.3s ease-out;
            }
            
            .contenido-portada {
                transition: all 0.3s ease-out;
            }
            
            .floating-notification {
                animation: notificationPulse 2s ease-in-out infinite;
            }
            
            @keyframes notificationPulse {
                0%, 100% { transform: scale(1); }
                50% { transform: scale(1.02); }
            }
        `;

    document.head.appendChild(styles);

    const particleContainer = document.createElement("div");
    particleContainer.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 1;
        `;
    document.body.appendChild(particleContainer);

    new ParticleSystem(particleContainer);

    initVideoEffects();
    initScrollReveal();
    initHoverEffects();
    initCarousel();
    initDynamicHeader();
    initTypingEffect();
    initNotificationSystem();
    initCustomCursor();

    console.log("🌟 ¡Página principal de Jaboné completamente activada! ✨");
  }

  initAllEffects();
});
