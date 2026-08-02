/* ==========================================================================
   reveal.js
   Generic scroll-reveal utility: fades/slides in any element with the
   `.reveal` class as it enters the viewport. Currently used on index.html,
   but written so any page can adopt it just by adding the class + script tag.
   ========================================================================== */

(function () {
  const revealEls = document.querySelectorAll('.reveal');
  if (!revealEls.length) return;

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

  revealEls.forEach(el => revealObserver.observe(el));
})();
