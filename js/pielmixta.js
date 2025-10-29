class PielGrasaManager {
  constructor() {
    this.init()
  }

  init() {
    this.setupScrollAnimations()
    this.setupProductInteractions()
    this.setupLoadingAnimations()
    this.setupPurchaseTracker()
    this.setupImageLazyLoading()
    this.createFloatingElements()
    this.initializeAOS()
  }

  setupScrollAnimations() {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px',
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in')

          if (entry.target.classList.contains('jabon')) {
            const delay = Array.from(entry.target.parentNode.children).indexOf(entry.target) * 150
            entry.target.style.animationDelay = `${delay}ms`
          }
        }
      })
    }, observerOptions)

    document.querySelectorAll('.jabon, #piel-grasa h3').forEach((el) => {
      observer.observe(el)
    })
  }

  setupProductInteractions() {
    const jabones = document.querySelectorAll('.jabon')

    jabones.forEach((jabon, index) => {
      jabon.addEventListener('mouseenter', (e) => {
        this.handleProductHover(e.currentTarget, true)
      })

      jabon.addEventListener('mouseleave', (e) => {
        this.handleProductHover(e.currentTarget, false)
      })

      const img = jabon.querySelector('img')
      if (img) {
        img.addEventListener('click', () => {
          this.createImageModal(img.src, img.alt)
        })
        img.style.cursor = 'pointer'
      }

      const btnComprar = jabon.querySelector('.btn-comprar')
      if (btnComprar) {
        btnComprar.addEventListener('click', (e) => {
          this.handlePurchaseClick(e)
        })
      }
    })
  }

  handleProductHover(element, isEntering) {
    if (isEntering) {
      element.style.transform = 'translateY(-10px) scale(1.02)'
      element.style.boxShadow = '0 20px 40px rgba(0,0,0,0.15)'

      const img = element.querySelector('img')
      if (img) {
        img.style.transform = 'scale(1.1)'
        img.style.filter = 'brightness(1.1) contrast(1.1)'
      }

      const btn = element.querySelector('.btn-comprar')
      if (btn) {
        btn.style.transform = 'scale(1.05)'
        btn.style.boxShadow = '0 5px 15px rgba(74, 144, 226, 0.4)'
      }
    } else {
      element.style.transform = 'translateY(0) scale(1)'
      element.style.boxShadow = '0 5px 15px rgba(0,0,0,0.08)'

      const img = element.querySelector('img')
      if (img) {
        img.style.transform = 'scale(1)'
        img.style.filter = 'brightness(1) contrast(1)'
      }

      const btn = element.querySelector('.btn-comprar')
      if (btn) {
        btn.style.transform = 'scale(1)'
        btn.style.boxShadow = '0 2px 10px rgba(74, 144, 226, 0.2)'
      }
    }
  }

  createImageModal(src, alt) {
    const existingModal = document.querySelector('.image-modal')
    if (existingModal) existingModal.remove()

    const modal = document.createElement('div')
    modal.className = 'image-modal'
    modal.innerHTML = `
            <div class="modal-overlay">
                <div class="modal-content">
                    <img src="${src}" alt="${alt}" class="modal-image">
                    <button class="modal-close">&times;</button>
                    <div class="modal-info">
                        <h4>${alt}</h4>
                    </div>
                </div>
            </div>
        `

    modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.9);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 9999;
            opacity: 0;
            transition: opacity 0.3s ease;
        `

    const modalContent = modal.querySelector('.modal-content')
    modalContent.style.cssText = `
            position: relative;
            max-width: 80vw;
            max-height: 80vh;
            background: white;
            border-radius: 15px;
            overflow: hidden;
            transform: scale(0.8);
            transition: transform 0.3s ease;
        `

    const modalImage = modal.querySelector('.modal-image')
    modalImage.style.cssText = `
            width: 100%;
            height: auto;
            display: block;
        `

    const closeBtn = modal.querySelector('.modal-close')
    closeBtn.style.cssText = `
            position: absolute;
            top: 15px;
            right: 20px;
            background: rgba(255,255,255,0.9);
            border: none;
            width: 40px;
            height: 40px;
            border-radius: 50%;
            font-size: 20px;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.3s ease;
        `

    document.body.appendChild(modal)
    document.body.style.overflow = 'hidden'

    requestAnimationFrame(() => {
      modal.style.opacity = '1'
      modalContent.style.transform = 'scale(1)'
    })

    const closeModal = () => {
      modal.style.opacity = '0'
      modalContent.style.transform = 'scale(0.8)'
      setTimeout(() => {
        document.body.removeChild(modal)
        document.body.style.overflow = ''
      }, 300)
    }

    closeBtn.addEventListener('click', closeModal)
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal()
    })

    const escapeHandler = (e) => {
      if (e.key === 'Escape') {
        closeModal()
        document.removeEventListener('keydown', escapeHandler)
      }
    }
    document.addEventListener('keydown', escapeHandler)
  }

  setupLoadingAnimations() {
    const titulo = document.querySelector('#piel-grasa h3')
    if (titulo) {
      titulo.style.opacity = '0'
      titulo.style.transform = 'translateY(-50px)'
      titulo.style.transition = 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)'

      setTimeout(() => {
        titulo.style.opacity = '1'
        titulo.style.transform = 'translateY(0)'
      }, 300)
    }

    this.typewriterEffect(titulo)
  }

  typewriterEffect(element) {
    if (!element) return

    const text = element.textContent
    element.textContent = ''
    element.style.opacity = '1'

    let i = 0
    const typeInterval = setInterval(() => {
      element.textContent += text[i]
      i++
      if (i >= text.length) {
        clearInterval(typeInterval)
        element.classList.add('typewriter-complete')
      }
    }, 100)
  }

  setupPurchaseTracker() {
    let purchaseAttempts = 0

    document.addEventListener('click', (e) => {
      if (e.target.classList.contains('btn-comprar')) {
        purchaseAttempts++
        console.log(`Intento de compra #${purchaseAttempts}`)

        this.trackEvent('product_click', {
          product_name: e.target.closest('.jabon').querySelector('h4')?.textContent,
          attempt_number: purchaseAttempts,
        })
      }
    })
  }

  handlePurchaseClick(e) {
    e.preventDefault()

    const btn = e.target
    const originalText = btn.textContent
    const originalHref = btn.href

    btn.textContent = 'Conectando...'
    btn.style.background = 'linear-gradient(45deg, #25D366, #128C7E)'
    btn.style.transform = 'scale(0.95)'

    setTimeout(() => {
      btn.textContent = '¡Conectando a WhatsApp!'
      btn.style.background = 'linear-gradient(45deg, #128C7E, #25D366)'

      setTimeout(() => {
        window.open(originalHref, '_blank')
        btn.textContent = originalText
        btn.style.background = ''
        btn.style.transform = 'scale(1)'
      }, 800)
    }, 600)
  }

  trackEvent(eventName, data) {
    console.log('Analytics Event:', eventName, data)
  }

  setupImageLazyLoading() {
    const images = document.querySelectorAll('.jabon img')

    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target

          img.style.filter = 'blur(5px)'
          img.style.transition = 'filter 0.5s ease'

          const tempImg = new Image()
          tempImg.onload = () => {
            img.style.filter = 'blur(0)'
            img.classList.add('loaded')
          }
          tempImg.src = img.src

          imageObserver.unobserve(img)
        }
      })
    })

    images.forEach((img) => imageObserver.observe(img))
  }

  createFloatingElements() {
    const container = document.querySelector('#piel-grasa')
    if (!container) return

    for (let i = 0; i < 5; i++) {
      const bubble = document.createElement('div')
      bubble.className = 'floating-bubble'
      bubble.style.cssText = `
                position: absolute;
                width: ${Math.random() * 60 + 20}px;
                height: ${Math.random() * 60 + 20}px;
                background: linear-gradient(45deg, rgba(74, 144, 226, 0.1), rgba(80, 200, 120, 0.1));
                border-radius: 50%;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                animation: float ${Math.random() * 3 + 2}s ease-in-out infinite alternate;
                pointer-events: none;
                z-index: -1;
            `
      container.style.position = 'relative'
      container.appendChild(bubble)
    }

    if (!document.querySelector('#floating-keyframes')) {
      const style = document.createElement('style')
      style.id = 'floating-keyframes'
      style.textContent = `
                @keyframes float {
                    0% { transform: translateY(0px) rotate(0deg); opacity: 0.7; }
                    100% { transform: translateY(-20px) rotate(180deg); opacity: 0.3; }
                }
            `
      document.head.appendChild(style)
    }
  }

  initializeAOS() {
    if (!document.querySelector('#aos-styles')) {
      const style = document.createElement('style')
      style.id = 'aos-styles'
      style.textContent = `
                .jabon {
                    opacity: 0;
                    transform: translateY(50px) scale(0.9);
                    transition: all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
                }

                .jabon.animate-in {
                    opacity: 1;
                    transform: translateY(0) scale(1);
                }

                .jabon img {
                    transition: all 0.3s ease;
                    border-radius: 12px;
                }

                .jabon:hover img {
                    border-radius: 18px;
                }

                .btn-comprar {
                    transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
                    position: relative;
                    overflow: hidden;
                }

                .btn-comprar::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: -100%;
                    width: 100%;
                    height: 100%;
                    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
                    transition: left 0.5s;
                }

                .btn-comprar:hover::before {
                    left: 100%;
                }
            `
      document.head.appendChild(style)
    }
  }
}

