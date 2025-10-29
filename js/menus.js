class PielSecaManager {
  constructor() {
    this.menuToggle = null;
    this.menuDesplegable = null;
    this.isMenuOpen = false;
    this.init();
  }

  init() {
    this.setupMobileMenu();
    this.setupScrollAnimations();
    this.setupCategoryInteractions();
    this.setupLoadingAnimations();
    this.setupPurchaseTracker();
    this.setupImageLazyLoading();
    this.createFloatingElements();
    this.initializeAOS();
    this.setupHeaderEffects();
    this.createParticleSystem();
    this.initAdvancedInteractions();
  }

  setupMobileMenu() {
    this.menuToggle = document.getElementById("menu-toggle");
    this.menuDesplegable = document.getElementById("menu-desplegable");

    if (this.menuToggle && this.menuDesplegable) {
      this.menuToggle.addEventListener("click", () => {
        this.toggleMenu();
      });

      const menuLinks = this.menuDesplegable.querySelectorAll("a");
      menuLinks.forEach((link) => {
        link.addEventListener("click", () => {
          if (window.innerWidth <= 768) {
            this.closeMenu();
          }
        });
      });

      document.addEventListener("click", (e) => {
        if (
          this.isMenuOpen &&
          !this.menuToggle.contains(e.target) &&
          !this.menuDesplegable.contains(e.target)
        ) {
          this.closeMenu();
        }
      });

      document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && this.isMenuOpen) {
          this.closeMenu();
        }
      });
    }
  }

  toggleMenu() {
    if (this.isMenuOpen) {
      this.closeMenu();
    } else {
      this.openMenu();
    }
  }

  openMenu() {
    this.menuDesplegable.classList.add("activo");
    this.menuToggle.classList.add("activo");

    const overlay = document.getElementById("menu-overlay");
    if (overlay) overlay.classList.add("activo");
    document.body.style.overflow = "hidden";

    this.isMenuOpen = true;
  }

  closeMenu() {
    this.menuDesplegable.classList.remove("activo");
    this.menuToggle.classList.remove("activo");

    const overlay = document.getElementById("menu-overlay");
    if (overlay) overlay.classList.remove("activo");
    document.body.style.overflow = "";

    this.isMenuOpen = false;
  }

  setupHeaderEffects() {
    const header = document.getElementById("encabezado");
    let lastScrollTop = 0;
    let isHeaderHidden = false;

    window.addEventListener("scroll", () => {
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;

      if (scrollTop > lastScrollTop && scrollTop > 100) {
        if (!isHeaderHidden) {
          header.style.transform = "translateY(-100%)";
          isHeaderHidden = true;
        }
      } else {
        if (isHeaderHidden) {
          header.style.transform = "translateY(0)";
          isHeaderHidden = false;
        }
      }

      lastScrollTop = scrollTop;

      const opacity = Math.min(scrollTop / 100, 0.98);
      header.style.background = `rgba(255, 255, 255, ${0.95 + opacity * 0.03})`;
    });

    const logo = header.querySelector("#logo img");
    if (logo) {
      setInterval(() => {
        logo.style.transform = "scale(1.05)";
        setTimeout(() => {
          logo.style.transform = "scale(1)";
        }, 200);
      }, 5000);
    }
  }

  setupScrollAnimations() {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate-in");

          if (entry.target.classList.contains("categoria")) {
            const delay =
              Array.from(entry.target.parentNode.children).indexOf(
                entry.target
              ) * 200;
            entry.target.style.animationDelay = `${delay}ms`;
          }
        }
      });
    }, observerOptions);

    document
      .querySelectorAll(".categoria, #categorias-piel h2")
      .forEach((el) => {
        observer.observe(el);
      });
  }

  setupCategoryInteractions() {
    const categorias = document.querySelectorAll(".categoria");

    categorias.forEach((categoria, index) => {
      categoria.addEventListener("mouseenter", (e) => {
        this.handleCategoryHover(e.currentTarget, true);
      });

      categoria.addEventListener("mouseleave", (e) => {
        this.handleCategoryHover(e.currentTarget, false);
      });

      const img = categoria.querySelector("img");
      if (img) {
        img.addEventListener("click", (e) => {
          e.preventDefault();
          this.createImageModal(img.src, img.alt);
        });
        img.style.cursor = "pointer";
      }

      categoria.addEventListener("mouseenter", () => {
        this.createHoverParticles(categoria);
      });

      categoria.addEventListener("click", () => {
        this.trackEvent("category_click", {
          category_name: categoria.querySelector("h3")?.textContent,
          category_index: index,
        });
      });
    });
  }

  handleCategoryHover(element, isEntering) {
    if (isEntering) {
      element.style.transform = "translateY(-15px) scale(1.03)";
      element.style.boxShadow = "0 25px 50px rgba(208, 2, 27, 0.2)";
      element.style.filter = "brightness(1.1)";

      const img = element.querySelector("img");
      if (img) {
        img.style.transform = "scale(1.15) rotate(1deg)";
        img.style.filter = "brightness(1.2) contrast(1.1) saturate(1.2)";
      }

      const title = element.querySelector("h3");
      if (title) {
        title.style.transform = "translateY(-5px) scale(1.05)";
        title.style.textShadow = "0 2px 8px rgba(208, 2, 27, 0.3)";
      }

      this.addGlowEffect(element);
    } else {
      element.style.transform = "translateY(0) scale(1)";
      element.style.boxShadow = "0 8px 30px rgba(0,0,0,0.1)";
      element.style.filter = "brightness(1)";

      const img = element.querySelector("img");
      if (img) {
        img.style.transform = "scale(1) rotate(0deg)";
        img.style.filter = "brightness(1) contrast(1) saturate(1)";
      }

      const title = element.querySelector("h3");
      if (title) {
        title.style.transform = "translateY(0) scale(1)";
        title.style.textShadow = "none";
      }

      this.removeGlowEffect(element);
    }
  }

  addGlowEffect(element) {
    element.style.boxShadow += ", 0 0 30px rgba(208, 2, 27, 0.5)";
  }

  removeGlowEffect(element) {
    element.style.boxShadow = "0 8px 30px rgba(0,0,0,0.1)";
  }

  createHoverParticles(element) {
    const rect = element.getBoundingClientRect();

    for (let i = 0; i < 8; i++) {
      const particle = document.createElement("div");
      particle.className = "hover-particle";
      particle.style.cssText = `
                position: fixed;
                width: 6px;
                height: 6px;
                background: linear-gradient(45deg, #d0021b, #ff6b9d);
                border-radius: 50%;
                pointer-events: none;
                z-index: 1000;
                left: ${rect.left + Math.random() * rect.width}px;
                top: ${rect.top + Math.random() * rect.height}px;
                animation: particleFloat 2s ease-out forwards;
            `;
      document.body.appendChild(particle);

      setTimeout(() => {
        if (particle.parentNode) {
          particle.parentNode.removeChild(particle);
        }
      }, 2000);
    }
  }

  createImageModal(src, alt) {
    const existingModal = document.querySelector(".image-modal");
    if (existingModal) existingModal.remove();

    const modal = document.createElement("div");
    modal.className = "image-modal";
    modal.innerHTML = `
            <div class="modal-overlay">
                <div class="modal-content">
                    <div class="modal-loader">
                        <div class="spinner"></div>
                        <p>Cargando imagen...</p>
                    </div>
                    <img src="${src}" alt="${alt}" class="modal-image" style="opacity: 0;">
                    <button class="modal-close" title="Cerrar (ESC)">&times;</button>
                    <div class="modal-info">
                        <h4>${alt}</h4>
                        <p>Haz click para cerrar o presiona ESC</p>
                    </div>
                    <div class="modal-navigation">
                        <button class="modal-zoom-in" title="Acercar">🔍+</button>
                        <button class="modal-zoom-out" title="Alejar">🔍-</button>
                        <button class="modal-fullscreen" title="Pantalla completa">⛶</button>
                    </div>
                </div>
            </div>
        `;

    this.applyModalStyles(modal);
    document.body.appendChild(modal);
    document.body.style.overflow = "hidden";

    const modalImage = modal.querySelector(".modal-image");
    const loader = modal.querySelector(".modal-loader");

    modalImage.onload = () => {
      loader.style.opacity = "0";
      setTimeout(() => {
        loader.style.display = "none";
        modalImage.style.opacity = "1";
        modalImage.style.transform = "scale(1)";
      }, 300);
    };

    requestAnimationFrame(() => {
      modal.style.opacity = "1";
      modal.querySelector(".modal-content").style.transform = "scale(1)";
    });

    this.setupModalFeatures(modal);
  }

  applyModalStyles(modal) {
    modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.95);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 9999;
            opacity: 0;
            transition: opacity 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
            backdrop-filter: blur(10px);
        `;

    const modalContent = modal.querySelector(".modal-content");
    modalContent.style.cssText = `
            position: relative;
            max-width: 90vw;
            max-height: 90vh;
            background: white;
            border-radius: 20px;
            overflow: hidden;
            transform: scale(0.8);
            transition: transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
            box-shadow: 0 25px 50px rgba(0,0,0,0.5);
        `;

    const modalImage = modal.querySelector(".modal-image");
    modalImage.style.cssText = `
            width: 100%;
            height: auto;
            display: block;
            transition: all 0.3s ease;
            transform: scale(0.9);
        `;

    this.applyAdditionalModalStyles(modal);
  }

  applyAdditionalModalStyles(modal) {
    const styles = `
            .modal-loader {
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                text-align: center;
                color: #666;
                transition: opacity 0.3s ease;
            }
            
            .spinner {
                width: 40px;
                height: 40px;
                border: 4px solid #f3f3f3;
                border-top: 4px solid #d0021b;
                border-radius: 50%;
                animation: spin 1s linear infinite;
                margin: 0 auto 10px;
            }
            
            @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }
            
            .modal-close {
                position: absolute;
                top: 15px;
                right: 20px;
                background: rgba(208, 2, 27, 0.9);
                color: white;
                border: none;
                width: 45px;
                height: 45px;
                border-radius: 50%;
                font-size: 20px;
                cursor: pointer;
                display: flex;
                align-items: center;
                justify-content: center;
                transition: all 0.3s ease;
                backdrop-filter: blur(10px);
            }
            
            .modal-close:hover {
                background: rgba(208, 2, 27, 1);
                transform: scale(1.1);
            }
            
            .modal-info {
                position: absolute;
                bottom: 0;
                left: 0;
                right: 0;
                background: linear-gradient(transparent, rgba(0,0,0,0.8));
                color: white;
                padding: 30px 20px 20px;
                text-align: center;
            }
            
            .modal-navigation {
                position: absolute;
                top: 50%;
                right: 20px;
                transform: translateY(-50%);
                display: flex;
                flex-direction: column;
                gap: 10px;
            }
            
            .modal-navigation button {
                background: rgba(255,255,255,0.9);
                border: none;
                width: 40px;
                height: 40px;
                border-radius: 50%;
                cursor: pointer;
                font-size: 16px;
                transition: all 0.3s ease;
            }
            
            .modal-navigation button:hover {
                background: white;
                transform: scale(1.1);
            }
        `;

    const styleSheet = document.createElement("style");
    styleSheet.textContent = styles;
    modal.appendChild(styleSheet);
  }

  setupModalFeatures(modal) {
    const closeBtn = modal.querySelector(".modal-close");
    const zoomInBtn = modal.querySelector(".modal-zoom-in");
    const zoomOutBtn = modal.querySelector(".modal-zoom-out");
    const fullscreenBtn = modal.querySelector(".modal-fullscreen");
    const modalImage = modal.querySelector(".modal-image");

    let currentZoom = 1;

    const closeModal = () => {
      modal.style.opacity = "0";
      modal.querySelector(".modal-content").style.transform = "scale(0.8)";
      setTimeout(() => {
        if (modal.parentNode) {
          document.body.removeChild(modal);
        }
        document.body.style.overflow = "";
      }, 400);
    };

    closeBtn.addEventListener("click", closeModal);
    modal.addEventListener("click", (e) => {
      if (e.target === modal || e.target.classList.contains("modal-overlay")) {
        closeModal();
      }
    });

    zoomInBtn.addEventListener("click", () => {
      currentZoom = Math.min(currentZoom + 0.2, 3);
      modalImage.style.transform = `scale(${currentZoom})`;
    });

    zoomOutBtn.addEventListener("click", () => {
      currentZoom = Math.max(currentZoom - 0.2, 0.5);
      modalImage.style.transform = `scale(${currentZoom})`;
    });

    fullscreenBtn.addEventListener("click", () => {
      if (modal.requestFullscreen) {
        modal.requestFullscreen();
      }
    });

    const escapeHandler = (e) => {
      if (e.key === "Escape") {
        closeModal();
        document.removeEventListener("keydown", escapeHandler);
      }
    };
    document.addEventListener("keydown", escapeHandler);
  }

  createParticleSystem() {
    const canvas = document.createElement("canvas");
    canvas.id = "particle-canvas";
    canvas.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: -1;
            opacity: 0.6;
        `;
    document.body.appendChild(canvas);

    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];
    const particleCount = 50;

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 3 + 1,
        speedX: (Math.random() - 0.5) * 0.5,
        speedY: (Math.random() - 0.5) * 0.5,
        color: `rgba(208, 2, 27, ${Math.random() * 0.5 + 0.2})`,
      });
    }

    const animateParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle) => {
        particle.x += particle.speedX;
        particle.y += particle.speedY;

        if (particle.x < 0 || particle.x > canvas.width) particle.speedX *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.speedY *= -1;

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.fill();
      });

      requestAnimationFrame(animateParticles);
    };

    animateParticles();

    window.addEventListener("resize", () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    });
  }

  setupLoadingAnimations() {
    const titulo = document.querySelector("#categorias-piel h2");
    if (titulo) {
      titulo.style.opacity = "0";
      titulo.style.transform = "translateY(-50px)";
      titulo.style.transition = "all 1s cubic-bezier(0.25, 0.46, 0.45, 0.94)";

      setTimeout(() => {
        titulo.style.opacity = "1";
        titulo.style.transform = "translateY(0)";
      }, 500);

      this.typewriterEffect(titulo);
    }

    this.showLoadingScreen();
  }

  typewriterEffect(element) {
    if (!element) return;

    const text = element.textContent;
    element.textContent = "";
    element.style.opacity = "1";

    let i = 0;
    const typeInterval = setInterval(() => {
      element.textContent += text[i];
      i++;
      if (i >= text.length) {
        clearInterval(typeInterval);
        element.classList.add("typewriter-complete");
        this.addSparkleEffect(element);
      }
    }, 150);
  }

  addSparkleEffect(element) {
    const rect = element.getBoundingClientRect();

    for (let i = 0; i < 12; i++) {
      const sparkle = document.createElement("div");
      sparkle.style.cssText = `
                position: fixed;
                width: 4px;
                height: 4px;
                background: #d0021b;
                border-radius: 50%;
                pointer-events: none;
                z-index: 1000;
                left: ${rect.left + Math.random() * rect.width}px;
                top: ${rect.top + Math.random() * rect.height}px;
                animation: sparkle 1.5s ease-out forwards;
            `;
      document.body.appendChild(sparkle);

      setTimeout(() => {
        if (sparkle.parentNode) {
          sparkle.parentNode.removeChild(sparkle);
        }
      }, 1500);
    }
  }

  showLoadingScreen() {
    const loader = document.createElement("div");
    loader.className = "page-loader";
    loader.innerHTML = `
            <div class="loader-content">
                <img src="../img/logo.jpeg" alt="ELVÉ" class="loader-logo">
                <div class="loader-bar">
                    <div class="loader-progress"></div>
                </div>
                <p class="loader-text">Cargando productos para piel seca...</p>
            </div>
        `;

    loader.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
            opacity: 1;
            transition: opacity 0.5s ease;
        `;

    document.body.appendChild(loader);

    let progress = 0;
    const progressBar = loader.querySelector(".loader-progress");
    const progressInterval = setInterval(() => {
      progress += Math.random() * 15;
      if (progress >= 100) {
        progress = 100;
        clearInterval(progressInterval);
        setTimeout(() => {
          loader.style.opacity = "0";
          setTimeout(() => {
            if (loader.parentNode) {
              loader.parentNode.removeChild(loader);
            }
          }, 500);
        }, 800);
      }
      progressBar.style.width = progress + "%";
    }, 100);
  }

  setupPurchaseTracker() {
    let interactions = 0;

    document.addEventListener("click", (e) => {
      interactions++;

      if (e.target.closest(".categoria")) {
        const categoria = e.target.closest(".categoria");
        const categoryName = categoria.querySelector("h3")?.textContent;

        this.trackEvent("category_interaction", {
          category_name: categoryName,
          interaction_count: interactions,
          timestamp: new Date().toISOString(),
        });
      }
    });

    const startTime = Date.now();
    window.addEventListener("beforeunload", () => {
      const timeSpent = Date.now() - startTime;
      this.trackEvent("page_time", {
        time_spent_ms: timeSpent,
        time_spent_readable: this.formatTime(timeSpent),
      });
    });
  }

  formatTime(ms) {
    const seconds = Math.floor(ms / 1000);
    const minutes = Math.floor(seconds / 60);
    return `${minutes}m ${seconds % 60}s`;
  }

  trackEvent(eventName, data) {
    console.log("📊 Analytics Event:", eventName, data);

    if (typeof gtag !== "undefined") {
      gtag("event", eventName, data);
    }
  }

  setupImageLazyLoading() {
    const images = document.querySelectorAll(".categoria img");

    const imageObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const img = entry.target;

            img.style.filter = "blur(5px)";
            img.style.transition = "filter 0.5s ease";

            const tempImg = new Image();
            tempImg.onload = () => {
              img.style.filter = "blur(0)";
              img.classList.add("loaded");

              img.style.opacity = "0";
              requestAnimationFrame(() => {
                img.style.transition = "opacity 0.5s ease";
                img.style.opacity = "1";
              });
            };

            tempImg.onerror = () => {
              img.style.filter = "blur(0)";
              console.error("Error cargando imagen:", img.src);
            };

            tempImg.src = img.src;
            imageObserver.unobserve(img);
          }
        });
      },
      {
        rootMargin: "50px",
      }
    );

    images.forEach((img) => imageObserver.observe(img));
  }

  createFloatingElements() {
    const container = document.querySelector("#categorias-piel");
    if (!container) return;

    container.style.position = "relative";
    container.style.overflow = "hidden";

    const elements = ["💧", "🌸", "✨", "🍃", "💎"];

    for (let i = 0; i < 8; i++) {
      const floatingEl = document.createElement("div");
      floatingEl.className = "floating-element";
      floatingEl.textContent =
        elements[Math.floor(Math.random() * elements.length)];
      floatingEl.style.cssText = `
                position: absolute;
                font-size: ${Math.random() * 20 + 15}px;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                animation: gentleFloat ${
                  Math.random() * 4 + 3
                }s ease-in-out infinite alternate;
                pointer-events: none;
                z-index: 1;
                opacity: 0.3;
                user-select: none;
            `;
      container.appendChild(floatingEl);
    }

    if (!document.querySelector("#floating-keyframes-seca")) {
      const style = document.createElement("style");
      style.id = "floating-keyframes-seca";
      style.textContent = `
                @keyframes gentleFloat {
                    0% { 
                        transform: translateY(0px) translateX(0px) rotate(0deg); 
                        opacity: 0.3; 
                    }
                    50% { 
                        opacity: 0.6; 
                    }
                    100% { 
                        transform: translateY(-30px) translateX(20px) rotate(10deg); 
                        opacity: 0.2;
                    }
                }
                
                @keyframes particleFloat {
                    0% {
                        transform: translateY(0) scale(1);
                        opacity: 1;
                    }
                    100% {
                        transform: translateY(-100px) scale(0);
                        opacity: 0;
                    }
                }
                
                @keyframes sparkle {
                    0% {
                        transform: translateY(0) scale(0);
                        opacity: 1;
                    }
                    50% {
                        transform: translateY(-20px) scale(1);
                        opacity: 0.8;
                    }
                    100% {
                        transform: translateY(-40px) scale(0);
                        opacity: 0;
                    }
                }
            `;
      document.head.appendChild(style);
    }
  }

  initializeAOS() {
    if (!document.querySelector("#aos-styles-seca")) {
      const style = document.createElement("style");
      style.id = "aos-styles-seca";
      style.textContent = `
                .categoria {
                    opacity: 0;
                    transform: translateY(60px) scale(0.85);
                    transition: all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
                }
                
                .categoria.animate-in {
                    opacity: 1;
                    transform: translateY(0) scale(1);
                }
                
                .categoria img {
                    transition: all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
                    border-radius: 20px;
                }
                
                .categoria:hover img {
                    border-radius: 25px;
                    box-shadow: 0 15px 35px rgba(208, 2, 27, 0.3);
                }
                
                .categoria h3 {
                    transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
                    position: relative;
                    overflow: hidden;
                }
                
                .categoria h3::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: -100%;
                    width: 100%;
                    height: 100%;
                    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);
                    transition: left 0.6s;
                }
                
                .categoria:hover h3::before {
                    left: 100%;
                }
                
                #categorias-piel h2 {
                    position: relative;
                    overflow: hidden;
                }
                
                #categorias-piel h2.typewriter-complete::after {
                    content: '';
                    position: absolute;
                    right: 0;
                    top: 50%;
                    width: 3px;
                    height: 60%;
                    background: #d0021b;
                    animation: blink 1s infinite;
                }
                
                @keyframes blink {
                    0%, 50% { opacity: 1; }
                    51%, 100% { opacity: 0; }
                }
                
                .page-loader .loader-content {
                    text-align: center;
                    animation: fadeInScale 1s ease-out;
                }
                
                .page-loader .loader-logo {
                    width: 80px;
                    height: auto;
                    margin-bottom: 20px;
                    animation: pulse 2s ease-in-out infinite;
                }
                
                .page-loader .loader-bar {
                    width: 300px;
                    height: 4px;
                    background: rgba(208, 2, 27, 0.2);
                    border-radius: 2px;
                    overflow: hidden;
                    margin: 0 auto 15px;
                }
                
                .page-loader .loader-progress {
                    height: 100%;
                    background: linear-gradient(90deg, #d0021b, #ff6b9d);
                    border-radius: 2px;
                    transition: width 0.3s ease;
                    box-shadow: 0 0 10px rgba(208, 2, 27, 0.5);
                }
                
                .page-loader .loader-text {
                    color: #666;
                    font-size: 14px;
                    margin: 0;
                    animation: fadeInOut 2s ease-in-out infinite;
                }
                
                @keyframes fadeInScale {
                    from {
                        opacity: 0;
                        transform: scale(0.8);
                    }
                    to {
                        opacity: 1;
                        transform: scale(1);
                    }
                }
                
                @keyframes pulse {
                    0%, 100% {
                        transform: scale(1);
                    }
                    50% {
                        transform: scale(1.05);
                    }
                }
                
                @keyframes fadeInOut {
                    0%, 100% {
                        opacity: 0.6;
                    }
                    50% {
                        opacity: 1;
                    }
                }
                
                
                .categoria, .categoria img, .categoria h3 {
                    cursor: pointer;
                }
                
                .categoria:hover {
                    cursor: pointer;
                }
                
                
                @media (max-width: 768px) {
                    .categoria {
                        transform: translateY(30px) scale(0.9);
                    }
                    
                    .categoria:hover {
                        transform: translateY(-5px) scale(1.01);
                    }
                    
                    .floating-element {
                        display: none;
                    }
                }
                
                
                * {
                    -webkit-tap-highlight-color: transparent;
                }
                
                .categoria a {
                    display: block;
                    text-decoration: none;
                    color: inherit;
                }
                
                
                .categoria:focus-within {
                    outline: 3px solid rgba(208, 2, 27, 0.5);
                    outline-offset: 5px;
                }
            `;
      document.head.appendChild(style);
    }
  }

  initAdvancedInteractions() {
    window.addEventListener("scroll", () => {
      const scrolled = window.pageYOffset;
      const categorias = document.querySelectorAll(".categoria");

      categorias.forEach((categoria, index) => {
        const speed = 0.1 + index * 0.05;
        const yPos = -(scrolled * speed);
        categoria.style.transform += ` translateZ(0) translate3d(0, ${yPos}px, 0)`;
      });
    });

    if ("ontouchstart" in window) {
      this.setupTouchInteractions();
    }

    this.setupKeyboardShortcuts();

    this.setupInactivityDetector();

    this.setupNotificationSystem();
  }

  setupTouchInteractions() {
    const categorias = document.querySelectorAll(".categoria");

    categorias.forEach((categoria) => {
      categoria.addEventListener("touchstart", (e) => {
        categoria.style.transform = "scale(0.95)";
      });

      categoria.addEventListener("touchend", (e) => {
        categoria.style.transform = "scale(1)";

        this.createTouchRipple(e, categoria);
      });
    });
  }

  createTouchRipple(e, element) {
    const ripple = document.createElement("div");
    const rect = element.getBoundingClientRect();
    const touch = e.changedTouches[0];

    const x = touch.clientX - rect.left;
    const y = touch.clientY - rect.top;

    ripple.style.cssText = `
            position: absolute;
            border-radius: 50%;
            background: rgba(208, 2, 27, 0.3);
            transform: scale(0);
            animation: rippleEffect 0.6s ease-out;
            left: ${x - 25}px;
            top: ${y - 25}px;
            width: 50px;
            height: 50px;
            pointer-events: none;
        `;

    element.style.position = "relative";
    element.appendChild(ripple);

    setTimeout(() => {
      if (ripple.parentNode) {
        ripple.parentNode.removeChild(ripple);
      }
    }, 600);

    if (!document.querySelector("#ripple-keyframes")) {
      const style = document.createElement("style");
      style.id = "ripple-keyframes";
      style.textContent = `
                @keyframes rippleEffect {
                    to {
                        transform: scale(4);
                        opacity: 0;
                    }
                }
            `;
      document.head.appendChild(style);
    }
  }

  setupKeyboardShortcuts() {
    document.addEventListener("keydown", (e) => {
      if (e.altKey && e.key >= "1" && e.key <= "9") {
        e.preventDefault();
        const categoryIndex = parseInt(e.key) - 1;
        const categoria =
          document.querySelectorAll(".categoria")[categoryIndex];
        if (categoria) {
          categoria.scrollIntoView({ behavior: "smooth", block: "center" });
          categoria.focus();
          this.highlightElement(categoria);
        }
      }

      if (e.ctrlKey && e.key === "k") {
        e.preventDefault();
        this.showQuickSearch();
      }
    });
  }

  highlightElement(element) {
    element.style.boxShadow = "0 0 0 3px rgba(208, 2, 27, 0.6)";
    element.style.transition = "box-shadow 0.3s ease";

    setTimeout(() => {
      element.style.boxShadow = "";
    }, 2000);
  }

  showQuickSearch() {
    console.log("🔍 Búsqueda rápida activada");
    this.showNotification("Búsqueda rápida: Ctrl+K", "info");
  }

  setupInactivityDetector() {
    let inactivityTimer;
    const inactivityTime = 30000;

    const resetTimer = () => {
      clearTimeout(inactivityTimer);
      inactivityTimer = setTimeout(() => {
        this.handleInactivity();
      }, inactivityTime);
    };

    ["mousedown", "mousemove", "keypress", "scroll", "touchstart"].forEach(
      (event) => {
        document.addEventListener(event, resetTimer, true);
      }
    );

    resetTimer();
  }

  handleInactivity() {
    this.showNotification(
      "💡 ¿Necesitas ayuda para elegir? Haz clic en cualquier producto para más información",
      "tip"
    );
  }

  setupNotificationSystem() {
    const container = document.createElement("div");
    container.id = "notification-container";
    container.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            z-index: 10000;
            max-width: 300px;
        `;
    document.body.appendChild(container);
  }

  showNotification(message, type = "info", duration = 5000) {
    const notification = document.createElement("div");
    notification.className = `notification notification-${type}`;

    const colors = {
      info: "#4a90e2",
      success: "#27ae60",
      warning: "#f39c12",
      error: "#e74c3c",
      tip: "#9b59b6",
    };

    notification.innerHTML = `
            <div class="notification-content">
                <span class="notification-message">${message}</span>
                <button class="notification-close">&times;</button>
            </div>
        `;

    notification.style.cssText = `
            background: white;
            border-left: 4px solid ${colors[type]};
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            margin-bottom: 10px;
            opacity: 0;
            transform: translateX(100%);
            transition: all 0.3s ease;
            padding: 15px;
            position: relative;
        `;

    document.getElementById("notification-container").appendChild(notification);

    requestAnimationFrame(() => {
      notification.style.opacity = "1";
      notification.style.transform = "translateX(0)";
    });

    const autoRemove = setTimeout(() => {
      this.removeNotification(notification);
    }, duration);

    notification
      .querySelector(".notification-close")
      .addEventListener("click", () => {
        clearTimeout(autoRemove);
        this.removeNotification(notification);
      });

    return notification;
  }

  removeNotification(notification) {
    notification.style.opacity = "0";
    notification.style.transform = "translateX(100%)";

    setTimeout(() => {
      if (notification.parentNode) {
        notification.parentNode.removeChild(notification);
      }
    }, 300);
  }
}

