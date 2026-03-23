const adSelectors = [
    ".ad-container",
    ".adsense",
    ".ads-box",
    "[id^='google_ads_']",
    "[class*='banner-ad']",
    ".content-id-TIWovNtAMW4 > div:nth-child(3) > feed-ad-metadata-view-model:nth-child(1) > div:nth-child(2) > div:nth-child(1)"
];

function hideAds() {
    adSelectors.forEach(selector => {
        const elements = document.querySelectorAll(selector);
        elements.forEach(element => {
            if (element.style.display !== 'none') {
                element.style.display = 'none';
                console.log("Ocultando elemento de anúncio (Cosmetic Filtering): ", selector);
            }
        });
    });
}

hideAds();

const observer = new MutationObserver((mutations) => {
    hideAds();
});

if (document.body) {
    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
}
