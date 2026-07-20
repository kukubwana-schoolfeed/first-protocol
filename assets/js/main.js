/* =============================================
   FIRST PROTOCOL LOGISTICS — main.js
   ============================================= */

(function () {
  'use strict';

  const REDUCED_MOTION = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

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
  if (canvas && !REDUCED_MOTION) {
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
    if (REDUCED_MOTION) {
      revealElements.forEach(function (el) {
        el.classList.add('in-view');
      });
    } else {
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
  }

  /* --------------------------------------------------
     5. 3D CARD TILT
  -------------------------------------------------- */
  if (!REDUCED_MOTION) {
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
  }

  /* --------------------------------------------------
     6. FAQ ACCORDION
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
     7. BUTTON RIPPLE EFFECT
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
     8. MARQUEE TICKER (pause on hover for accessibility)
  -------------------------------------------------- */
  const marqueeTrack = document.getElementById('marquee-track');
  if (marqueeTrack) {
    marqueeTrack.parentElement.addEventListener('mouseenter', function () {
      marqueeTrack.style.animationPlayState = 'paused';
    });
    marqueeTrack.parentElement.addEventListener('mouseleave', function () {
      marqueeTrack.style.animationPlayState = 'running';
    });
  }

  /* --------------------------------------------------
     9. NAVBAR ACTIVE LINK (based on current URL)
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
     10. PROCESS / HOW-IT-WORKS TIMELINE DRAW ANIMATION
  -------------------------------------------------- */
  const timelineLine = document.getElementById('timeline-line');
  const processTimeline = document.getElementById('process-timeline');

  if (timelineLine && processTimeline) {
    if (REDUCED_MOTION) {
      timelineLine.classList.add('drawn');
    } else {
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
  }

  /* --------------------------------------------------
     11. QUOTE / CONTACT FORM — WhatsApp compose
  -------------------------------------------------- */
  const quoteForms = document.querySelectorAll('.quote-form');

  quoteForms.forEach(function (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      const nameField = form.querySelector('[name="name"]');
      const phoneField = form.querySelector('[name="phone"]');
      const goodsField = form.querySelector('[name="goods"]');
      const borderField = form.querySelector('[name="border"]');
      const serviceField = form.querySelector('[name="service"]');
      const note = form.querySelector('.form-note');

      const name = nameField ? nameField.value.trim() : '';
      const phone = phoneField ? phoneField.value.trim() : '';
      const goods = goodsField ? goodsField.value.trim() : '';
      const border = borderField ? borderField.value : '';
      const service = serviceField ? serviceField.value : '';

      if (!name || !phone || !goods) {
        if (note) {
          note.textContent = 'Please fill in your name, phone number, and what you’re clearing.';
          note.classList.add('visible');
        }
        return;
      }

      let msg = `New quote request — website
Name: ${name}
Phone: ${phone}
Clearing: ${goods}
Border: ${border || 'Not sure'}`;

      if (service) {
        msg += `\nService: ${service}`;
      }

      window.open('https://wa.me/260955872277?text=' + encodeURIComponent(msg), '_blank');

      if (note) {
        note.innerHTML = 'Opening WhatsApp… If nothing opened, message us directly on <a href="https://wa.me/260955872277" target="_blank" rel="noopener">+260 955 872 277</a> or email <a href="mailto:info@firstprotocol.com">info@firstprotocol.com</a>.';
        note.classList.add('visible');
      }
    });
  });

  /* --------------------------------------------------
     SECTION HEADING ACCENT LINES (scaleY trigger)
  -------------------------------------------------- */
  const headingWraps = document.querySelectorAll('.section-heading-wrap');

  if (headingWraps.length > 0) {
    if (REDUCED_MOTION) {
      headingWraps.forEach(function (wrap) {
        wrap.classList.add('in-view');
      });
    } else {
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

  /* --------------------------------------------------
     HELP BOT ("Quick Answers")
  -------------------------------------------------- */
  const helpbotToggle = document.getElementById('helpbot-toggle');
  const helpbotPanel = document.getElementById('helpbot-panel');

  if (helpbotToggle && helpbotPanel) {
    const questionList = helpbotPanel.querySelector('.helpbot-question-list');
    const answers = helpbotPanel.querySelectorAll('.helpbot-answer');
    const backBtns = helpbotPanel.querySelectorAll('.helpbot-back');

    helpbotToggle.addEventListener('click', function () {
      helpbotPanel.classList.toggle('open');
    });

    helpbotPanel.querySelectorAll('.helpbot-q-btn').forEach(function (btn) {
      btn.addEventListener('click', function () {
        const targetId = btn.getAttribute('data-answer');
        const target = helpbotPanel.querySelector('#' + targetId);
        if (questionList) questionList.style.display = 'none';
        answers.forEach(function (a) { a.classList.remove('active'); });
        if (target) target.classList.add('active');
      });
    });

    backBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        answers.forEach(function (a) { a.classList.remove('active'); });
        if (questionList) questionList.style.display = 'flex';
      });
    });

    document.addEventListener('click', function (e) {
      if (!helpbotPanel.contains(e.target) && !helpbotToggle.contains(e.target)) {
        helpbotPanel.classList.remove('open');
      }
    });
  }

})();
