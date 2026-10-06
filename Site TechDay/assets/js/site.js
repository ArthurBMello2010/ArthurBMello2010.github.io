const menuButton = document.querySelector(".menu-toggle");
const navigation = document.querySelector(".nav-links");
const reflectionButton = document.querySelector("#reflection-button");
const reflectionResult = document.querySelector("#reflection-result");

menuButton?.addEventListener("click", () => {
  const isExpanded = menuButton.getAttribute("aria-expanded") === "true";
  menuButton.setAttribute("aria-expanded", String(!isExpanded));
  menuButton.setAttribute("aria-label", isExpanded ? "Abrir menu" : "Fechar menu");
  navigation?.classList.toggle("is-open", !isExpanded);
  document.body.classList.toggle("menu-open", !isExpanded);
});

navigation?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navigation.classList.remove("is-open");
    document.body.classList.remove("menu-open");
    menuButton?.setAttribute("aria-expanded", "false");
    menuButton?.setAttribute("aria-label", "Abrir menu");
  });
});

const revealElements = document.querySelectorAll(".card, .step, .signal-box, .panel, .final-cta");
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
let scrollAnimationFrame = null;
let previousScrollBehavior = "";
let landingAnimation = null;

function cancelAnchorScroll() {
  if (scrollAnimationFrame === null) return;

  window.cancelAnimationFrame(scrollAnimationFrame);
  scrollAnimationFrame = null;
  landingAnimation?.cancel();
  document.documentElement.style.scrollBehavior = previousScrollBehavior;
}

function scrollToAnchor(target) {
  cancelAnchorScroll();
  const root = document.documentElement;
  previousScrollBehavior = root.style.scrollBehavior;
  root.style.scrollBehavior = "auto";

  const startPosition = window.scrollY;
  const scrollOffset = Number.parseFloat(window.getComputedStyle(root).scrollPaddingTop) || 0;
  const maxScroll = root.scrollHeight - window.innerHeight;
  const endPosition = Math.max(0, Math.min(startPosition + target.getBoundingClientRect().top - scrollOffset, maxScroll));
  const duration = prefersReducedMotion ? 650 : 1000;
  let startTime = null;

  function animateScroll(timestamp) {
    if (startTime === null) startTime = timestamp;
    const progress = Math.min((timestamp - startTime) / duration, 1);
    const easedProgress = 1 - Math.pow(1 - progress, 3);
    window.scrollTo(0, startPosition + (endPosition - startPosition) * easedProgress);

    if (progress < 1) {
      scrollAnimationFrame = window.requestAnimationFrame(animateScroll);
      return;
    }

    scrollAnimationFrame = null;
    root.style.scrollBehavior = previousScrollBehavior;
    landingAnimation?.cancel();
    landingAnimation = target.animate([
      { transform: "translateY(-34px)", opacity: 0.82, offset: 0 },
      { transform: "translateY(7px)", opacity: 1, offset: 0.78 },
      { transform: "translateY(0)", opacity: 1, offset: 1 },
    ], {
      duration: prefersReducedMotion ? 380 : 560,
      easing: "cubic-bezier(.2, .75, .25, 1)",
    });
  }

  scrollAnimationFrame = window.requestAnimationFrame(animateScroll);
}

window.addEventListener("wheel", cancelAnchorScroll, { passive: true });
window.addEventListener("touchstart", cancelAnchorScroll, { passive: true });
window.addEventListener("pointerdown", cancelAnchorScroll, { passive: true });

document.addEventListener("click", (event) => {
  const link = event.target instanceof Element ? event.target.closest('a[href^="#"]') : null;
  if (!link || link.hash.length < 2) return;

  const target = document.getElementById(decodeURIComponent(link.hash.slice(1)));
  if (!target) return;

  event.preventDefault();
  navigation?.classList.remove("is-open");
  document.body.classList.remove("menu-open");
  menuButton?.setAttribute("aria-expanded", "false");
  menuButton?.setAttribute("aria-label", "Abrir menu");

  if (window.location.hash !== link.hash) {
    try {
      window.history.pushState(null, "", link.hash);
    } catch {
      window.location.hash = link.hash;
    }
  }

  scrollToAnchor(target);
});

if ("IntersectionObserver" in window && !prefersReducedMotion) {
  revealElements.forEach((element) => element.classList.add("reveal"));
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealElements.forEach((element) => revealObserver.observe(element));
}

const pageSections = document.querySelectorAll("main section[id]");
if ("IntersectionObserver" in window) {
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const activeLink = navigation?.querySelector(`a[href="#${entry.target.id}"]`);
      navigation?.querySelectorAll("a").forEach((link) => link.removeAttribute("aria-current"));
      activeLink?.setAttribute("aria-current", "location");
    });
  }, { rootMargin: "-25% 0px -65% 0px" });
  pageSections.forEach((section) => sectionObserver.observe(section));
}

reflectionButton?.addEventListener("click", () => {
  if (!reflectionResult || reflectionButton.disabled) return;

  let secondsLeft = 10;
  reflectionResult.hidden = false;
  reflectionResult.textContent = `Respire com calma. A pausa termina em ${secondsLeft} segundos.`;
  reflectionButton.disabled = true;
  reflectionButton.textContent = "Pausa em andamento…";

  const countdown = window.setInterval(() => {
    secondsLeft -= 1;
    if (secondsLeft > 0) {
      reflectionResult.textContent = `Respire com calma. A pausa termina em ${secondsLeft} segundos.`;
      return;
    }

    window.clearInterval(countdown);
    reflectionResult.textContent = "Pausa concluída. Agora escolha conscientemente o que fazer em seguida.";
    reflectionButton.disabled = false;
    reflectionButton.textContent = "Fazer outra pausa";
  }, 1000);
});

document.querySelector("#current-year")?.replaceChildren(String(new Date().getFullYear()));
