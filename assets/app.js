const tiltCards = document.querySelectorAll("[data-tilt]");

tiltCards.forEach((card) => {
  const strength = 14;

  card.addEventListener("mousemove", (event) => {
    if (window.innerWidth < 721) {
      return;
    }

    const bounds = card.getBoundingClientRect();
    const offsetX = event.clientX - bounds.left;
    const offsetY = event.clientY - bounds.top;
    const rotateY = ((offsetX / bounds.width) - 0.5) * strength;
    const rotateX = (0.5 - (offsetY / bounds.height)) * strength;

    card.style.setProperty("--tilt-x", `${rotateX}deg`);
    card.style.setProperty("--tilt-y", `${rotateY}deg`);
    card.style.setProperty("--lift", "-4px");
  });

  card.addEventListener("mouseleave", () => {
    card.style.setProperty("--tilt-x", "0deg");
    card.style.setProperty("--tilt-y", "0deg");
    card.style.setProperty("--lift", "0px");
  });
});

const statValues = document.querySelectorAll(".stat-value[data-count]");
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) {
      return;
    }

    const el = entry.target;
    const target = Number(el.dataset.count);
    const start = performance.now();
    const duration = 1300;

    const step = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.floor(target * eased).toString();

      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };

    requestAnimationFrame(step);
    observer.unobserve(el);
  });
}, { threshold: 0.55 });

statValues.forEach((value) => observer.observe(value));
