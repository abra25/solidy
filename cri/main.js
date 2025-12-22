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