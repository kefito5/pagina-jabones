document.addEventListener("DOMContentLoaded", function () {
  const animationConfig = {
    duration: 1200,
    easing: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
    staggerDelay: 150,
  };

  function initParallaxEffect() {
    const header = document.querySelector("header");
    const intro = document.querySelector("#intro-beneficios");

    window.addEventListener("scroll", () => {
      const scrolled = window.pageYOffset;
      const parallaxSpeed = 0.5;

      if (intro) {
        intro.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
        intro.style.opacity = Math.max(0, 1 - scrolled / 400);
      }
    });
  }

  function createIntersectionObserver() {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate-in");

          if (entry.target.classList.contains("beneficio")) {
            setTimeout(() => {
              entry.target.style.transform = "translateY(0) scale(1)";
              entry.target.style.opacity = "1";
            }, Math.random() * 300);
          }
        }
      });
    }, observerOptions);

    document
      .querySelectorAll(".beneficio, #comparativa, #cta-beneficios")
      .forEach((el) => {
        observer.observe(el);
      });
  }

  function initBeneficiosHover() {
    const beneficios = document.querySelectorAll(".beneficio");

    beneficios.forEach((beneficio, index) => {
      beneficio.style.transition =
        "all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)";
      beneficio.style.transform = "translateY(50px)";
      beneficio.style.opacity = "0";

      beneficio.addEventListener("mouseenter", function () {
        this.style.transform = "translateY(-15px) scale(1.05)";
        this.style.boxShadow = "0 20px 40px rgba(0, 0, 0, 0.15)";
        this.style.borderRadius = "15px";

        const img = this.querySelector("img");
        if (img) {
          img.style.transform = "scale(1.2) rotate(5deg)";
          img.style.filter = "brightness(1.1) saturate(1.3)";
        }

        const h3 = this.querySelector("h3");
        if (h3) {
          h3.style.color = "#2c5530";
          h3.style.textShadow = "0 2px 4px rgba(0, 0, 0, 0.1)";
        }
      });

      beneficio.addEventListener("mouseleave", function () {
        this.style.transform = "translateY(0) scale(1)";
        this.style.boxShadow = "0 5px 15px rgba(0, 0, 0, 0.08)";

        const img = this.querySelector("img");
        if (img) {
          img.style.transform = "scale(1) rotate(0deg)";
          img.style.filter = "brightness(1) saturate(1)";
        }

        const h3 = this.querySelector("h3");
        if (h3) {
          h3.style.color = "";
          h3.style.textShadow = "";
        }
      });
    });
  }

  function animateComparativeTable() {
    const table = document.querySelector("#comparativa table");
    const rows = table.querySelectorAll("tbody tr");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            rows.forEach((row, index) => {
              setTimeout(() => {
                row.style.transform = "translateX(0)";
                row.style.opacity = "1";

                const cells = row.querySelectorAll("td");
                cells.forEach((cell, cellIndex) => {
                  if (cell.textContent.includes("✅")) {
                    setTimeout(() => {
                      cell.style.transform = "scale(1.3)";
                      cell.style.color = "#27ae60";
                      setTimeout(() => {
                        cell.style.transform = "scale(1)";
                      }, 200);
                    }, cellIndex * 100);
                  } else if (cell.textContent.includes("❌")) {
                    setTimeout(() => {
                      cell.style.transform = "scale(1.3)";
                      cell.style.color = "#e74c3c";
                      setTimeout(() => {
                        cell.style.transform = "scale(1)";
                      }, 200);
                    }, cellIndex * 100);
                  }
                });
              }, index * 150);
            });
          }
        });
      },
      { threshold: 0.3 }
    );

    observer.observe(table);

    rows.forEach((row) => {
      row.style.transform = "translateX(-50px)";
      row.style.opacity = "0";
      row.style.transition = "all 0.6s ease-out";
    });
  }

  function initMagicalCTA() {
    const cta = document.querySelector("#cta-beneficios");
    const button = cta.querySelector(".btn-catalogo");

    if (button) {
      const particles = [];
      for (let i = 0; i < 20; i++) {
        const particle = document.createElement("div");
        particle.className = "particle";
        particle.style.cssText = `
                    position: absolute;
                    width: 4px;
                    height: 4px;
                    background: rgba(76, 175, 80, 0.6);
                    border-radius: 50%;
                    pointer-events: none;
                    opacity: 0;
                `;
        cta.appendChild(particle);
        particles.push(particle);
      }

      button.addEventListener("mouseenter", function () {
        this.style.transform = "scale(1.1) translateY(-5px)";
        this.style.boxShadow = "0 15px 30px rgba(76, 175, 80, 0.4)";
        this.style.background = "linear-gradient(45deg, #4caf50, #66bb6a)";

        particles.forEach((particle, index) => {
          setTimeout(() => {
            const angle = (index / particles.length) * Math.PI * 2;
            const radius = 50 + Math.random() * 30;
            const x = Math.cos(angle) * radius;
            const y = Math.sin(angle) * radius;

            particle.style.transform = `translate(${x}px, ${y}px)`;
            particle.style.opacity = "1";
            particle.style.transition = "all 0.8s ease-out";
          }, index * 50);
        });
      });

      button.addEventListener("mouseleave", function () {
        this.style.transform = "scale(1) translateY(0)";
        this.style.boxShadow = "0 5px 15px rgba(76, 175, 80, 0.2)";
        this.style.background = "";

        particles.forEach((particle) => {
          particle.style.transform = "translate(0, 0)";
          particle.style.opacity = "0";
        });
      });
    }
  }

  function createScrollWaves() {
    const sections = document.querySelectorAll("section");
    let ticking = false;

    function updateWaves() {
      const scrolled = window.pageYOffset;

      sections.forEach((section, index) => {
        const rect = section.getBoundingClientRect();
        const sectionCenter = rect.top + rect.height / 2;
        const distanceFromCenter = Math.abs(
          sectionCenter - window.innerHeight / 2
        );
        const maxDistance = window.innerHeight;
        const influence = Math.max(0, 1 - distanceFromCenter / maxDistance);

        const wave = Math.sin(scrolled * 0.01 + index) * 10 * influence;
        section.style.transform = `translateY(${wave}px)`;
      });

      ticking = false;
    }

    window.addEventListener("scroll", () => {
      if (!ticking) {
        requestAnimationFrame(updateWaves);
        ticking = true;
      }
    });
  }

  function initDynamicHeader() {
    const header = document.querySelector("header");
    let lastScrollY = window.scrollY;

    window.addEventListener("scroll", () => {
      const scrollY = window.scrollY;
      const scrollDirection = scrollY > lastScrollY ? "down" : "up";

      if (scrollY > 100) {
        header.style.background = "rgba(255, 255, 255, 0.95)";
        header.style.backdropFilter = "blur(10px)";
        header.style.boxShadow = "0 2px 20px rgba(0, 0, 0, 0.1)";
      } else {
        header.style.background = "";
        header.style.backdropFilter = "";
        header.style.boxShadow = "";
      }

      lastScrollY = scrollY;
    });
  }

  function animateNumbers() {
    const numberElements = document.querySelectorAll("[data-count]");

    numberElements.forEach((element) => {
      const target = parseInt(element.dataset.count);
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              animateNumber(element, target);
            }
          });
        },
        { threshold: 0.5 }
      );

      observer.observe(element);
    });
  }

  function animateNumber(element, target) {
    let current = 0;
    const increment = target / 50;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      element.textContent = Math.floor(current);
    }, 30);
  }

  function initTypingEffect() {
    const titles = document.querySelectorAll("h1, h2");

    titles.forEach((title) => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (
              entry.isIntersecting &&
              !entry.target.classList.contains("typed")
            ) {
              typeText(entry.target);
            }
          });
        },
        { threshold: 0.5 }
      );

      observer.observe(title);
    });
  }

  function typeText(element) {
    element.classList.add("typed");
    const text = element.textContent;
    element.textContent = "";
    element.style.borderRight = "2px solid #4caf50";

    let index = 0;
    const timer = setInterval(() => {
      element.textContent += text[index];
      index++;

      if (index >= text.length) {
        clearInterval(timer);
        setTimeout(() => {
          element.style.borderRight = "none";
        }, 1000);
      }
    }, 50);
  }

  function initAllEffects() {
    const style = document.createElement("style");
    style.textContent = `
            
            .beneficio {
                position: relative;
                overflow: hidden;
            }
            
            .beneficio::before {
                content: '';
                position: absolute;
                top: 0;
                left: -100%;
                width: 100%;
                height: 100%;
                background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent);
                transition: left 0.5s;
            }
            
            .beneficio:hover::before {
                left: 100%;
            }
            
            .particle {
                transition: all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
            }
            
            body {
                overflow-x: hidden;
            }
            
            section {
                transition: transform 0.1s ease-out;
            }
            
            header {
                transition: all 0.3s ease-out;
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                z-index: 1000;
            }
            
            #intro-beneficios {
                transition: transform 0.1s ease-out, opacity 0.3s ease-out;
            }
            
            .animate-in {
                animation: slideInUp 0.8s ease-out forwards;
            }
            
            @keyframes slideInUp {
                from {
                    opacity: 0;
                    transform: translateY(30px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
            
            .btn-catalogo {
                transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
                position: relative;
                overflow: hidden;
            }
            
            .beneficio img {
                transition: all 0.3s ease-out;
            }
            
            .beneficio h3 {
                transition: all 0.3s ease-out;
            }
            
            #comparativa td {
                transition: all 0.3s ease-out;
            }
        `;
    document.head.appendChild(style);

    initParallaxEffect();
    createIntersectionObserver();
    initBeneficiosHover();
    animateComparativeTable();
    initMagicalCTA();
    createScrollWaves();
    initDynamicHeader();
    animateNumbers();
    initTypingEffect();

    document.body.style.paddingTop = "80px";
  }

  initAllEffects();

  console.log("🎉 ¡Efectos espectaculares de Jaboné activados! 🚀");
});

document.addEventListener("mousemove", (e) => {
  const cursor = document.querySelector(".magic-cursor") || createMagicCursor();
  cursor.style.left = e.clientX + "px";
  cursor.style.top = e.clientY + "px";
});

function createMagicCursor() {
  const cursor = document.createElement("div");
  cursor.className = "magic-cursor";
  cursor.style.cssText = `
        position: fixed;
        width: 20px;
        height: 20px;
        background: radial-gradient(circle, rgba(76, 175, 80, 0.8), transparent);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        transition: all 0.1s ease-out;
        mix-blend-mode: multiply;
    `;
  document.body.appendChild(cursor);
  return cursor;
}
