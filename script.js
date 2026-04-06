/* ============================================================
   SUNTHER S — PORTFOLIO INTERACTIONS
   Theme toggle, scroll animations, typing effect, form handling
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ══════ PRELOADER ══════
  const preloader = document.getElementById('preloader');
  window.addEventListener('load', () => {
    setTimeout(() => {
      preloader.classList.add('hidden');
    }, 600);
  });

  // ══════ THEME TOGGLE ══════
  const themeToggle = document.getElementById('themeToggle');
  const html = document.documentElement;

  // Load saved theme or default to dark
  const savedTheme = localStorage.getItem('portfolio-theme') || 'dark';
  html.setAttribute('data-theme', savedTheme);

  themeToggle.addEventListener('click', () => {
    const current = html.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', next);
    localStorage.setItem('portfolio-theme', next);
  });

  // ══════ NAVBAR SCROLL EFFECT ══════
  const navbar = document.getElementById('navbar');
  const backToTop = document.getElementById('backToTop');

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;

    // Navbar glass effect
    if (scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Back to top button
    if (scrollY > 500) {
      backToTop.classList.add('visible');
    } else {
      backToTop.classList.remove('visible');
    }

    // Active nav link highlighting
    updateActiveNavLink();
  });

  // Back to top
  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // ══════ ACTIVE NAV LINK ══════
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');

  function updateActiveNavLink() {
    const scrollY = window.scrollY + 200;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');

      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  // ══════ MOBILE MENU ══════
  const hamburger = document.getElementById('hamburger');
  const navLinksEl = document.getElementById('navLinks');
  const navOverlay = document.getElementById('navOverlay');

  function toggleMobileMenu() {
    hamburger.classList.toggle('active');
    navLinksEl.classList.toggle('open');
    navOverlay.classList.toggle('open');
    document.body.style.overflow = navLinksEl.classList.contains('open') ? 'hidden' : '';
  }

  hamburger.addEventListener('click', toggleMobileMenu);
  navOverlay.addEventListener('click', toggleMobileMenu);

  // Close menu on link click
  navLinksEl.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      if (navLinksEl.classList.contains('open')) {
        toggleMobileMenu();
      }
    });
  });

  // ══════ TYPING ANIMATION ══════
  const typingText = document.getElementById('typingText');
  const roles = [
    'Entry-Level Software Developer',
    'Full Stack Web Developer',
    'Python & Java Developer',
    'AI Enthusiast',
    'MCA Graduate — 2026'
  ];

  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 80;

  function typeWriter() {
    const currentRole = roles[roleIndex];

    if (isDeleting) {
      typingText.textContent = currentRole.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 40;
    } else {
      typingText.textContent = currentRole.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 80;
    }

    if (!isDeleting && charIndex === currentRole.length) {
      // Pause at end
      typingSpeed = 2000;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      typingSpeed = 400;
    }

    setTimeout(typeWriter, typingSpeed);
  }

  // Start typing after a short delay
  setTimeout(typeWriter, 1200);

  // ══════ SCROLL-TRIGGERED ANIMATIONS ══════
  const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  };

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        // Don't unobserve to allow re-triggering if needed
      }
    });
  }, observerOptions);

  // Observe all reveal elements
  document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale, .stagger-children').forEach(el => {
    revealObserver.observe(el);
  });

  // ══════ COUNTER ANIMATION ══════
  const counters = document.querySelectorAll('.stat-number[data-count]');

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = entry.target;
        const count = parseInt(target.getAttribute('data-count'));
        animateCounter(target, count);
        counterObserver.unobserve(target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(counter => counterObserver.observe(counter));

  function animateCounter(element, target) {
    let current = 0;
    const increment = target / 40;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      element.textContent = Math.floor(current) + '+';
    }, 40);
  }

  // ══════ SKILL TABS FILTER ══════
  const skillTabs = document.querySelectorAll('.skill-tab');
  const skillCards = document.querySelectorAll('.skill-card');

  skillTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      // Update active tab
      skillTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const category = tab.getAttribute('data-tab');

      skillCards.forEach(card => {
        if (category === 'all' || card.getAttribute('data-category') === category) {
          card.style.display = '';
          card.style.opacity = '0';
          card.style.transform = 'translateY(20px)';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
            card.style.transition = 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
          }, 50);
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // ══════ CONTACT FORM (Formspree) ══════
  const contactForm = document.getElementById('contactForm');
  const formStatus = document.getElementById('formStatus');
  const submitBtn = document.getElementById('submitBtn');

  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Update button state
    const originalHTML = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="ri-loader-4-line" style="animation: spin 1s linear infinite;"></i> Sending...';
    submitBtn.disabled = true;

    try {
      const formData = new FormData(contactForm);

      const response = await fetch(contactForm.action, {
        method: 'POST',
        body: formData,
        headers: { 'Accept': 'application/json' }
      });

      if (response.ok) {
        formStatus.textContent = '✅ Message sent successfully! I\'ll get back to you soon.';
        formStatus.className = 'form-status success';
        contactForm.reset();
      } else {
        throw new Error('Form submission failed');
      }
    } catch (error) {
      formStatus.textContent = '❌ Oops! Something went wrong. Please try again or email me directly.';
      formStatus.className = 'form-status error';
    }

    submitBtn.innerHTML = originalHTML;
    submitBtn.disabled = false;

    // Hide status after 6 seconds
    setTimeout(() => {
      formStatus.className = 'form-status';
    }, 6000);
  });

  // ══════ SMOOTH SCROLL FOR ALL ANCHOR LINKS ══════
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = anchor.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // ══════ PARALLAX ON HERO IMAGE (Desktop only) ══════
  const heroImageWrapper = document.querySelector('.hero-image-wrapper');

  if (heroImageWrapper && window.innerWidth > 1024) {
    document.addEventListener('mousemove', (e) => {
      const { clientX, clientY } = e;
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;

      const deltaX = (clientX - centerX) / centerX;
      const deltaY = (clientY - centerY) / centerY;

      heroImageWrapper.style.transform = `
        perspective(1000px)
        rotateY(${deltaX * 5}deg)
        rotateX(${-deltaY * 5}deg)
      `;
    });
  }

  // ══════ PROJECT CARD HOVER TILT (Desktop only) ══════
  if (window.innerWidth > 1024) {
    const projectCards = document.querySelectorAll('.project-card');

    projectCards.forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = '';
      });
    });
  }

});