function smoothScrollTo(target, duration = 1000) {
  const element = document.querySelector(target);
  if (!element) return;

  const start = window.pageYOffset;
  const targetPosition = element.getBoundingClientRect().top + start - 100;
  const distance = targetPosition - start;
  let currentTime = 0;

  const easeInOutCubic = (t) => {
    return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
  };

  const animateScroll = () => {
    currentTime += 16;
    const timeRatio = Math.min(currentTime / duration, 1);
    const easedRatio = easeInOutCubic(timeRatio);

    window.scrollTo(0, start + distance * easedRatio);

    if (timeRatio < 1) {
      requestAnimationFrame(animateScroll);
    }
  };

  animateScroll();
}

function detectDevicePerformance() {
  const canvas = document.createElement("canvas");
  const gl = canvas.getContext("webgl");

  let performance = "high";

  if (!gl) {
    performance = "low";
  } else {
    const debugInfo = gl.getExtension("WEBGL_debug_renderer_info");
    if (debugInfo) {
      const renderer = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL);
      if (renderer.includes("Intel") || renderer.includes("AMD")) {
        performance = "medium";
      }
    }
  }

  if (performance === "low") {
    document.documentElement.style.setProperty(
      "--transicion-rapida",
      "0.1s ease"
    );
    document.documentElement.style.setProperty(
      "--transicion-suave",
      "0.2s ease"
    );
  }

  return performance;
}

