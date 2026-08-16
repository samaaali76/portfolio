
window.addEventListener('DOMContentLoaded', () => {
  const wrap = document.getElementById('spline-wrap');
  const fallback = document.getElementById('spline-fallback');
  const viewer = document.getElementById('spline-robot');
  const hint = document.getElementById('spline-hint');
  if (!wrap || !viewer) return;

  const prefersReducedMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  ).matches;
  const isSmallScreen = window.matchMedia('(max-width: 960px)').matches;

  // Bail out early and keep the static fallback for mobile and for
  // anyone who has asked their OS to reduce motion.
  if (prefersReducedMotion || isSmallScreen) {
    return;
  }

  // Lazy-load: only fetch the (large) Spline runtime once the hero
  // section is actually about to be visible, instead of blocking
  // the initial page load with it.
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();

        const script = document.createElement('script');
        script.type = 'module';
        script.src =
          'https://unpkg.com/@splinetool/viewer@1.12.94/build/spline-viewer.js';
        script.onload = () => {
          fallback.style.display = 'none';
          viewer.style.display = 'block';
          hint.style.display = 'flex';

          document.addEventListener(
            'mousemove',
            (e) => {
              viewer.dispatchEvent(
                new MouseEvent('mousemove', {
                  clientX: e.clientX,
                  clientY: e.clientY,
                  bubbles: false,
                  cancelable: true,
                })
              );
            },
            { passive: true }
          );
        };
        document.head.appendChild(script);
      });
    },
    { rootMargin: '200px' }
  );

  observer.observe(wrap);
});
