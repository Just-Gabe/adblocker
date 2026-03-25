// Seletores otimizados e generalizados (muito mais rápido)
const adSelectors = [
    // IDs comuns
    "[id*='ad']",
    "[id*='Ad']",
    "[id*='AD']",
    // Classes comuns
    "[class*='ad']",
    "[class*='Ad']",
    "[class*='AD']",
    "[class*='advertisement']",
    "[class*='advert']",
    "[class*='banner']",
    "[class*='sponsored']",
    // iframes e elementos específicos
    "iframe[src*='ad']",
    "iframe[src*='pagead']"
];

let throttleTimeout = null;
const THROTTLE_DELAY = 1000; // 1 segundo

function removeAds() {
    let removed = 0;
    
    adSelectors.forEach(selector => {
        try {
            const elements = document.querySelectorAll(selector);
            elements.forEach(element => {
                // Verificar se é realmente um ad e não um elemento importante
                if (element && element.offsetHeight > 0) {
                    const style = window.getComputedStyle(element);
                    if (style.display !== 'none') {
                        element.style.display = 'none';
                        removed++;
                    }
                }
            });
        } catch (e) {
            // Alguns seletores podem ser inválidos
        }
    });
}

// Rodar ao carregar a página
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', removeAds);
} else {
    removeAds();
}

// Usar MutationObserver com throttling (mais eficiente que polling)
const observer = new MutationObserver(() => {
    clearTimeout(throttleTimeout);
    throttleTimeout = setTimeout(removeAds, THROTTLE_DELAY);
});

observer.observe(document.body, {
    childList: true,
    subtree: true,
    attributes: true,
    attributeFilter: ['class', 'id', 'style']
});