function smoothScrollTo(target) {
  const element = document.querySelector(target)
  if (element) {
    element.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    })
  }
}

function initParallax() {
  window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset
    const parallaxElements = document.querySelectorAll('.jabon img')

    parallaxElements.forEach((element, index) => {
      const speed = 0.5
      const yPos = -(scrolled * speed * 0.1)
      element.style.transform = `translate3d(0, ${yPos}px, 0)`
    })
  })
}

function initCustomCursor() {
  const cursor = document.createElement('div')
  cursor.className = 'custom-cursor'
  cursor.style.cssText = `
        position: fixed;
        width: 20px;
        height: 20px;
        background: rgba(74, 144, 226, 0.8);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        transition: all 0.1s ease;
        opacity: 0;
    `
  document.body.appendChild(cursor)

  document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX - 10 + 'px'
    cursor.style.top = e.clientY - 10 + 'px'
    cursor.style.opacity = '1'
  })

  document.addEventListener('mouseleave', () => {
    cursor.style.opacity = '0'
  })
}

document.addEventListener('DOMContentLoaded', () => {
  new PielGrasaManager()

  initParallax()
  initCustomCursor()

  console.log('🧼 Sistema de Jabones para Piel Grasa iniciado correctamente!')
})

window.addEventListener('error', (e) => {
  console.error('Error en pielgrasa.js:', e.error)
})

if ('performance' in window) {
  window.addEventListener('load', () => {
    const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart
    console.log(`⚡ Página cargada en ${loadTime}ms`)
  })
}
