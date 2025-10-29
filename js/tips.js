document.addEventListener("DOMContentLoaded", function () {
  const animationConfig = {
    duration: 800,
    easing: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
    staggerDelay: 150,
    naturalEasing: "cubic-bezier(0.4, 0, 0.2, 1)",
    bounceEasing: "cubic-bezier(0.68, -0.55, 0.265, 1.55)",
    organicEasing: "cubic-bezier(0.23, 1, 0.32, 1)",
  };

  function initOrganicTitle() {
    const title = document.querySelector("#intro-tips h1");
    if (!title) return;

    const text = title.textContent;
    title.innerHTML = "";
    title.style.position = "relative";
    title.style.overflow = "visible";

    const natureContainer = document.createElement("div");
    natureContainer.className = "nature-effects";
    natureContainer.style.cssText = `
            position: absolute;
            top: -30px;
            left: -30px;
            width: calc(100% + 60px);
            height: calc(100% + 60px);
            pointer-events: none;
            overflow: visible;
        `;
    title.appendChild(natureContainer);

    for (let i = 0; i < 8; i++) {
      const leaf = document.createElement("div");
      leaf.className = "floating-leaf";
      leaf.style.cssText = `
                position: absolute;
                width: ${8 + Math.random() * 6}px;
                height: ${12 + Math.random() * 8}px;
                background: linear-gradient(45deg, 
                    rgba(34, 197, 94, 0.3), 
                    rgba(22, 163, 74, 0.2));
                border-radius: 50% 10% 50% 10%;
                top: ${Math.random() * 100}%;
                left: ${Math.random() * 100}%;
                animation: organic-float ${
                  4 + Math.random() * 3
                }s ease-in-out infinite;
                animation-delay: ${i * 0.5}s;
                opacity: 0;
                transform: rotate(${Math.random() * 360}deg);
            `;
      natureContainer.appendChild(leaf);
    }

    const words = text.split(" ");
    words.forEach((word, wordIndex) => {
      const wordSpan = document.createElement("span");
      wordSpan.className = "word-organic";
      wordSpan.style.cssText = `
                display: inline-block;
                margin-right: 0.5em;
                position: relative;
            `;

      word.split("").forEach((char, charIndex) => {
        const span = document.createElement("span");
        span.textContent = char;
        span.className = "organic-letter";
        span.style.cssText = `
                    display: inline-block;
                    opacity: 0;
                    transform: translateY(50px) rotate(${
                      Math.random() * 20 - 10
                    }deg);
                    transition: all 0.8s ${animationConfig.organicEasing};
                    color: #166534;
                    position: relative;
                `;

        const growthEffect = document.createElement("div");
        growthEffect.className = "growth-effect";
        growthEffect.style.cssText = `
                    position: absolute;
                    bottom: -5px;
                    left: 50%;
                    width: 2px;
                    height: 0;
                    background: linear-gradient(to top, 
                        rgba(34, 197, 94, 0.6), 
                        rgba(22, 163, 74, 0.3));
                    transform: translateX(-50%);
                    transition: height 0.6s ease;
                `;
        span.appendChild(growthEffect);

        wordSpan.appendChild(span);
      });

      title.appendChild(wordSpan);
    });

    const letters = title.querySelectorAll(".organic-letter");
    letters.forEach((letter, index) => {
      setTimeout(() => {
        letter.style.opacity = "1";
        letter.style.transform = "translateY(0) rotate(0deg)";

        const growth = letter.querySelector(".growth-effect");
        setTimeout(() => {
          growth.style.height = "15px";
          setTimeout(() => {
            growth.style.height = "0";
          }, 1000);
        }, 200);
      }, index * 80);
    });

    setTimeout(() => {
      const leaves = natureContainer.querySelectorAll(".floating-leaf");
      leaves.forEach((leaf) => {
        leaf.style.opacity = "0.6";
      });
    }, 1000);
  }

  function initEducationalTips() {
    const tips = document.querySelectorAll(".tip");
    if (!tips.length) return;

    tips.forEach((tip, index) => {
      tip.style.opacity = "0";
      tip.style.transform = "translateY(80px) scale(0.95)";
      tip.style.transition = `all 0.8s ${animationConfig.naturalEasing}`;
      tip.style.position = "relative";
      tip.style.borderRadius = "20px";
      tip.style.background = "linear-gradient(135deg, #ffffff, #f0fdf4)";
      tip.style.boxShadow = "0 10px 30px rgba(22, 163, 74, 0.1)";
      tip.style.padding = "30px";
      tip.style.overflow = "hidden";
      tip.style.border = "2px solid rgba(34, 197, 94, 0.1)";

      const knowledgeGlow = document.createElement("div");
      knowledgeGlow.className = "knowledge-glow";
      knowledgeGlow.style.cssText = `
                position: absolute;
                top: -50%;
                left: -50%;
                width: 200%;
                height: 200%;
                background: radial-gradient(circle, 
                    rgba(34, 197, 94, 0.05) 0%, 
                    transparent 70%);
                opacity: 0;
                transition: opacity 0.6s ease;
                pointer-events: none;
            `;
      tip.appendChild(knowledgeGlow);

      const wisdomParticles = document.createElement("div");
      wisdomParticles.className = "wisdom-particles";
      wisdomParticles.style.cssText = `
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                pointer-events: none;
                overflow: hidden;
            `;
      tip.appendChild(wisdomParticles);

      for (let i = 0; i < 6; i++) {
        const particle = document.createElement("div");
        particle.className = "wisdom-particle";
        particle.style.cssText = `
                    position: absolute;
                    width: ${3 + Math.random() * 4}px;
                    height: ${3 + Math.random() * 4}px;
                    background: radial-gradient(circle, 
                        rgba(34, 197, 94, 0.4), 
                        rgba(22, 163, 74, 0.2));
                    border-radius: 50%;
                    left: ${Math.random() * 100}%;
                    top: ${Math.random() * 100}%;
                    animation: wisdom-float ${
                      5 + Math.random() * 3
                    }s ease-in-out infinite;
                    animation-delay: ${i * 0.8}s;
                    opacity: 0;
                `;
        wisdomParticles.appendChild(particle);
      }

      const animatedBorder = document.createElement("div");
      animatedBorder.className = "animated-border";
      animatedBorder.style.cssText = `
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                border: 2px solid transparent;
                border-radius: 20px;
                background: linear-gradient(45deg, 
                    rgba(34, 197, 94, 0.3), 
                    rgba(22, 163, 74, 0.2), 
                    rgba(34, 197, 94, 0.3));
                background-size: 200% 200%;
                animation: border-flow 3s ease-in-out infinite;
                opacity: 0;
                pointer-events: none;
            `;
      tip.appendChild(animatedBorder);

      const tipTitle = tip.querySelector("h3");
      if (tipTitle) {
        tipTitle.style.cssText = `
                    color: #166534;
                    font-size: 1.4em;
                    margin-bottom: 15px;
                    position: relative;
                    z-index: 2;
                `;

        const icon = document.createElement("div");
        icon.className = "tip-icon";
        icon.style.cssText = `
                    position: absolute;
                    top: -10px;
                    right: -10px;
                    width: 25px;
                    height: 25px;
                    background: linear-gradient(45deg, #22c55e, #16a34a);
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 12px;
                    color: white;
                    font-weight: bold;
                    opacity: 0;
                    transform: scale(0) rotate(180deg);
                    transition: all 0.5s ${animationConfig.bounceEasing};
                `;
        icon.textContent = "💡";
        tipTitle.appendChild(icon);
      }

      const tipText = tip.querySelector("p");
      if (tipText) {
        tipText.style.cssText = `
                    color: #374151;
                    line-height: 1.6;
                    position: relative;
                    z-index: 2;
                `;
      }

      tip.addEventListener("mouseenter", function () {
        this.style.transform = "translateY(-10px) scale(1.02)";
        this.style.boxShadow = "0 20px 40px rgba(22, 163, 74, 0.2)";
        knowledgeGlow.style.opacity = "1";
        animatedBorder.style.opacity = "1";

        const particles = this.querySelectorAll(".wisdom-particle");
        particles.forEach((particle) => {
          particle.style.opacity = "1";
        });

        const icon = this.querySelector(".tip-icon");
        if (icon) {
          icon.style.opacity = "1";
          icon.style.transform = "scale(1) rotate(0deg)";
        }
      });

      tip.addEventListener("mouseleave", function () {
        this.style.transform = "translateY(0) scale(1)";
        this.style.boxShadow = "0 10px 30px rgba(22, 163, 74, 0.1)";
        knowledgeGlow.style.opacity = "0";
        animatedBorder.style.opacity = "0";

        const particles = this.querySelectorAll(".wisdom-particle");
        particles.forEach((particle) => {
          particle.style.opacity = "0";
        });

        const icon = this.querySelector(".tip-icon");
        if (icon) {
          icon.style.opacity = "0";
          icon.style.transform = "scale(0) rotate(180deg)";
        }
      });
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Array.from(tips).indexOf(entry.target);
            setTimeout(() => {
              entry.target.style.opacity = "1";
              entry.target.style.transform = "translateY(0) scale(1)";
            }, index * 200);
          }
        });
      },
      { threshold: 0.1 }
    );

    tips.forEach((tip) => observer.observe(tip));
  }

  function initCTAButton() {
    const ctaButton = document.querySelector(".btn-catalogo");
    if (!ctaButton) return;

    ctaButton.style.cssText = `
            display: inline-block;
            padding: 18px 40px;
            background: linear-gradient(135deg, #22c55e, #16a34a);
            color: white;
            text-decoration: none;
            border-radius: 50px;
            font-weight: bold;
            font-size: 1.1em;
            position: relative;
            overflow: hidden;
            transition: all 0.4s ease;
            box-shadow: 0 8px 25px rgba(34, 197, 94, 0.3);
            text-transform: uppercase;
            letter-spacing: 1px;
        `;

    const wave = document.createElement("div");
    wave.className = "cta-wave";
    wave.style.cssText = `
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, 
                transparent, 
                rgba(255, 255, 255, 0.2), 
                transparent);
            transition: left 0.8s ease;
        `;
    ctaButton.appendChild(wave);

    const pulse = document.createElement("div");
    pulse.className = "cta-pulse";
    pulse.style.cssText = `
            position: absolute;
            top: 50%;
            left: 50%;
            width: 0;
            height: 0;
            background: rgba(255, 255, 255, 0.1);
            border-radius: 50%;
            transform: translate(-50%, -50%);
            opacity: 0;
            transition: all 0.6s ease;
        `;
    ctaButton.appendChild(pulse);

    ctaButton.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-5px) scale(1.05)";
      this.style.boxShadow = "0 15px 40px rgba(34, 197, 94, 0.4)";
      wave.style.left = "100%";

      pulse.style.width = "200px";
      pulse.style.height = "200px";
      pulse.style.opacity = "1";
    });

    ctaButton.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0) scale(1)";
      this.style.boxShadow = "0 8px 25px rgba(34, 197, 94, 0.3)";
      wave.style.left = "-100%";

      pulse.style.width = "0";
      pulse.style.height = "0";
      pulse.style.opacity = "0";
    });
  }

  function initNaturalHeader() {
    const header = document.querySelector("header");
    if (!header) return;

    header.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            z-index: 1000;
            background: rgba(255, 255, 255, 0.95);
            backdrop-filter: blur(10px);
            border-bottom: 1px solid rgba(34, 197, 94, 0.1);
            transition: all 0.4s ease;
        `;

    const naturalLine = document.createElement("div");
    naturalLine.className = "natural-line";
    naturalLine.style.cssText = `
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            height: 2px;
            background: linear-gradient(90deg, 
                transparent, 
                #22c55e, 
                #16a34a, 
                #22c55e, 
                transparent);
            transform: scaleX(0);
            transition: transform 0.6s ease;
        `;
    header.appendChild(naturalLine);

    window.addEventListener("scroll", () => {
      const scrollY = window.scrollY;

      if (scrollY > 50) {
        header.style.background = "rgba(255, 255, 255, 0.98)";
        header.style.boxShadow = "0 4px 20px rgba(34, 197, 94, 0.1)";
        naturalLine.style.transform = "scaleX(1)";
      } else {
        header.style.background = "rgba(255, 255, 255, 0.95)";
        header.style.boxShadow = "none";
        naturalLine.style.transform = "scaleX(0)";
      }
    });
  }

  function injectNaturalStyles() {
    const style = document.createElement("style");
    style.textContent = `
            
            @keyframes organic-float {
                0%, 100% { transform: translateY(0) rotate(0deg); }
                25% { transform: translateY(-10px) rotate(5deg); }
                50% { transform: translateY(-5px) rotate(-3deg); }
                75% { transform: translateY(-15px) rotate(8deg); }
            }
            
            @keyframes wisdom-float {
                0%, 100% { transform: translateY(0) translateX(0); }
                33% { transform: translateY(-12px) translateX(8px); }
                66% { transform: translateY(-8px) translateX(-5px); }
            }
            
            @keyframes border-flow {
                0% { background-position: 0% 0%; }
                50% { background-position: 100% 100%; }
                100% { background-position: 0% 0%; }
            }
            
            
            body {
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                background: linear-gradient(180deg, 
                    rgba(240, 253, 244, 0.5) 0%, 
                    rgba(255, 255, 255, 0.9) 100%);
                padding-top: 80px;
                transition: all 0.4s ease;
            }
            
            #intro-tips {
                text-align: center;
                padding: 80px 20px;
                background: linear-gradient(135deg, 
                    rgba(240, 253, 244, 0.6), 
                    rgba(255, 255, 255, 0.8));
                position: relative;
                overflow: hidden;
            }
            
            #intro-tips::before {
                content: '';
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="50" cy="50" r="2" fill="rgba(34,197,94,0.1)"/></svg>') repeat;
                opacity: 0.3;
                animation: organic-float 8s ease-in-out infinite;
            }
            
            #tips-lista {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
                gap: 30px;
                padding: 60px 20px;
                max-width: 1200px;
                margin: 0 auto;
            }
            
            #cta-tips {
                text-align: center;
                padding: 60px 20px;
                background: linear-gradient(135deg, 
                    rgba(240, 253, 244, 0.8), 
                    rgba(255, 255, 255, 0.9));
            }
            
            #cta-tips h2 {
                color: #166534;
                font-size: 2em;
                margin-bottom: 30px;
                position: relative;
            }
            
            .organic-letter:hover {
                transform: translateY(-5px) scale(1.1) rotate(5deg) !important;
                color: #22c55e !important;
                text-shadow: 0 0 15px rgba(34, 197, 94, 0.5) !important;
            }
            
            
            @media (max-width: 768px) {
                #tips-lista {
                    grid-template-columns: 1fr;
                    gap: 20px;
                    padding: 40px 15px;
                }
                
                .tip {  
                    padding: 20px !important;
                }
                
                #intro-tips {
                    padding: 60px 15px;
                }
                
                .floating-leaf {
                    display: none;
                }
                
                body {
                    padding-top: 70px;
                }
            }
        `;
    document.head.appendChild(style);
  }

  function initAllNaturalEffects() {
    injectNaturalStyles();

    initOrganicTitle();
    initEducationalTips();
    initCTAButton();
    initNaturalHeader();

    document.body.style.opacity = "0";
    document.body.style.transform = "translateY(20px)";

    setTimeout(() => {
      document.body.style.transition = "all 1s ease";
      document.body.style.opacity = "1";
      document.body.style.transform = "translateY(0)";
    }, 100);
  }

  initAllNaturalEffects();

  console.log("🌿 ¡Efectos naturales para tips de cuidado activados! 💚✨");
});
