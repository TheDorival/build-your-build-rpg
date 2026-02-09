/* ==========================================
   PERSONAGENS PAGE - JAVASCRIPT
   ========================================== */

(function() {
    'use strict';

    // ========== Inicialização ==========
    document.addEventListener('DOMContentLoaded', function() {
        initPersonagens();
    });

    function initPersonagens() {
        // Animação escalonada dos cards
        animateCards();
        
        // Sistema de busca/filtro
        setupSearch();
        
        // Interações nos cards
        setupCardInteractions();
        
        // Marca link ativo na navegação
        setActiveNavLink();
        
        // Lazy loading de imagens (se houver)
        setupLazyLoading();
        
        // Atalhos de teclado
        setupKeyboardShortcuts();
    }

    // ========== Animação dos Cards ==========
    function animateCards() {
        const cards = document.querySelectorAll('.personagem');
        
        // Observer para animar cards quando entram na viewport
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        cards.forEach((card, index) => {
            // Define delay inicial
            card.style.opacity = '0';
            card.style.transform = 'translateY(40px)';
            
            // Observa o card
            observer.observe(card);
        });
    }

    // ========== Sistema de Busca ==========
    function setupSearch() {
        const searchInput = document.querySelector('.search-box input');
        
        if (!searchInput) return;

        let searchTimeout;

        searchInput.addEventListener('input', function(e) {
            clearTimeout(searchTimeout);
            
            // Debounce para melhor performance
            searchTimeout = setTimeout(() => {
                filterPersonagens(e.target.value.toLowerCase());
            }, 300);
        });
    }

    function filterPersonagens(searchTerm) {
        const cards = document.querySelectorAll('.personagem');
        let visibleCount = 0;

        cards.forEach(card => {
            const title = card.querySelector('h2').textContent.toLowerCase();
            const description = card.querySelector('p:last-of-type').textContent.toLowerCase();
            
            const matches = title.includes(searchTerm) || description.includes(searchTerm);

            if (matches || searchTerm === '') {
                card.style.display = 'block';
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, visibleCount * 50);
                visibleCount++;
            } else {
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    card.style.display = 'none';
                }, 300);
            }
        });

        // Mostra mensagem se nenhum resultado
        showNoResultsMessage(visibleCount === 0);
    }

    function showNoResultsMessage(show) {
        let noResults = document.querySelector('.no-results-message');
        
        if (show && !noResults) {
            noResults = document.createElement('div');
            noResults.className = 'empty-state no-results-message';
            noResults.innerHTML = `
                <div class="empty-state-icon">🔍</div>
                <h3>Nenhum personagem encontrado</h3>
                <p>Tente buscar com outros termos ou crie um novo personagem.</p>
            `;
            
            const section = document.querySelector('.personagens-section') || document.querySelector('section');
            if (section) {
                section.appendChild(noResults);
            }
        } else if (!show && noResults) {
            noResults.remove();
        }
    }

    // ========== Interações nos Cards ==========
    function setupCardInteractions() {
        const cards = document.querySelectorAll('.personagem');

        cards.forEach(card => {
            // Efeito de movimento do mouse
            card.addEventListener('mousemove', handleCardMouseMove);
            card.addEventListener('mouseleave', handleCardMouseLeave);
            
            // Clique no card inteiro leva ao link
            card.addEventListener('click', function(e) {
                // Não redireciona se clicou em um link
                if (e.target.tagName !== 'A') {
                    const link = this.querySelector('h2 a');
                    if (link) {
                        window.location.href = link.href;
                    }
                }
            });
        });
    }

    function handleCardMouseMove(e) {
        const card = e.currentTarget;
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;

        card.style.transform = `
            translateY(-12px) 
            scale(1.02) 
            perspective(1000px) 
            rotateX(${rotateX}deg) 
            rotateY(${rotateY}deg)
        `;
    }

    function handleCardMouseLeave(e) {
        const card = e.currentTarget;
        card.style.transform = 'translateY(0) scale(1) rotateX(0) rotateY(0)';
    }

    // ========== Navegação Ativa ==========
    function setActiveNavLink() {
        const currentPath = window.location.pathname;
        const navLinks = document.querySelectorAll('.nav-link');

        navLinks.forEach(link => {
            link.classList.remove('active');
            
            const href = link.getAttribute('href');
            
            // Marca como ativo se está na página de personagens
            if (href && currentPath.includes('personagen')) {
                if (href.includes('personagen')) {
                    link.classList.add('active');
                }
            }
        });
    }

    // ========== Lazy Loading de Imagens ==========
    function setupLazyLoading() {
        const images = document.querySelectorAll('img[data-src]');
        
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                        imageObserver.unobserve(img);
                    }
                });
            });

            images.forEach(img => imageObserver.observe(img));
        } else {
            // Fallback para navegadores antigos
            images.forEach(img => {
                img.src = img.dataset.src;
            });
        }
    }

    // ========== Atalhos de Teclado ==========
    function setupKeyboardShortcuts() {
        document.addEventListener('keydown', function(e) {
            // Ctrl/Cmd + K para focar na busca
            if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
                e.preventDefault();
                const searchInput = document.querySelector('.search-box input');
                if (searchInput) {
                    searchInput.focus();
                }
            }

            // ESC para limpar busca
            if (e.key === 'Escape') {
                const searchInput = document.querySelector('.search-box input');
                if (searchInput && searchInput.value) {
                    searchInput.value = '';
                    searchInput.dispatchEvent(new Event('input'));
                    searchInput.blur();
                }
            }
        });
    }

    // ========== Utilitários ==========
    
    // Função para adicionar efeito de ripple nos cards
    function createRipple(event) {
        const card = event.currentTarget;
        const ripple = document.createElement('span');
        const rect = card.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = event.clientX - rect.left - size / 2;
        const y = event.clientY - rect.top - size / 2;

        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple-effect');

        card.appendChild(ripple);

        setTimeout(() => {
            ripple.remove();
        }, 600);
    }

    // Função para formatar datas (se necessário)
    function formatDate(dateString) {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        const date = new Date(dateString);
        return date.toLocaleDateString('pt-BR', options);
    }

    // ========== Exportar funções globais se necessário ==========
    window.PersonagensPage = {
        refresh: animateCards,
        filter: filterPersonagens,
        formatDate: formatDate
    };

})();

