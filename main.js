// ===== Mobile Menu Toggle =====
const toggle = document.querySelector('.nav-mobile-toggle');
const mobileMenu = document.getElementById('mobileMenu');

if (toggle) {
  toggle.addEventListener('click', () => {
    toggle.classList.toggle('active');
    mobileMenu.classList.toggle('open');
  });

  // Close menu on link click
  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      toggle.classList.remove('active');
      mobileMenu.classList.remove('open');
    });
  });
}

// ===== Scroll-triggered animations for feature cards =====
const observerOptions = {
  threshold: 0.15,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {
      // Stagger the animation based on the element's position
      const cards = document.querySelectorAll('.feature-card');
      const cardIndex = Array.from(cards).indexOf(entry.target);
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, cardIndex * 100);
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

document.querySelectorAll('.feature-card').forEach(card => {
  observer.observe(card);
});

// ===== Nav background on scroll =====
const nav = document.querySelector('.nav');
let lastScroll = 0;

window.addEventListener('scroll', () => {
  const currentScroll = window.scrollY;
  if (currentScroll > 100) {
    nav.style.borderBottomColor = 'rgba(0, 255, 102, 0.15)';
  } else {
    nav.style.borderBottomColor = '';
  }
  lastScroll = currentScroll;
}, { passive: true });

// ===== Smooth scroll for anchor links =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const href = this.getAttribute('href');
    if (href === '#') return;
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      const navHeight = document.querySelector('.nav').offsetHeight;
      const targetPos = target.getBoundingClientRect().top + window.pageYOffset - navHeight;
      window.scrollTo({ top: targetPos, behavior: 'smooth' });
    }
  });
});

// ===== Typing effect for hero subtitle =====
const subtitle = document.querySelector('.hero-subtitle');
if (subtitle) {
  const text = subtitle.textContent;
  const prefix = subtitle.querySelector('.typing-prefix');
  const fullText = ' PLAY AGAINST THE MACHINE';
  const textNode = subtitle.childNodes[subtitle.childNodes.length - 1];
  
  // Create a span for the typed text
  const typedSpan = document.createElement('span');
  typedSpan.className = 'typed-text';
  
  // Clear the text content after the prefix
  if (prefix) {
    // Remove all text nodes
    Array.from(subtitle.childNodes).forEach(node => {
      if (node.nodeType === 3) subtitle.removeChild(node);
    });
    subtitle.appendChild(typedSpan);
    
    let i = 0;
    const typeInterval = setInterval(() => {
      if (i < fullText.length) {
        typedSpan.textContent += fullText[i];
        i++;
      } else {
        clearInterval(typeInterval);
        // Add blinking cursor after typing
        const cursor = document.createElement('span');
        cursor.textContent = '█';
        cursor.style.animation = 'blink 1s step-end infinite';
        cursor.style.color = 'var(--green)';
        cursor.style.marginLeft = '2px';
        typedSpan.appendChild(cursor);
      }
    }, 60);
  }
}

// ===== Parallax effect on hero grid =====
const heroGrid = document.querySelector('.hero-grid-bg');
if (heroGrid) {
  window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    if (scrolled < window.innerHeight) {
      heroGrid.style.transform = `translateY(${scrolled * 0.3}px)`;
    }
  }, { passive: true });
}
