document.addEventListener("DOMContentLoaded", function () {
  const animationConfig = {
    duration: 1000,
    easing: "cubic-bezier(0.68, -0.55, 0.265, 1.55)",
    staggerDelay: 200,
    bounceEasing: "cubic-bezier(0.68, -0.6, 0.32, 1.6)",
  };

  function initParallaxHeader() {
    const header = document.querySelector("header");
    const contactInfo = document.querySelector("#contacto-info");

    window.addEventListener("scroll", () => {
      const scrolled = window.pageYOffset;
      const parallaxSpeed = 0.3;

      if (contactInfo) {
        const rect = contactInfo.getBoundingClientRect();
        const offset = Math.max(0, scrolled * parallaxSpeed);
        contactInfo.style.transform = `translateY(${offset}px)`;

        const opacity = Math.max(0.3, 1 - scrolled / 300);
        contactInfo.style.opacity = opacity;
      }
    });
  }

  function initMagicalWhatsAppButton() {
    const wspButton = document.querySelector(".btn-wsp");
    if (!wspButton) return;

    const pulseRings = [];
    for (let i = 0; i < 3; i++) {
      const ring = document.createElement("div");
      ring.className = "wsp-pulse-ring";
      ring.style.cssText = `
                position: absolute;
                top: 50%;
                left: 50%;
                width: 100%;
                height: 100%;
                border: 3px solid #25D366;
                border-radius: 50px;
                transform: translate(-50%, -50%) scale(0.8);
                opacity: 0;
                pointer-events: none;
                animation: wsp-pulse ${2 + i * 0.5}s infinite;
                animation-delay: ${i * 0.3}s;
            `;
      wspButton.appendChild(ring);
      pulseRings.push(ring);
    }

    const particles = [];
    for (let i = 0; i < 15; i++) {
      const particle = document.createElement("div");
      particle.className = "wsp-particle";
      particle.style.cssText = `
                position: absolute;
                width: 6px;
                height: 6px;
                background: #25D366;
                border-radius: 50%;
                pointer-events: none;
                opacity: 0;
                box-shadow: 0 0 10px #25D366;
            `;
      wspButton.appendChild(particle);
      particles.push(particle);
    }

    wspButton.addEventListener("mouseenter", function () {
      this.style.transform = "scale(1.15) translateY(-8px)";
      this.style.boxShadow = "0 15px 40px rgba(37, 211, 102, 0.4)";
      this.style.background = "linear-gradient(135deg, #25D366, #128C7E)";

      particles.forEach((particle, index) => {
        setTimeout(() => {
          const angle = (index / particles.length) * Math.PI * 2;
          const radius = 60 + Math.random() * 40;
          const x = Math.cos(angle) * radius;
          const y = Math.sin(angle) * radius;

          particle.style.transform = `translate(${x}px, ${y}px) scale(${
            0.5 + Math.random() * 0.8
          })`;
          particle.style.opacity = "0.8";
          particle.style.transition =
            "all 1s cubic-bezier(0.25, 0.46, 0.45, 0.94)";
        }, index * 30);
      });
    });

    wspButton.addEventListener("mouseleave", function () {
      this.style.transform = "scale(1) translateY(0)";
      this.style.boxShadow = "0 8px 25px rgba(37, 211, 102, 0.2)";
      this.style.background = "";

      particles.forEach((particle, index) => {
        setTimeout(() => {
          particle.style.transform = "translate(0, 0) scale(0)";
          particle.style.opacity = "0";
        }, index * 20);
      });
    });

    wspButton.addEventListener("click", function (e) {
      const ripple = document.createElement("div");
      ripple.className = "wsp-ripple";
      ripple.style.cssText = `
                position: absolute;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.6);
                transform: scale(0);
                animation: wsp-ripple-effect 0.6s linear;
                left: ${e.offsetX}px;
                top: ${e.offsetY}px;
                width: 20px;
                height: 20px;
                margin-left: -10px;
                margin-top: -10px;
                pointer-events: none;
            `;
      this.appendChild(ripple);

      setTimeout(() => {
        ripple.remove();
      }, 600);
    });
  }

  function initSocialNetworksAnimation() {
    const socialIcons = document.querySelectorAll(".redes-icons a");
    const socialSection = document.querySelector("#redes");

    if (!socialSection) return;

    const forceField = document.createElement("div");
    forceField.className = "social-force-field";
    forceField.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            background: radial-gradient(circle at 50% 50%, rgba(76, 175, 80, 0.1), transparent);
            opacity: 0;
            transition: opacity 0.5s ease;
        `;
    socialSection.appendChild(forceField);

    socialIcons.forEach((icon, index) => {
      icon.style.transition = "all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55)";
      icon.style.transform = "scale(0.8) rotate(-10deg)";
      icon.style.opacity = "0";

      const aura = document.createElement("div");
      aura.className = "social-aura";
      aura.style.cssText = `
                position: absolute;
                top: 50%;
                left: 50%;
                width: 120%;
                height: 120%;
                border-radius: 50%;
                background: radial-gradient(circle, rgba(76, 175, 80, 0.3), transparent);
                transform: translate(-50%, -50%) scale(0);
                pointer-events: none;
                transition: transform 0.3s ease;
            `;
      icon.appendChild(aura);

      icon.addEventListener("mouseenter", function () {
        this.style.transform = "scale(1.3) rotate(10deg) translateY(-10px)";
        this.style.filter =
          "brightness(1.2) drop-shadow(0 0 20px rgba(76, 175, 80, 0.8))";
        aura.style.transform = "translate(-50%, -50%) scale(1.2)";

        forceField.style.opacity = "1";

        for (let i = 0; i < 3; i++) {
          setTimeout(() => {
            const wave = document.createElement("div");
            wave.style.cssText = `
                            position: absolute;
                            top: 50%;
                            left: 50%;
                            width: 50px;
                            height: 50px;
                            border: 2px solid rgba(76, 175, 80, 0.6);
                            border-radius: 50%;
                            transform: translate(-50%, -50%) scale(0);
                            pointer-events: none;
                            animation: social-wave 1s ease-out forwards;
                        `;
            this.appendChild(wave);

            setTimeout(() => wave.remove(), 1000);
          }, i * 100);
        }
      });

      icon.addEventListener("mouseleave", function () {
        this.style.transform = "scale(1) rotate(0deg) translateY(0)";
        this.style.filter = "brightness(1) drop-shadow(none)";
        aura.style.transform = "translate(-50%, -50%) scale(0)";
        forceField.style.opacity = "0";
      });
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            socialIcons.forEach((icon, index) => {
              setTimeout(() => {
                icon.style.transform = "scale(1) rotate(0deg)";
                icon.style.opacity = "1";
              }, index * 150);
            });
          }
        });
      },
      { threshold: 0.5 }
    );

    observer.observe(socialSection);
  }

  function initMagicalTitle() {
    const title = document.querySelector("#contacto-info h1");
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
                transform: translateY(50px) rotate(${Math.random() * 360}deg);
                transition: all 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55);
                color: #2c5530;
                text-shadow: 0 0 20px rgba(76, 175, 80, 0.5);
            `;
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
        letter.style.transform = "translateY(0) rotate(0deg)";

        setTimeout(() => {
          letter.style.textShadow = "0 0 30px rgba(76, 175, 80, 0.8)";
          setTimeout(() => {
            letter.style.textShadow = "0 0 10px rgba(76, 175, 80, 0.3)";
          }, 200);
        }, 100);
      }, index * 80);
    });
  }

  function initInteractiveCursor() {
    const cursor = document.createElement("div");
    cursor.className = "interactive-cursor";
    cursor.style.cssText = `
            position: fixed;
            width: 30px;
            height: 30px;
            background: radial-gradient(circle, rgba(76, 175, 80, 0.6), transparent);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            transition: all 0.1s ease;
            mix-blend-mode: difference;
            transform: translate(-50%, -50%);
        `;
    document.body.appendChild(cursor);

    const trail = [];
    for (let i = 0; i < 10; i++) {
      const particle = document.createElement("div");
      particle.style.cssText = `
                position: fixed;
                width: ${8 - i}px;
                height: ${8 - i}px;
                background: rgba(76, 175, 80, ${0.5 - i * 0.05});
                border-radius: 50%;
                pointer-events: none;
                z-index: 9998;
                transition: all 0.1s ease;
                transform: translate(-50%, -50%);
            `;
      document.body.appendChild(particle);
      trail.push(particle);
    }

    let mouseX = 0,
      mouseY = 0;
    let positions = Array(10)
      .fill()
      .map(() => ({ x: 0, y: 0 }));

    document.addEventListener("mousemove", (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });

    function updateCursor() {
      positions[0] = { x: mouseX, y: mouseY };

      cursor.style.left = mouseX + "px";
      cursor.style.top = mouseY + "px";

      for (let i = 1; i < positions.length; i++) {
        positions[i].x += (positions[i - 1].x - positions[i].x) * 0.3;
        positions[i].y += (positions[i - 1].y - positions[i].y) * 0.3;

        trail[i - 1].style.left = positions[i].x + "px";
        trail[i - 1].style.top = positions[i].y + "px";
      }

      requestAnimationFrame(updateCursor);
    }

    updateCursor();

    const interactiveElements = document.querySelectorAll(
      "a, button, .btn-wsp"
    );
    interactiveElements.forEach((element) => {
      element.addEventListener("mouseenter", () => {
        cursor.style.transform = "translate(-50%, -50%) scale(2)";
        cursor.style.background =
          "radial-gradient(circle, rgba(37, 211, 102, 0.8), transparent)";
      });

      element.addEventListener("mouseleave", () => {
        cursor.style.transform = "translate(-50%, -50%) scale(1)";
        cursor.style.background =
          "radial-gradient(circle, rgba(76, 175, 80, 0.6), transparent)";
      });
    });
  }

  function initDynamicHeader() {
    const header = document.querySelector("header");
    if (!header) return;

    let lastScrollY = window.scrollY;
    let scrollDirection = "up";

    window.addEventListener("scroll", () => {
      const scrollY = window.scrollY;
      scrollDirection = scrollY > lastScrollY ? "down" : "up";

      if (scrollY > 50) {
        header.style.background = "rgba(255, 255, 255, 0.9)";
        header.style.backdropFilter = "blur(20px) saturate(180%)";
        header.style.borderBottom = "1px solid rgba(76, 175, 80, 0.2)";
        header.style.boxShadow = "0 8px 32px rgba(0, 0, 0, 0.1)";

        if (scrollDirection === "down" && scrollY > 200) {
          header.style.transform = "translateY(-100%)";
        } else {
          header.style.transform = "translateY(0)";
        }
      } else {
        header.style.background = "rgba(255, 255, 255, 0.95)";
        header.style.backdropFilter = "none";
        header.style.borderBottom = "none";
        header.style.boxShadow = "none";
        header.style.transform = "translateY(0)";
      }

      lastScrollY = scrollY;
    });
  }

  function initFloatingWhatsApp() {
    const floatingBtn = document.createElement("div");
    floatingBtn.className = "floating-whatsapp";
    floatingBtn.innerHTML = `
            <img src="../icon/whatsapp.png" alt="WhatsApp" />
            <div class="floating-pulse"></div>
        `;
    floatingBtn.style.cssText = `
            position: fixed;
            bottom: 30px;
            right: 30px;
            width: 60px;
            height: 60px;
            background: linear-gradient(135deg, #25D366, #128C7E);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            z-index: 1000;
            box-shadow: 0 4px 20px rgba(37, 211, 102, 0.3);
            transition: all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
            animation: float 3s ease-in-out infinite;
        `;

    const img = floatingBtn.querySelector("img");
    img.style.cssText = `
            width: 35px;
            height: 35px;
            filter: brightness(0) invert(1);
        `;

    document.body.appendChild(floatingBtn);

    floatingBtn.addEventListener("mouseenter", () => {
      floatingBtn.style.transform = "scale(1.2) rotate(10deg)";
      floatingBtn.style.boxShadow = "0 8px 30px rgba(37, 211, 102, 0.5)";
    });

    floatingBtn.addEventListener("mouseleave", () => {
      floatingBtn.style.transform = "scale(1) rotate(0deg)";
      floatingBtn.style.boxShadow = "0 4px 20px rgba(37, 211, 102, 0.3)";
    });

    floatingBtn.addEventListener("click", () => {
      window.open("https://wa.me/50684011214", "_blank");
    });
  }

  function injectDynamicStyles() {
    const style = document.createElement("style");
    style.textContent = `
            
            @keyframes wsp-pulse {
                0% { transform: translate(-50%, -50%) scale(0.8); opacity: 0.8; }
                50% { transform: translate(-50%, -50%) scale(1.2); opacity: 0.4; }
                100% { transform: translate(-50%, -50%) scale(1.6); opacity: 0; }
            }
            
            @keyframes wsp-ripple-effect {
                to { transform: scale(4); opacity: 0; }
            }
            
            @keyframes social-wave {
                to { transform: translate(-50%, -50%) scale(2); opacity: 0; }
            }
            
            @keyframes float {
                0%, 100% { transform: translateY(0px); }
                50% { transform: translateY(-10px); }
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
            
            .btn-wsp {
                position: relative;
                overflow: hidden;
                transition: all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
            }
            
            .redes-icons a {
                position: relative;
                display: inline-block;
                margin: 0 15px;
            }
            
            #redes {
                position: relative;
            }
            
            .magic-letter:hover {
                transform: scale(1.2) !important;
                color: #4caf50 !important;
                text-shadow: 0 0 20px rgba(76, 175, 80, 0.8) !important;
            }
            
            .floating-pulse {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.3);
                animation: wsp-pulse 2s infinite;
            }
            
            
            @media (max-width: 768px) {
                .floating-whatsapp {
                    bottom: 20px !important;
                    right: 20px !important;
                    width: 50px !important;
                    height: 50px !important;
                }
                
                .interactive-cursor,
                .interactive-cursor + div {
                    display: none !important;
                }
            }
        `;
    document.head.appendChild(style);
  }

  function initAllEffects() {
    injectDynamicStyles();

    initParallaxHeader();
    initMagicalWhatsAppButton();
    initSocialNetworksAnimation();
    initMagicalTitle();
    initInteractiveCursor();
    initDynamicHeader();
    initFloatingWhatsApp();

    document.body.style.paddingTop = "80px";

    document.body.style.opacity = "0";
    document.body.style.transform = "translateY(30px)";

    setTimeout(() => {
      document.body.style.transition =
        "all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)";
      document.body.style.opacity = "1";
      document.body.style.transform = "translateY(0)";
    }, 100);
  }

  initAllEffects();

  console.log("🎉 ¡Efectos mágicos de contacto Jaboné activados! 📱✨");
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
        opacity: 0.3;
    `;
  document.body.appendChild(canvas);

  const ctx = canvas.getContext("2d");
  const particles = [];

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  function createParticle() {
    return {
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      size: Math.random() * 3 + 1,
      opacity: Math.random() * 0.5 + 0.2,
    };
  }

  function initParticles() {
    for (let i = 0; i < 50; i++) {
      particles.push(createParticle());
    }
  }

  function updateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach((particle) => {
      particle.x += particle.vx;
      particle.y += particle.vy;

      if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
      if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;

      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(76, 175, 80, ${particle.opacity})`;
      ctx.fill();
    });

    requestAnimationFrame(updateParticles);
  }

  window.addEventListener("resize", resizeCanvas);
  resizeCanvas();
  initParticles();
  updateParticles();
})();
