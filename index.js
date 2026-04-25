document.getElementById("back").addEventListener("click", (e) => {
  e.preventDefault();

  const start = window.scrollY;
  const duration = 1200;

  const startTime = performance.now();

  function easeOutCubic(t) {
    return 1 - Math.pow(1 - t, 3);
  }

  function scrollStep(currentTime) {
    const timeElapsed = currentTime - startTime;
    const progress = Math.min(timeElapsed / duration, 1);

    const ease = easeOutCubic(progress);

    window.scrollTo(0, start * (1 - ease));

    if (progress < 1) {
      requestAnimationFrame(scrollStep);
    }
  }

  requestAnimationFrame(scrollStep);
});

const createObserver = (threshold) => {
  return new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold });
};
  
document.querySelectorAll('.stacks, .projects, .text-gradient')
  .forEach(el => createObserver(0.5).observe(el));

document.querySelectorAll('.hero')
  .forEach(el => createObserver(0.3).observe(el));