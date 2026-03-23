const blockedDomains = [
    "*://*.doubleclick.net/*",
    "*://*.googleadservices.com/*",
    "*://*.googlesyndication.com/*",
    "*://*.moatads.com/*",
    "*://brazino777.bet.br/*",
    "*://googleads.g.doubleclick.net/*",
    "*://rr1---sn-qpo5hpj5uxaxjvhcg-8pms.googlevideo.com/*"

];

browser.webRequest.onBeforeRequest.addListener(
    function (details) {
        console.log("Bloqueando requisição de rede: ", details.url);
        return { cancel: true };
    },
    { urls: blockedDomains },
    ["blocking"]
);
