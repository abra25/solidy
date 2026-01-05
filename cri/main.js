  const hamburger = document.getElementById("hamburger");
  const navLinks = document.getElementById("nav-links");
  const themeSwitch = document.querySelector(".theme-switch");
  const themeButtons = document.querySelectorAll(".theme-menu button");
  /* Hamburger toggle */
  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navLinks.classList.toggle("active");
  });
  /* Theme dropdown */
  themeSwitch.addEventListener("click", () => {
    themeSwitch.classList.toggle("active");
  });
  /* Theme actions */
  themeButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      document.body.classList.toggle("dark", btn.dataset.theme === "dark");
      themeSwitch.classList.remove("active");
    });
  });
  /* Active link highlight */
  document.querySelectorAll(".nav-link").forEach(link => {
    link.addEventListener("click", () => {
      document.querySelectorAll(".nav-link").forEach(l => l.classList.remove("active"));
      link.classList.add("active");
    });
  });
   /* Auto-update year */
  document.getElementById("year").textContent = new Date().getFullYear();
  /* Footer scroll reveal */
  const footerObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
      }
    });
  }, { threshold: 0.2 });

  document.querySelectorAll(".reveal-footer")
    .forEach(el => footerObserver.observe(el));
  /* Back to top button with progress */
const backToTop = document.getElementById("backToTop");
  const progress = backToTop.querySelector(".progress");

  const circumference = 100;
  progress.style.strokeDasharray = circumference;

  window.addEventListener("scroll", () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = scrollTop / docHeight;

    const offset = circumference - scrollPercent * circumference;
    progress.style.strokeDashoffset = offset;

    // show / hide button
    if (scrollTop > 300) {
      backToTop.classList.add("show");
    } else {
      backToTop.classList.remove("show");
    }
  });

  backToTop.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });

  const pageLoader = document.getElementById("pageLoader");

  // FUNCTION TO SHOW LOADER FOR GIVEN DURATION
  function showLoader(duration = 2000) {
    pageLoader.classList.add("show");
    return new Promise(resolve => setTimeout(resolve, duration));
  }

  // ==== AUTOMATIC LOADER ON PAGE LOAD (NOT HOME) ====
  window.addEventListener("DOMContentLoaded", async () => {
    const isHome = location.pathname.endsWith("index.html") || location.pathname === "/";
    if (!isHome) {
      await showLoader(2000); // show loader for 2 seconds
      pageLoader.classList.remove("show"); // hide after 2s
    }
  });

  // ==== CLICK ON SUBPAGE LINKS ====
  document.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", async e => {
      const href = link.getAttribute("href");

      if (!href || href.startsWith("#") || href.startsWith("http")) return;

      // DETECT HOME LINKS
      const isHomeLink =
        href === "/" ||
        href.endsWith("index.html") ||
        href.includes("/index.html");

      if (isHomeLink) return; // home click → no subpage loader

      // SUBPAGE LOADER
      e.preventDefault();
      await showLoader(2000); // show loader 2s
      window.location.href = href; // navigate after loader
    });
  });