/* ==========================================================================
   home.js
   Page-specific behavior for index.html:
   - animated stat counters
   - "how engagements run" scroll spine
   - services scatter scroll spine (mobile)
   - contact form submission
   - scroll-scrubbed frame animation
   ========================================================================== */

/* ---------- Animated stat counters ---------- */
const counters = document.querySelectorAll('[data-count-to]');
const countObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const el = entry.target;
    const to = parseInt(el.getAttribute('data-count-to'), 10);
    const suffix = el.getAttribute('data-suffix') || '';
    const duration = 1200;
    const start = performance.now();
    function tick(now){
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.round(eased * to).toLocaleString('en-US') + suffix;
      if (progress < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
    countObserver.unobserve(el);
  });
}, { threshold: 0.5 });
counters.forEach(el => countObserver.observe(el));

/* "How engagements run" scroll spine */
const spine = document.getElementById('spine');
const spineFill = document.getElementById('spine-fill');
const phases = document.querySelectorAll('.phase');
function updateSpine(){
  const rect = spine.getBoundingClientRect();
  const viewportH = window.innerHeight;
  const start = viewportH * 0.85;
  const end = viewportH * 0.4;
  const traveled = start - rect.top;
  const span = (rect.height + start - end);
  let progress = traveled / span;
  progress = Math.max(0, Math.min(1, progress));
  spineFill.style.height = (progress * 100) + '%';

  phases.forEach(phase => {
    const pRect = phase.getBoundingClientRect();
    if (pRect.top < viewportH * 0.65){
      phase.classList.add('lit');
    }
  });
}

/*  Services scatter scroll spine (mobile) */
const serviceScatter = document.getElementById('service-scatter');
const serviceSpineFill = document.getElementById('service-spine-fill');
const serviceItems = document.querySelectorAll('.service:not(.hub)');
function updateServiceSpine(){
  if (!serviceScatter || !serviceSpineFill) return;
  const rect = serviceScatter.getBoundingClientRect();
  const viewportH = window.innerHeight;
  const start = viewportH * 0.85;
  const end = viewportH * 0.4;
  const traveled = start - rect.top;
  const span = (rect.height + start - end);
  let progress = traveled / span;
  progress = Math.max(0, Math.min(1, progress));
  serviceSpineFill.style.height = (progress * 100) + '%';

  serviceItems.forEach(item => {
    const iRect = item.getBoundingClientRect();
    if (iRect.top < viewportH * 0.65){
      item.classList.add('lit');
    }
  });
}

let ticking = false;
window.addEventListener('scroll', () => {
  if (!ticking){
    requestAnimationFrame(() => { updateSpine(); updateServiceSpine(); ticking = false; });
    ticking = true;
  }
});
window.addEventListener('resize', () => { updateSpine(); updateServiceSpine(); });
updateSpine();
updateServiceSpine();

/* Contact form submission */
const form = document.getElementById('contact-form');
const status = document.getElementById('form-status');
form.addEventListener('submit', async function (e) {
  e.preventDefault();
  status.className = 'form-status';
  status.textContent = '';
  const data = new FormData(form);
  const destination = form.action.replace('formsubmit.co/', 'formsubmit.co/ajax/');
  try {
    const response = await fetch(destination, {
      method: 'POST',
      body: data,
      headers: { 'Accept': 'application/json' }
    });
    if (!response.ok) throw new Error('Request failed');
    status.textContent = 'Thanks — your message has been sent.';
    status.className = 'form-status success';
    form.reset();
  } catch (err) {
    status.textContent = 'Something went wrong. Please email directly instead.';
    status.className = 'form-status error';
  }
});

/* Scroll-scrubbed frame animation for "How engagements run" */
(function(){
  const frameCount = 240; // <-- change this to your actual number of frames
  const framePath = i => `images/animation_frames/ezgif-frame-${String(i).padStart(3,'0')}.png`;

  const canvas = document.getElementById('trail-frames-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const wrap = document.getElementById('trail-frames-wrap');

  const trailImages = [];
  for (let i = 1; i <= frameCount; i++){
    const img = new Image();
    img.src = framePath(i);
    trailImages.push(img);
  }

  function drawTrailFrame(index){
    const img = trailImages[index];
    if (!img || !img.complete || img.naturalWidth === 0) return;
    if (canvas.width !== img.naturalWidth) canvas.width = img.naturalWidth;
    if (canvas.height !== img.naturalHeight) canvas.height = img.naturalHeight;
    ctx.drawImage(img, 0, 0);
  }

  trailImages[0].onload = () => drawTrailFrame(0);

  let trailTicking = false;
  function updateTrailFrame(){
    const rect = wrap.getBoundingClientRect();
    const viewportH = window.innerHeight;
    // progress = 0 the moment the element's top enters the bottom of the
    // viewport, progress = 1 the moment its bottom leaves the top of the
    // viewport — so it starts as soon as it's visible and spans exactly
    // its own natural scroll length (which matches the section height).
    const total = rect.height + viewportH;
    let progress = (viewportH - rect.top) / total;
    progress = Math.min(Math.max(progress, 0), 1);
    const frameIndex = Math.floor(progress * (frameCount - 1));
    drawTrailFrame(frameIndex);
    trailTicking = false;
  }

  window.addEventListener('scroll', () => {
    if (!trailTicking){
      requestAnimationFrame(updateTrailFrame);
      trailTicking = true;
    }
  });
  window.addEventListener('resize', updateTrailFrame);
  updateTrailFrame();
})();
