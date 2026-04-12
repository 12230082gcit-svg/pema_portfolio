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