class ImageCache {
  constructor() {
    this.cache = new Map();
    this.preloadQueue = [];
  }

  preload(src) {
    if (this.cache.has(src)) return Promise.resolve(this.cache.get(src));

    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        this.cache.set(src, img);
        resolve(img);
      };
      img.onerror = reject;
      img.src = src;
    });
  }

  preloadBatch(sources) {
    return Promise.all(sources.map((src) => this.preload(src)));
  }

  get(src) {
    return this.cache.get(src);
  }
}

const imageCache = new ImageCache();

function formatNumber(num, locale = "es-CR") {
  return new Intl.NumberFormat(locale).format(num);
}

function getConnectionInfo() {
  const connection =
    navigator.connection ||
    navigator.mozConnection ||
    navigator.webkitConnection;

  if (connection) {
    return {
      effectiveType: connection.effectiveType,
      downlink: connection.downlink,
      rtt: connection.rtt,
      saveData: connection.saveData,
    };
  }

  return null;
}

document.addEventListener("DOMContentLoaded", () => {
  const devicePerformance = detectDevicePerformance();
  console.log("🚀 Performance del dispositivo:", devicePerformance);

  const connectionInfo = getConnectionInfo();
  if (connectionInfo) {
    console.log("🌐 Info de conexión:", connectionInfo);
  }

  const criticalImages = Array.from(
    document.querySelectorAll(".categoria img")
  ).map((img) => img.src);
  imageCache.preloadBatch(criticalImages).then(() => {
    console.log("🖼️ Imágenes críticas precargadas");
  });

  const pielSecaManager = new PielSecaManager();

  if (devicePerformance !== "low") {
  }

  setTimeout(() => {
    pielSecaManager.showNotification(
      "✨ ¡Bienvenido! Descubre nuestros productos especiales para piel seca",
      "tip",
      4000
    );
  }, 2000);

  console.log("🧴 Sistema ELVÉ para Piel Seca iniciado correctamente!");
  console.log(
    "📱 Dispositivo:",
    /Mobi|Android/i.test(navigator.userAgent) ? "Móvil" : "Desktop"
  );
});

window.addEventListener("error", (e) => {
  console.error("❌ Error en piel-seca.js:", e.error);

  if (typeof gtag !== "undefined") {
    gtag("event", "javascript_error", {
      error_message: e.message,
      error_filename: e.filename,
      error_lineno: e.lineno,
    });
  }
});

window.addEventListener("unhandledrejection", (e) => {
  console.error("❌ Promesa rechazada:", e.reason);
  e.preventDefault();
});

if ("performance" in window) {
  window.addEventListener("load", () => {
    const timing = performance.timing;
    const loadTime = timing.loadEventEnd - timing.navigationStart;
    const domContentTime =
      timing.domContentLoadedEventEnd - timing.navigationStart;
    const firstPaint = performance.getEntriesByType("paint")[0]?.startTime || 0;

    const metrics = {
      loadTime: loadTime,
      domContentTime: domContentTime,
      firstPaint: firstPaint,
      loadTimeReadable: `${(loadTime / 1000).toFixed(2)}s`,
    };

    console.log("⚡ Métricas de performance:", metrics);

    if (typeof gtag !== "undefined") {
      gtag("event", "performance_metrics", metrics);
    }
  });
}
