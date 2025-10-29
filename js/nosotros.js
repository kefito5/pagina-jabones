document.addEventListener("DOMContentLoaded", function () {
  const animationConfig = {
    duration: 1000,
    easing: "cubic-bezier(0.68, -0.55, 0.265, 1.55)",
    staggerDelay: 200,
    bounceEasing: "cubic-bezier(0.68, -0.6, 0.32, 1.6)",
    naturalEasing: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
  };

  function initOrganicParallax() {
    const sections = document.querySelectorAll("section");

    window.addEventListener("scroll", () => {
      const scrolled = window.pageYOffset;

      sections.forEach((section, index) => {
        const rect = section.getBoundingClientRect();
        const speed = 0.1 + index * 0.05;

        if (rect.top < window.innerHeight && rect.bottom > 0) {
          const offset = scrolled * speed;
          section.style.transform = `translateY(${offset}px)`;

          const opacity = Math.min(
            1,
            Math.max(
              0.3,
              1 -
                Math.abs(rect.top - window.innerHeight / 2) / window.innerHeight
            )
          );
          section.style.opacity = opacity;
        }
      });
    });
  }

  function initMagicalTitle() {
    const title = document.querySelector("#quienes-somos h1");
    if (!title) return;

    const text = title.textContent;
    title.innerHTML = "";

    const letters = text.split("").map((char) => {
      if (char === " ") return '<span class="space">&nbsp;</span>';

      const span = document.createElement("span");
      span.textContent = char;
      span.className = "magic-letter";
      span.style.cssText = `
                display: inline-block;
                opacity: 0;
                transform: translateY(80px) rotate(${
                  Math.random() * 40 - 20
                }deg) scale(0.3);
                transition: all 0.8s ${animationConfig.bounceEasing};
                color: #2c5530;
                text-shadow: 0 0 20px rgba(76, 175, 80, 0.3);
                position: relative;
            `;

      const leaf = document.createElement("div");
      leaf.className = "letter-leaf";
      leaf.style.cssText = `
                position: absolute;
                top: -10px;
                left: 50%;
                width: 8px;
                height: 8px;
                background: linear-gradient(45deg, #4caf50, #8bc34a);
                border-radius: 50% 0;
                transform: translateX(-50%) rotate(45deg) scale(0);
                transition: all 0.6s ease;
                opacity: 0;
            `;
      span.appendChild(leaf);

      return span;
    });

    letters.forEach((letter, index) => {
      if (typeof letter === "string") {
        title.innerHTML += letter;
      } else {
        title.appendChild(letter);
      }
    });

    const realLetters = letters.filter((l) => typeof l !== "string");
    realLetters.forEach((letter, index) => {
      setTimeout(() => {
        letter.style.opacity = "1";
        letter.style.transform = "translateY(0) rotate(0deg) scale(1)";

        const leaf = letter.querySelector(".letter-leaf");
        setTimeout(() => {
          leaf.style.opacity = "1";
          leaf.style.transform = "translateX(-50%) rotate(45deg) scale(1)";

          setTimeout(() => {
            leaf.style.transform =
              "translateX(-50%) rotate(45deg) scale(0) translateY(20px)";
            leaf.style.opacity = "0";
          }, 800);
        }, 200);

        setTimeout(() => {
          letter.style.textShadow = "0 0 30px rgba(76, 175, 80, 0.6)";
          setTimeout(() => {
            letter.style.textShadow = "0 0 10px rgba(76, 175, 80, 0.2)";
          }, 300);
        }, 400);
      }, index * 120);
    });
  }

  function initValuesAnimation() {
    const valuesList = document.querySelector("#valores ul");
    const values = document.querySelectorAll("#valores li");

    if (!valuesList || !values.length) return;

    const effectsContainer = document.createElement("div");
    effectsContainer.className = "values-effects";
    effectsContainer.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            overflow: hidden;
        `;
    valuesList.style.position = "relative";
    valuesList.appendChild(effectsContainer);

    values.forEach((value, index) => {
      value.style.opacity = "0";
      value.style.transform = "translateX(-100px) rotate(-10deg) scale(0.8)";
      value.style.transition = `all 0.8s ${animationConfig.bounceEasing}`;
      value.style.position = "relative";
      value.style.padding = "15px 20px";
      value.style.margin = "10px 0";
      value.style.borderRadius = "15px";
      value.style.background =
        "linear-gradient(135deg, rgba(76, 175, 80, 0.1), rgba(139, 195, 74, 0.05))";
      value.style.border = "1px solid rgba(76, 175, 80, 0.2)";
      value.style.backdropFilter = "blur(10px)";

      const seed = document.createElement("div");
      seed.className = "value-seed";
      seed.style.cssText = `
                position: absolute;
                right: 20px;
                top: 50%;
                width: 12px;
                height: 12px;
                background: radial-gradient(circle, #4caf50, #8bc34a);
                border-radius: 50%;
                transform: translateY(-50%) scale(0);
                transition: all 0.6s ${animationConfig.naturalEasing};
                box-shadow: 0 0 15px rgba(76, 175, 80, 0.5);
            `;
      value.appendChild(seed);

      const roots = document.createElement("div");
      roots.className = "value-roots";
      roots.style.cssText = `
                position: absolute;
                bottom: -5px;
                left: 0;
                width: 100%;
                height: 5px;
                background: linear-gradient(90deg, transparent, #4caf50, transparent);
                transform: scaleX(0);
                transition: transform 1s ${animationConfig.naturalEasing};
                border-radius: 0 0 10px 10px;
            `;
      value.appendChild(roots);

      value.addEventListener("mouseenter", function () {
        this.style.transform = "translateX(10px) scale(1.05)";
        this.style.background =
          "linear-gradient(135deg, rgba(76, 175, 80, 0.2), rgba(139, 195, 74, 0.1))";
        this.style.borderColor = "rgba(76, 175, 80, 0.4)";
        this.style.boxShadow = "0 10px 30px rgba(76, 175, 80, 0.2)";

        seed.style.transform = "translateY(-50%) scale(1.3) rotate(180deg)";
        seed.style.boxShadow = "0 0 25px rgba(76, 175, 80, 0.8)";

        for (let i = 0; i < 5; i++) {
          setTimeout(() => {
            const pollen = document.createElement("div");
            pollen.style.cssText = `
                            position: absolute;
                            width: 4px;
                            height: 4px;
                            background: #ffeb3b;
                            border-radius: 50%;
                            right: 26px;
                            top: 50%;
                            transform: translateY(-50%);
                            pointer-events: none;
                            animation: pollen-float 2s ease-out forwards;
                        `;
            this.appendChild(pollen);

            setTimeout(() => pollen.remove(), 2000);
          }, i * 100);
        }
      });

      value.addEventListener("mouseleave", function () {
        this.style.transform = "translateX(0) scale(1)";
        this.style.background =
          "linear-gradient(135deg, rgba(76, 175, 80, 0.1), rgba(139, 195, 74, 0.05))";
        this.style.borderColor = "rgba(76, 175, 80, 0.2)";
        this.style.boxShadow = "none";

        seed.style.transform = "translateY(-50%) scale(1) rotate(0deg)";
        seed.style.boxShadow = "0 0 15px rgba(76, 175, 80, 0.5)";
      });
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            values.forEach((value, index) => {
              setTimeout(() => {
                value.style.opacity = "1";
                value.style.transform = "translateX(0) rotate(0deg) scale(1)";

                const seed = value.querySelector(".value-seed");
                const roots = value.querySelector(".value-roots");

                setTimeout(() => {
                  seed.style.transform = "translateY(-50%) scale(1)";
                  roots.style.transform = "scaleX(1)";
                }, 300);
              }, index * 200);
            });
          }
        });
      },
      { threshold: 0.3 }
    );

    observer.observe(valuesList);
  }

  function initStorytellingEffect() {
    const historySection = document.getElementById("historia");
    const historyText = historySection.querySelector("p");

    if (!historyText) return;

    const storyBackground = document.createElement("div");
    storyBackground.className = "story-background";
    storyBackground.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(45deg, 
                rgba(76, 175, 80, 0.05) 0%, 
                rgba(139, 195, 74, 0.03) 50%, 
                rgba(76, 175, 80, 0.05) 100%);
            opacity: 0;
            transition: opacity 1s ease;
            pointer-events: none;
        `;
    historySection.style.position = "relative";
    historySection.appendChild(storyBackground);

    const leaves = [];
    for (let i = 0; i < 8; i++) {
      const leaf = document.createElement("div");
      leaf.className = "floating-leaf";
      leaf.style.cssText = `
                position: absolute;
                width: ${12 + Math.random() * 8}px;
                height: ${12 + Math.random() * 8}px;
                background: linear-gradient(45deg, #4caf50, #8bc34a);
                border-radius: 50% 0;
                transform: rotate(45deg) scale(0);
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                pointer-events: none;
                transition: all 1s ease;
                opacity: 0;
                animation: leaf-sway ${
                  4 + Math.random() * 3
                }s ease-in-out infinite;
                animation-delay: ${i * 0.5}s;
            `;
      historySection.appendChild(leaf);
      leaves.push(leaf);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            storyBackground.style.opacity = "1";

            leaves.forEach((leaf, index) => {
              setTimeout(() => {
                leaf.style.opacity = "0.6";
                leaf.style.transform = "rotate(45deg) scale(1)";
              }, index * 150);
            });

            const text = historyText.textContent;
            historyText.textContent = "";
            historyText.style.borderRight = "2px solid #4caf50";

            let i = 0;
            const typeEffect = setInterval(() => {
              historyText.textContent += text[i];
              i++;

              if (i >= text.length) {
                clearInterval(typeEffect);
                setTimeout(() => {
                  historyText.style.borderRight = "none";
                }, 500);
              }
            }, 30);
          }
        });
      },
      { threshold: 0.3 }
    );

    observer.observe(historySection);
  }

  function initMagicalCTA() {
    const ctaButton = document.querySelector(".btn-catalogo");
    if (!ctaButton) return;

    ctaButton.style.position = "relative";
    ctaButton.style.overflow = "hidden";
    ctaButton.style.transition =
      "all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55)";

    const growthEffect = document.createElement("div");
    growthEffect.className = "growth-effect";
    growthEffect.style.cssText = `
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            height: 0;
            background: linear-gradient(to top, #4caf50, #8bc34a);
            transition: height 0.5s ease;
            z-index: -1;
        `;
    ctaButton.appendChild(growthEffect);

    const seeds = [];
    for (let i = 0; i < 6; i++) {
      const seed = document.createElement("div");
      seed.className = "floating-seed";
      seed.style.cssText = `
                position: absolute;
                width: 6px;
                height: 6px;
                background: #ffeb3b;
                border-radius: 50%;
                opacity: 0;
                pointer-events: none;
                box-shadow: 0 0 10px #ffeb3b;
            `;
      ctaButton.appendChild(seed);
      seeds.push(seed);
    }

    ctaButton.addEventListener("mouseenter", function () {
      this.style.transform = "scale(1.1) translateY(-5px)";
      this.style.boxShadow = "0 15px 40px rgba(76, 175, 80, 0.3)";
      growthEffect.style.height = "100%";

      seeds.forEach((seed, index) => {
        setTimeout(() => {
          const angle = (index / seeds.length) * Math.PI * 2;
          const radius = 40;
          const x = Math.cos(angle) * radius;
          const y = Math.sin(angle) * radius;

          seed.style.transform = `translate(${x}px, ${y}px)`;
          seed.style.opacity = "0.8";
          seed.style.transition = "all 0.8s ease";
        }, index * 100);
      });
    });

    ctaButton.addEventListener("mouseleave", function () {
      this.style.transform = "scale(1) translateY(0)";
      this.style.boxShadow = "none";
      growthEffect.style.height = "0";

      seeds.forEach((seed) => {
        seed.style.transform = "translate(0, 0)";
        seed.style.opacity = "0";
      });
    });

    ctaButton.addEventListener("click", function (e) {
      for (let i = 0; i < 12; i++) {
        const particle = document.createElement("div");
        particle.style.cssText = `
                    position: absolute;
                    width: 8px;
                    height: 8px;
                    background: #4caf50;
                    border-radius: 50%;
                    left: ${e.offsetX}px;
                    top: ${e.offsetY}px;
                    pointer-events: none;
                    animation: explode 0.8s ease-out forwards;
                `;
        this.appendChild(particle);

        setTimeout(() => particle.remove(), 800);
      }
    });
  }

  function initNaturalHeader() {
    const header = document.querySelector("header");
    if (!header) return;

    let lastScrollY = window.scrollY;
    let scrollDirection = "up";

    const dew = document.createElement("div");
    dew.className = "header-dew";
    dew.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 1px;
            background: linear-gradient(90deg, 
                transparent, 
                rgba(76, 175, 80, 0.3), 
                rgba(139, 195, 74, 0.3), 
                transparent);
            transform: scaleX(0);
            transition: transform 0.5s ease;
        `;
    header.appendChild(dew);

    window.addEventListener("scroll", () => {
      const scrollY = window.scrollY;
      scrollDirection = scrollY > lastScrollY ? "down" : "up";

      if (scrollY > 50) {
        header.style.background = "rgba(255, 255, 255, 0.95)";
        header.style.backdropFilter = "blur(15px) saturate(150%)";
        header.style.borderBottom = "1px solid rgba(76, 175, 80, 0.2)";
        header.style.boxShadow = "0 4px 20px rgba(76, 175, 80, 0.1)";
        dew.style.transform = "scaleX(1)";

        if (scrollDirection === "down" && scrollY > 200) {
          header.style.transform = "translateY(-100%)";
        } else {
          header.style.transform = "translateY(0)";
        }
      } else {
        header.style.background = "rgba(255, 255, 255, 0.98)";
        header.style.backdropFilter = "none";
        header.style.borderBottom = "none";
        header.style.boxShadow = "none";
        header.style.transform = "translateY(0)";
        dew.style.transform = "scaleX(0)";
      }

      lastScrollY = scrollY;
    });
  }

  function injectNaturalStyles() {
    const style = document.createElement("style");
    style.textContent = `
            
            @keyframes leaf-sway {
                0%, 100% { transform: rotate(45deg) scale(1) translateY(0); }
                25% { transform: rotate(40deg) scale(1.1) translateY(-5px); }
                50% { transform: rotate(50deg) scale(0.9) translateY(3px); }
                75% { transform: rotate(43deg) scale(1.05) translateY(-2px); }
            }
            
            @keyframes pollen-float {
                0% { transform: translateY(-50%) translateX(0) scale(1); opacity: 1; }
                50% { transform: translateY(-60%) translateX(20px) scale(1.2); opacity: 0.8; }
                100% { transform: translateY(-80%) translateX(40px) scale(0); opacity: 0; }
            }
            
            @keyframes explode {
                0% { transform: scale(1); opacity: 1; }
                100% { 
                    transform: scale(0) translate(${
                      Math.random() * 200 - 100
                    }px, ${Math.random() * 200 - 100}px);
                    opacity: 0;
                }
            }
            
            
            body { overflow-x: hidden; }
            
            header {
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                z-index: 1000;
                transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
            }
            
            .magic-letter:hover {
                transform: scale(1.3) rotate(10deg) !important;
                color: #4caf50 !important;
                text-shadow: 0 0 25px rgba(76, 175, 80, 0.8) !important;
            }
            
            section {
                transition: all 0.1s ease-out;
            }
            
            
            @media (max-width: 768px) {
                .floating-leaf, .floating-seed {
                    display: none;
                }
                
                .values-effects {
                    display: none;
                }
            }
        `;
    document.head.appendChild(style);
  }

  function initAllNaturalEffects() {
    injectNaturalStyles();

    initOrganicParallax();
    initMagicalTitle();
    initValuesAnimation();
    initStorytellingEffect();
    initMagicalCTA();
    initNaturalHeader();

    document.body.style.paddingTop = "80px";

    document.body.style.opacity = "0";
    document.body.style.transform = "translateY(20px)";

    setTimeout(() => {
      document.body.style.transition =
        "all 1s cubic-bezier(0.25, 0.46, 0.45, 0.94)";
      document.body.style.opacity = "1";
      document.body.style.transform = "translateY(0)";
    }, 100);
  }

  initAllNaturalEffects();

  console.log("🌿 ¡Efectos naturales de Jaboné activados! 🧼✨");
});

(function () {
  const canvas = document.createElement("canvas");
  canvas.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: -1;
        opacity: 0.2;
    `;
  document.body.appendChild(canvas);

  const ctx = canvas.getContext("2d");
  const petals = [];

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  function createPetal() {
    return {
      x: Math.random() * canvas.width,
      y: -20,
      vx: (Math.random() - 0.5) * 0.8,
      vy: Math.random() * 1 + 0.5,
      size: Math.random() * 6 + 3,
      rotation: Math.random() * Math.PI * 2,
      rotationSpeed: (Math.random() - 0.5) * 0.02,
      opacity: Math.random() * 0.6 + 0.2,
      color: `hsl(${120 + Math.random() * 40}, 70%, ${
        60 + Math.random() * 20
      }%)`,
    };
  }

  function initPetals() {
    for (let i = 0; i < 15; i++) {
      petals.push(createPetal());
    }
  }

  function updatePetals() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    petals.forEach((petal, index) => {
      petal.x += petal.vx;
      petal.y += petal.vy;
      petal.rotation += petal.rotationSpeed;

      if (petal.y > canvas.height + 20) {
        petals[index] = createPetal();
        return;
      }

      ctx.save();
      ctx.translate(petal.x, petal.y);
      ctx.rotate(petal.rotation);
      ctx.globalAlpha = petal.opacity;

      ctx.beginPath();
      ctx.ellipse(0, 0, petal.size, petal.size * 0.6, 0, 0, Math.PI * 2);
      ctx.fillStyle = petal.color;
      ctx.fill();

      ctx.restore();
    });

    requestAnimationFrame(updatePetals);
  }

  window.addEventListener("resize", resizeCanvas);
  resizeCanvas();
  initPetals();
  updatePetals();
})();
