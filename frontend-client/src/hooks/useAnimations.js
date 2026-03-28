import { useEffect } from 'react';

// Lightweight scroll reveal without heavy GSAP dependency
// Uses IntersectionObserver for performance
export function useScrollReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal');
    if (!els.length) return;

    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.add('visible');
          }, i * 60);
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    els.forEach(el => io.observe(el));
    return () => io.disconnect();
  });
}

// Navbar hide/show on scroll
export function useNavbarScroll() {
  useEffect(() => {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;

    let lastY = 0;
    const onScroll = () => {
      const y = window.scrollY;
      if (y > lastY && y > 80) {
        navbar.classList.add('hidden');
      } else {
        navbar.classList.remove('hidden');
      }
      if (y > 10) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
      lastY = y;
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
}

// GSAP text reveal for hero title
export async function animateHeroTitle(selector) {
  try {
    const { gsap } = await import('gsap');
    const el = document.querySelector(selector);
    if (!el) return;

    const text = el.innerHTML;
    const words = text.split(' ');
    el.innerHTML = words.map(w => `<span class="word" style="display:inline-block;overflow:hidden;"><span style="display:inline-block">${w}</span></span>`).join(' ');

    gsap.from(`${selector} .word span`, {
      y: '110%',
      opacity: 0,
      duration: 0.8,
      stagger: 0.06,
      ease: 'power3.out',
      delay: 0.2,
    });
  } catch {}
}

// GSAP counter animation
export async function animateCounter(el, target) {
  try {
    const { gsap } = await import('gsap');
    const obj = { val: 0 };
    gsap.to(obj, {
      val: target,
      duration: 2,
      ease: 'power2.out',
      delay: 0.5,
      onUpdate() {
        if (el) el.textContent = Math.round(obj.val) + (target >= 100 ? '+' : '');
      },
    });
  } catch {}
}

// Magnetic button effect
export function useMagneticButtons() {
  useEffect(() => {
    const buttons = document.querySelectorAll('.btn-lg, .magnetic');
    buttons.forEach(btn => {
      const handleMove = (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top  - rect.height / 2;
        btn.style.transform = `translate(${x * 0.25}px, ${y * 0.25}px)`;
      };
      const handleLeave = () => {
        btn.style.transform = '';
        btn.style.transition = 'transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)';
        setTimeout(() => { btn.style.transition = ''; }, 400);
      };
      btn.addEventListener('mousemove', handleMove);
      btn.addEventListener('mouseleave', handleLeave);
    });
  });
}
