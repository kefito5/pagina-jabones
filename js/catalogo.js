document.addEventListener("DOMContentLoaded", function () {
  const config = {
    animationDuration: 800,
    staggerDelay: 200,
    hoverScale: 1.1,
    particleCount: 15,
  };

  class ParticleSystem {
    constructor(container) {
      this.container = container;
      this.particles = [];
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
                width: ${Math.random() * 6 + 2}px;
                height: ${Math.random() * 6 + 2}px;
                background: rgba(76, 175, 80, ${Math.random() * 0.7 + 0.3});
                border-radius: 50%;
                pointer-events: none;
                z-index: 1;
            `;

      this.resetParticle(particle);
      this.container.appendChild(particle);
      this.particles.push(particle);
      this.animateParticle(particle);
    }

    resetParticle(particle) {
      particle.style.left = Math.random() * 100 + "%";
      particle.style.top = "110%";
      particle.style.opacity = Math.random() * 0.7 + 0.3;
    }

    animateParticle(particle) {
      const duration = Math.random() * 3000 + 2000;
      const startTime = Date.now();

      const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = elapsed / duration;

        if (progress < 1) {
          const y = 110 - progress * 120;
          const x =
            parseFloat(particle.style.left) +
            Math.sin(progress * Math.PI * 2) * 0.5;

          particle.style.top = y + "%";
          particle.style.left = x + "%";
          particle.style.opacity = Math.sin(progress * Math.PI) * 0.7;

          requestAnimationFrame(animate);
        } else {
          this.resetParticle(particle);
          this.animateParticle(particle);
        }
      };

      requestAnimationFrame(animate);
    }
  }

  function initCategoryMorphing() {
    const categorias = document.querySelectorAll(".categoria");

    categorias.forEach((categoria, index) => {
      categoria.style.transform = "scale(0.8) translateY(50px)";
      categoria.style.opacity = "0";
      categoria.style.transition = "all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)";

      setTimeout(() => {
        categoria.style.transform = "scale(1) translateY(0)";
        categoria.style.opacity = "1";
      }, index * config.staggerDelay);

      categoria.addEventListener("mouseenter", function () {
        this.style.transform = "scale(1.1) translateY(-10px) rotateY(5deg)";
        this.style.boxShadow = "0 20px 40px rgba(0, 0, 0, 0.2)";
        this.style.zIndex = "10";

        const img = this.querySelector("img");
        if (img) {
          img.style.transform = "scale(1.1) rotate(2deg)";
          img.style.filter = "brightness(1.1) contrast(1.1) saturate(1.2)";
        }

        const btn = this.querySelector(".btn-categoria");
        if (btn) {
          btn.style.transform = "scale(1.05)";
          btn.style.background = "linear-gradient(45deg, #4caf50, #66bb6a)";
          btn.style.boxShadow = "0 10px 20px rgba(76, 175, 80, 0.3)";
        }

        createRippleEffect(this);
      });

      categoria.addEventListener("mouseleave", function () {
        this.style.transform = "scale(1) translateY(0) rotateY(0deg)";
        this.style.boxShadow = "0 5px 15px rgba(0, 0, 0, 0.1)";
        this.style.zIndex = "1";

        const img = this.querySelector("img");
        if (img) {
          img.style.transform = "scale(1) rotate(0deg)";
          img.style.filter = "brightness(1) contrast(1) saturate(1)";
        }

        const btn = this.querySelector(".btn-categoria");
        if (btn) {
          btn.style.transform = "scale(1)";
          btn.style.background = "";
          btn.style.boxShadow = "";
        }
      });
    });
  }

  function createRippleEffect(element) {
    const ripple = document.createElement("div");
    ripple.className = "ripple-effect";
    ripple.style.cssText = `
            position: absolute;
            border-radius: 50%;
            background: radial-gradient(circle, rgba(76, 175, 80, 0.3), transparent);
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

    element.appendChild(ripple);

    setTimeout(() => {
      ripple.remove();
    }, 600);
  }

  function initInteractiveTips() {
    const tipsContainer = document.getElementById("tips-tipo-piel");
    const tipItems = tipsContainer.querySelectorAll("li");

    const floatingBtn = document.createElement("div");
    floatingBtn.id = "floating-tips-btn";
    floatingBtn.innerHTML = `
            <div class="btn-content">
                <span class="icon">💡</span>
                <span class="text">Tips</span>
            </div>
        `;
    floatingBtn.style.cssText = `
            position: fixed;
            bottom: 30px;
            right: 30px;
            width: 80px;
            height: 80px;
            background: linear-gradient(45deg, #4caf50, #66bb6a);
            border-radius: 50%;
            cursor: pointer;
            z-index: 1000;
            box-shadow: 0 10px 30px rgba(76, 175, 80, 0.3);
            transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-weight: bold;
            animation: float 3s ease-in-out infinite;
        `;

    document.body.appendChild(floatingBtn);

    tipsContainer.style.cssText = `
            position: fixed;
            bottom: 120px;
            right: 30px;
            background: white;
            border-radius: 15px;
            padding: 20px;
            box-shadow: 0 15px 40px rgba(0, 0, 0, 0.1);
            max-width: 350px;
            z-index: 999;
            transform: scale(0) translateY(20px);
            opacity: 0;
            transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
            border: 2px solid #4caf50;
        `;

    let tipsVisible = false;

    floatingBtn.addEventListener("click", function () {
      tipsVisible = !tipsVisible;

      if (tipsVisible) {
        tipsContainer.style.transform = "scale(1) translateY(0)";
        tipsContainer.style.opacity = "1";
        floatingBtn.style.transform = "scale(1.1) rotate(180deg)";
        floatingBtn.style.background =
          "linear-gradient(45deg, #ff9800, #ffc107)";

        tipItems.forEach((tip, index) => {
          tip.style.transform = "translateX(-20px)";
          tip.style.opacity = "0";
          setTimeout(() => {
            tip.style.transform = "translateX(0)";
            tip.style.opacity = "1";
            tip.style.transition = "all 0.3s ease-out";
          }, index * 100);
        });
      } else {
        tipsContainer.style.transform = "scale(0) translateY(20px)";
        tipsContainer.style.opacity = "0";
        floatingBtn.style.transform = "scale(1) rotate(0deg)";
        floatingBtn.style.background =
          "linear-gradient(45deg, #4caf50, #66bb6a)";
      }
    });

    floatingBtn.addEventListener("mouseenter", function () {
      this.style.transform = "scale(1.2)";
      this.style.boxShadow = "0 15px 40px rgba(76, 175, 80, 0.4)";
    });

    floatingBtn.addEventListener("mouseleave", function () {
      this.style.transform = tipsVisible
        ? "scale(1.1) rotate(180deg)"
        : "scale(1) rotate(0deg)";
      this.style.boxShadow = "0 10px 30px rgba(76, 175, 80, 0.3)";
    });
  }

  function initCustomCursor() {
    const cursor = document.createElement("div");
    cursor.className = "custom-cursor";
    cursor.style.cssText = `
            position: fixed;
            width: 30px;
            height: 30px;
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
            width: 8px;
            height: 8px;
            background: #4caf50;
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            transition: all 0.2s ease-out;
        `;
    document.body.appendChild(cursorTrail);

    document.addEventListener("mousemove", (e) => {
      cursor.style.left = e.clientX - 15 + "px";
      cursor.style.top = e.clientY - 15 + "px";
      cursorTrail.style.left = e.clientX - 4 + "px";
      cursorTrail.style.top = e.clientY - 4 + "px";
    });

    document
      .querySelectorAll(".categoria, .btn-categoria")
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

  function initParallaxScroll() {
    const header = document.querySelector("header");
    const categorias = document.querySelector("#categorias-piel");

    window.addEventListener("scroll", () => {
      const scrolled = window.pageYOffset;
      const rate = scrolled * -0.5;

      if (categorias) {
        categorias.style.transform = `translateY(${rate}px)`;
      }

      if (scrolled > 50) {
        header.style.background = "rgba(255, 255, 255, 0.95)";
        header.style.backdropFilter = "blur(10px)";
        header.style.boxShadow = "0 2px 20px rgba(0, 0, 0, 0.1)";
      } else {
        header.style.background = "transparent";
        header.style.backdropFilter = "none";
        header.style.boxShadow = "none";
      }
    });
  }

  function initTypingEffect() {
    const title = document.querySelector("#categorias-piel h2");
    if (title) {
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
      }, 80);
    }
  }

  function initSkinTypeQuiz() {
    const quizBtn = document.createElement("button");
    quizBtn.textContent = "🔍 Test de Tipo de Piel";
    quizBtn.style.cssText = `
            position: fixed;
            bottom: 30px;
            left: 30px;
            padding: 15px 25px;
            background: linear-gradient(45deg, #ff9800, #ffc107);
            color: white;
            border: none;
            border-radius: 25px;
            font-weight: bold;
            cursor: pointer;
            z-index: 1000;
            box-shadow: 0 10px 30px rgba(255, 152, 0, 0.3);
            transition: all 0.3s ease-out;
            animation: pulse 2s infinite;
        `;

    document.body.appendChild(quizBtn);

    quizBtn.addEventListener("click", () => {
      showSkinTypeQuiz();
    });

    quizBtn.addEventListener("mouseenter", function () {
      this.style.transform = "scale(1.1) translateY(-5px)";
      this.style.boxShadow = "0 15px 40px rgba(255, 152, 0, 0.4)";
    });

    quizBtn.addEventListener("mouseleave", function () {
      this.style.transform = "scale(1) translateY(0)";
      this.style.boxShadow = "0 10px 30px rgba(255, 152, 0, 0.3)";
    });
  }

  function showSkinTypeQuiz() {
    const quiz = document.createElement("div");
    quiz.innerHTML = `
            <div class="quiz-overlay">
                <div class="quiz-content">
                    <h3>🔍 Descubre tu tipo de piel</h3>
                    <div class="quiz-question">
                        <p>¿Cómo se siente tu piel después de lavarla?</p>
                        <button class="quiz-option" data-type="seca">Tirante y seca</button>
                        <button class="quiz-option" data-type="grasa">Brillante y oleosa</button>
                        <button class="quiz-option" data-type="mixta">Seca en mejillas, grasa en T</button>
                    </div>
                    <button class="quiz-close">✕</button>
                </div>
            </div>
        `;

    quiz.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.8);
            z-index: 10000;
            display: flex;
            align-items: center;
            justify-content: center;
        `;

    document.body.appendChild(quiz);

    quiz.querySelectorAll(".quiz-option").forEach((option) => {
      option.addEventListener("click", function () {
        const type = this.dataset.type;
        showSkinTypeResult(type);
        quiz.remove();
      });
    });

    quiz.querySelector(".quiz-close").addEventListener("click", () => {
      quiz.remove();
    });
  }

  function showSkinTypeResult(type) {
    const result = document.createElement("div");
    const recommendations = {
      grasa: "pielgrasa.html",
      seca: "pielseca.html",
      mixta: "pielmixta.html",
    };

    result.innerHTML = `
            <div class="result-overlay">
                <div class="result-content">
                    <h3>🎉 Tu tipo de piel es: <strong>${type.toUpperCase()}</strong></h3>
                    <p>Te recomendamos nuestros productos especializados</p>
                    <a href="${
                      recommendations[type]
                    }" class="result-btn">Ver productos recomendados</a>
                    <button class="result-close">Cerrar</button>
                </div>
            </div>
        `;

    result.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(76, 175, 80, 0.9);
            z-index: 10000;
            display: flex;
            align-items: center;
            justify-content: center;
        `;

    document.body.appendChild(result);

    result.querySelector(".result-close").addEventListener("click", () => {
      result.remove();
    });
  }

  function initAllEffects() {
    const styles = document.createElement("style");
    styles.textContent = `
            @keyframes ripple-animation {
                to { transform: scale(4); opacity: 0; }
            }
            
            @keyframes float {
                0%, 100% { transform: translateY(0px); }
                50% { transform: translateY(-10px); }
            }
            
            @keyframes pulse {
                0%, 100% { transform: scale(1); }
                50% { transform: scale(1.05); }
            }
            
            .categoria {
                position: relative;
                overflow: hidden;
                transition: all 0.3s ease-out;
            }
            
            .categoria img {
                transition: all 0.3s ease-out;
            }
            
            .btn-categoria {
                transition: all 0.3s ease-out;
            }
            
            header {
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                z-index: 1000;
                transition: all 0.3s ease-out;
            }
            
            body {
                padding-top: 80px;
                overflow-x: hidden;
            }
            
            .quiz-content, .result-content {
                background: white;
                padding: 30px;
                border-radius: 15px;
                text-align: center;
                max-width: 400px;
                position: relative;
                animation: slideInUp 0.5s ease-out;
            }
            
            .quiz-option, .result-btn {
                display: block;
                width: 100%;
                padding: 15px;
                margin: 10px 0;
                border: none;
                border-radius: 8px;
                background: #f0f0f0;
                cursor: pointer;
                transition: all 0.3s ease-out;
                text-decoration: none;
                color: #333;
            }
            
            .quiz-option:hover, .result-btn:hover {
                background: #4caf50;
                color: white;
                transform: translateY(-2px);
            }
            
            .quiz-close, .result-close {
                position: absolute;
                top: 10px;
                right: 15px;
                background: none;
                border: none;
                font-size: 20px;
                cursor: pointer;
                color: #666;
            }
            
            @keyframes slideInUp {
                from { transform: translateY(30px); opacity: 0; }
                to { transform: translateY(0); opacity: 1; }
            }
            
            .floating-particle {
                animation: particleFloat 3s linear infinite;
            }
            
            @keyframes particleFloat {
                0% { transform: translateY(0) rotate(0deg); opacity: 0; }
                50% { opacity: 1; }
                100% { transform: translateY(-100vh) rotate(360deg); opacity: 0; }
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

    initCategoryMorphing();
    initInteractiveTips();
    initCustomCursor();
    initParallaxScroll();
    initTypingEffect();
    initSkinTypeQuiz();

    console.log("🎨 ¡Catálogo interactivo de Jaboné activado! ✨");
  }

  initAllEffects();
});
