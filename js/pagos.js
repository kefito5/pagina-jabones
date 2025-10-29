  
        
        const abrirModalBtn = document.getElementById('abrirModal');
        const modalOverlay = document.getElementById('modalOverlay');
        const cerrarModalBtn = document.getElementById('cerrarModal');
        const salirModalBtn = document.getElementById('salirModal');
        const modalContent = document.getElementById('modalContent');

        
        function abrirModal() {
            modalOverlay.classList.add('active');
            document.body.style.overflow = 'hidden'; 
            
            
            const secciones = document.querySelectorAll('.faq-section');
            secciones.forEach((seccion, index) => {
                seccion.style.animation = 'none';
                setTimeout(() => {
                    seccion.style.animation = `fadeInUp 0.8s ease-out forwards ${index * 0.2}s`;
                }, 100);
            });
        }

        function cerrarModal() {
            modalOverlay.classList.remove('active');
            document.body.style.overflow = 'auto'; 
        }

        
        abrirModalBtn.addEventListener('click', abrirModal);
        cerrarModalBtn.addEventListener('click', cerrarModal);
        salirModalBtn.addEventListener('click', function(e) {
            e.preventDefault();
            cerrarModal();
        });

        
        modalOverlay.addEventListener('click', function(e) {
            if (e.target === modalOverlay) {
                cerrarModal();
            }
        });

        
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
                cerrarModal();
            }
        });

        
        modalContent.addEventListener('click', function(e) {
            e.stopPropagation();
        });

        
        document.querySelectorAll('.faq-item').forEach(item => {
            item.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-3px) scale(1.01)';
            });
            
            item.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
            });
        });

        
        function smoothScrollModal() {
            if (modalContent.scrollHeight > modalContent.clientHeight) {
                modalContent.style.scrollBehavior = 'smooth';
            }
        }

        
        modalOverlay.addEventListener('transitionend', function() {
            if (this.classList.contains('active')) {
                smoothScrollModal();
            }
        });
