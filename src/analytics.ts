export const initGA = () => {
  const script = document.createElement("script");
  script.src = "https://www.googletagmanager.com/gtag/js?id=G-Z6L6K3KFQ1";
  script.async = true;
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];
  function gtag(...args: any[]) {
    window.dataLayer.push(args);
  }

  // @ts-ignore
  window.gtag = gtag;

  gtag("js", new Date());
  gtag("config", "G-Z6L6K3KFQ1");
};

export const initClarity = () => {
  (function (c, l, a, r, i, t, y) {
    c[a] = c[a] || function () {
      (c[a].q = c[a].q || []).push(arguments);
    };

    t = l.createElement(r);
    t.async = 1;
    t.src = "https://www.clarity.ms/tag/" + i;

    y = l.getElementsByTagName(r)[0];
    y.parentNode.insertBefore(t, y);
  })(window, document, "clarity", "script", "wr31s78ld8");
};