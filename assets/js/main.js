/* =============================================
   FIRST PROTOCOL LOGISTICS — main.js
   ============================================= */

(function () {
  'use strict';

  /* --------------------------------------------------
     1. NAVBAR SCROLL EFFECT
  -------------------------------------------------- */
  const navbar = document.getElementById('navbar');
  if (navbar) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }, { passive: true });
  }

  /* --------------------------------------------------
     2. MOBILE HAMBURGER
  -------------------------------------------------- */
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobile-menu');

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', function () {
      const isOpen = hamburger.classList.toggle('open');
      if (isOpen) {
        mobileMenu.classList.add('open');
        document.body.style.overflow = 'hidden';
      } else {
        mobileMenu.classList.remove('open');
        document.body.style.overflow = '';
      }
    });

    mobileMenu.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        hamburger.classList.remove('open');
        mobileMenu.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  /* --------------------------------------------------
     3. PARTICLE NETWORK CANVAS (hero only)
  -------------------------------------------------- */
  const canvas = document.getElementById('particles-canvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    const isMobile = window.innerWidth <= 768;
    const PARTICLE_COUNT = isMobile ? 40 : 80;
    const CONNECTION_DISTANCE = 120;
    const MOUSE_REPEL_DIST = 150;
    const PARTICLE_RADIUS = 1.5;
    const SPEED = 0.4;

    let particles = [];
    let mouse = { x: -9999, y: -9999 };
    let animFrameId;

    function resizeCanvas() {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    }

    function createParticles() {
      particles = [];
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * SPEED,
          vy: (Math.random() - 0.5) * SPEED,
          color: i % 2 === 0
            ? 'rgba(28,122,28,0.6)'
            : 'rgba(255,140,0,0.4)'
        });
      }
    }

    function drawParticles() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Mouse repulsion
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < MOUSE_REPEL_DIST) {
          const force = (MOUSE_REPEL_DIST - dist) / MOUSE_REPEL_DIST;
          p.vx += (dx / dist) * force * 0.5;
          p.vy += (dy / dist) * force * 0.5;
        }

        // Dampen velocity
        p.vx *= 0.99;
        p.vy *= 0.99;

        // Clamp speed
        const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
        if (speed > SPEED * 3) {
          p.vx = (p.vx / speed) * SPEED * 3;
          p.vy = (p.vy / speed) * SPEED * 3;
        }

        p.x += p.vx;
        p.y += p.vy;

        // Wrap edges
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, PARTICLE_RADIUS, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();

        // Draw connections
        for (let j = i + 1; j < particles.length; j++) {
          const q = particles[j];
          const cdx = p.x - q.x;
          const cdy = p.y - q.y;
          const cdist = Math.sqrt(cdx * cdx + cdy * cdy);
          if (cdist < CONNECTION_DISTANCE) {
            const opacity = (1 - cdist / CONNECTION_DISTANCE) * 0.4;
            ctx.beginPath();
            ctx.strokeStyle = `rgba(28,122,28,${opacity})`;
            ctx.lineWidth = 0.8;
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.stroke();
          }
        }
      }

      animFrameId = requestAnimationFrame(drawParticles);
    }

    canvas.addEventListener('mousemove', function (e) {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    });

    canvas.addEventListener('mouseleave', function () {
      mouse.x = -9999;
      mouse.y = -9999;
    });

    window.addEventListener('resize', function () {
      resizeCanvas();
      createParticles();
    }, { passive: true });

    resizeCanvas();
    createParticles();
    drawParticles();
  }

  /* --------------------------------------------------
     4. SCROLL REVEAL — Intersection Observer
  -------------------------------------------------- */
  const revealElements = document.querySelectorAll('.reveal');

  if (revealElements.length > 0) {
    const revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          revealObserver.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(function (el) {
      revealObserver.observe(el);
    });
  }

  /* --------------------------------------------------
     5. 3D CARD TILT
  -------------------------------------------------- */
  const tiltCards = document.querySelectorAll('.tilt-card');

  tiltCards.forEach(function (card) {
    card.addEventListener('mousemove', function (e) {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = (y - centerY) / 10;
      const rotateY = (centerX - x) / 10;
      card.style.transition = 'transform 0.1s ease';
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
    });

    card.addEventListener('mouseleave', function () {
      card.style.transition = 'transform 0.5s ease';
      card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
    });
  });

  /* --------------------------------------------------
     6. ANIMATED COUNTERS
  -------------------------------------------------- */
  const counters = document.querySelectorAll('.counter');

  if (counters.length > 0) {
    function easeOut(t) {
      return 1 - Math.pow(1 - t, 3);
    }

    function animateCounter(el) {
      const target = parseInt(el.getAttribute('data-target'), 10);
      const duration = 2000;
      const startTime = performance.now();

      function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const value = Math.round(easeOut(progress) * target);
        el.textContent = value;
        if (progress < 1) {
          requestAnimationFrame(update);
        } else {
          el.textContent = target;
        }
      }

      requestAnimationFrame(update);
    }

    const counterObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          counterObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    counters.forEach(function (counter) {
      counterObserver.observe(counter);
    });
  }

  /* --------------------------------------------------
     7. FAQ ACCORDION
  -------------------------------------------------- */
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(function (item) {
    const question = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');

    if (question && answer) {
      question.addEventListener('click', function () {
        const isOpen = item.classList.contains('open');

        // Close all
        faqItems.forEach(function (other) {
          other.classList.remove('open');
          const otherAnswer = other.querySelector('.faq-answer');
          if (otherAnswer) otherAnswer.style.maxHeight = '0';
        });

        // Toggle clicked
        if (!isOpen) {
          item.classList.add('open');
          answer.style.maxHeight = answer.scrollHeight + 'px';
        }
      });
    }
  });

  /* --------------------------------------------------
     8. BUTTON RIPPLE EFFECT
  -------------------------------------------------- */
  const buttons = document.querySelectorAll('.btn');

  buttons.forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const ripple = document.createElement('span');
      const size = Math.max(rect.width, rect.height) * 2;
      ripple.classList.add('ripple');
      ripple.style.width = size + 'px';
      ripple.style.height = size + 'px';
      ripple.style.left = (x - size / 2) + 'px';
      ripple.style.top = (y - size / 2) + 'px';
      btn.appendChild(ripple);
      ripple.addEventListener('animationend', function () {
        ripple.remove();
      });
    });
  });

  /* --------------------------------------------------
     9. MARQUEE TICKER (ensure seamless loop)
  -------------------------------------------------- */
  // The marquee animation is CSS-driven via marquee-track.
  // JS ensures content is duplicated if not already done in HTML.
  const marqueeTrack = document.getElementById('marquee-track');
  if (marqueeTrack) {
    // Content is already duplicated in HTML for seamless loop.
    // Pause on hover for accessibility
    marqueeTrack.parentElement.addEventListener('mouseenter', function () {
      marqueeTrack.style.animationPlayState = 'paused';
    });
    marqueeTrack.parentElement.addEventListener('mouseleave', function () {
      marqueeTrack.style.animationPlayState = 'running';
    });
  }

  /* --------------------------------------------------
     10. NAVBAR ACTIVE LINK (based on current URL)
  -------------------------------------------------- */
  const navLinks = document.querySelectorAll('.navbar-links a, .mobile-menu a');
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';

  navLinks.forEach(function (link) {
    const href = link.getAttribute('href');
    if (href === currentPath || (currentPath === '' && href === 'index.html')) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });

  /* --------------------------------------------------
     11. PROCESS TIMELINE DRAW ANIMATION
  -------------------------------------------------- */
  const timelineLine = document.getElementById('timeline-line');
  const processTimeline = document.getElementById('process-timeline');

  if (timelineLine && processTimeline) {
    const timelineObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          timelineLine.classList.add('drawn');
          timelineObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    timelineObserver.observe(processTimeline);
  }

  /* --------------------------------------------------
     12. FORM SUBMISSION
  -------------------------------------------------- */
  const contactForm = document.getElementById('contact-form');
  const submitBtn = document.getElementById('submit-btn');
  const formSuccess = document.getElementById('form-success');

  if (contactForm && submitBtn && formSuccess) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();

      submitBtn.classList.add('loading');
      submitBtn.textContent = 'Sending...';

      // Simulate async submission
      setTimeout(function () {
        contactForm.style.display = 'none';
        formSuccess.classList.add('visible');
        submitBtn.classList.remove('loading');
        submitBtn.textContent = 'Send My Request';
      }, 1500);
    });
  }

  /* --------------------------------------------------
     SECTION HEADING ACCENT LINES (scaleY trigger)
  -------------------------------------------------- */
  const headingWraps = document.querySelectorAll('.section-heading-wrap');

  if (headingWraps.length > 0) {
    const headingObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          headingObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });

    headingWraps.forEach(function (wrap) {
      headingObserver.observe(wrap);
    });
  }

  /* --------------------------------------------------
     HERO SCROLL INDICATOR FADE
  -------------------------------------------------- */
  const scrollIndicator = document.getElementById('hero-scroll-indicator');
  if (scrollIndicator) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 100) {
        scrollIndicator.classList.add('hidden');
      } else {
        scrollIndicator.classList.remove('hidden');
      }
    }, { passive: true });
  }

})();