// ========== Efeito adicional de partículas (opcional) ==========
function createFloatingParticles() {
    const main = document.querySelector('.main');
    if (!main) return;

    for (let i = 0; i < 5; i++) {
        const particle = document.createElement('div');
        particle.className = 'floating-particle';
        particle.style.cssText = `
            position: absolute;
            width: ${Math.random() * 6 + 2}px;
            height: ${Math.random() * 6 + 2}px;
            background: rgba(255, 107, 53, ${Math.random() * 0.3 + 0.1});
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: floatParticle ${Math.random() * 10 + 10}s infinite ease-in-out;
            pointer-events: none;
            z-index: 1;
        `;
        main.appendChild(particle);
    }
}

// Adiciona CSS para animação de partículas
const particleStyles = document.createElement('style');
particleStyles.textContent = `
    @keyframes floatParticle {
        0%, 100% {
            transform: translate(0, 0) scale(1);
            opacity: 0;
        }
        10% {
            opacity: 1;
        }
        50% {
            transform: translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px) scale(1.5);
            opacity: 0.8;
        }
        90% {
            opacity: 1;
        }
    }

    .ripple-effect {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 107, 53, 0.3);
        animation: rippleAnimation 0.6s ease-out;
        pointer-events: none;
    }

    @keyframes rippleAnimation {
        to {
            transform: scale(2);
            opacity: 0;
        }
    }
`;
document.head.appendChild(particleStyles);

cards.forEach(card => {
    card.addEventListener('click', createRipple);
});

// Inicializa partículas (descomente se quiser usar)
document.addEventListener('DOMContentLoaded', createFloatingParticles);