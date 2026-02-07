// Função para fazer scroll suave com offset automático
function smoothScrollToElement(element) {
    const header = document.querySelector('.header');
    
    let offset = 0;
    
    // Calcula a altura do header se existir
    if (header) {
        offset += header.offsetHeight;
    }
    
    // Adiciona margem extra para ficar mais bonito
    offset += 20;
    
    const targetPosition = element.offsetTop - offset;
    
    window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
    });
}

// Marca o link ativo baseado na página atual
function setActiveLink() {
    const currentPath = window.location.pathname;
    
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        
        const href = link.getAttribute('href');
        
        // Comparação mais específica
        if (href === currentPath || (href !== '/' && currentPath.startsWith(href))) {
            link.classList.add('active');
        }
    });
}

// Verifica se existe âncora armazenada e faz scroll automático
function checkAndScrollToAnchor() {
    const anchor = sessionStorage.getItem('scrollToAnchor');
    if (anchor) {
        setTimeout(() => {
            const targetElement = document.querySelector(anchor);
            if (targetElement) {
                smoothScrollToElement(targetElement);
                
                // Marca o link como ativo
                document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
                const activeLink = document.querySelector(`a.nav-link[href="${anchor}"]`);
                if (activeLink) activeLink.classList.add('active');
            }
        }, 100);
        
        // Remove a âncora do armazenamento
        sessionStorage.removeItem('scrollToAnchor');
    }
}

// Manipula cliques em todos os links de navegação
document.querySelectorAll('a.nav-link').forEach(link => {
    link.addEventListener('click', function(e) {
        const navType = this.getAttribute('data-nav-type');
        const href = this.getAttribute('href');
        const currentPath = window.location.pathname;
        
        // TIPO: Âncora (#)
        if (navType === 'anchor') {
            e.preventDefault();
            
            const targetElement = document.querySelector(href);
            
            // Se não estiver na home, armazena e vai para home
            if (currentPath !== '/') {
                sessionStorage.setItem('scrollToAnchor', href);
                window.location.href = '/';
            } 
            // Se já está na home, faz scroll direto
            else if (targetElement) {
                smoothScrollToElement(targetElement);
                
                // Marca como ativo
                document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
                this.classList.add('active');
            }
        }
        
        // TIPO: Home
        else if (navType === 'home') {
            // Se já está na home
            if (currentPath === '/') {
                e.preventDefault();
                
                // Faz scroll até o topo
                window.scrollTo({ top: 0, behavior: 'smooth' });
                
                // Marca como ativo
                document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
                this.classList.add('active');
            }
        }
        
        // TIPO: Página (personagem, etc)
        else if (navType === 'page') {
            // Se já está nessa página
            if (currentPath.includes(href.split('/')[1])) {
                e.preventDefault();
                
                // Faz scroll até o topo
                window.scrollTo({ top: 0, behavior: 'smooth' });
                
                // Marca como ativo
                document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
                this.classList.add('active');
            }
        }
    });
});

// Executa quando a página carrega
document.addEventListener('DOMContentLoaded', function() {
    setActiveLink();
    checkAndScrollToAnchor();
});

// Atualiza quando volta para a página anterior (histórico do navegador)
window.addEventListener('pageshow', function() {
    setActiveLink();
});

// Add animation delay to cards
const cards = document.querySelectorAll('.card');
cards.forEach((card, index) => {
    card.style.animationDelay = `${index * 0.1}s`;
});