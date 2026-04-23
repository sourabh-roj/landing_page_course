
const navbar = document.getElementById('navbar');
const menuBtn = document.getElementById('menuBtn');
const mobileMenu = document.getElementById('mobileMenu');
const toast = document.getElementById('toast');
const toastMessage = document.getElementById('toastMessage');

menuBtn.addEventListener('click', () => {
  mobileMenu.classList.toggle('hidden');
});

document.querySelectorAll('#mobileMenu a').forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.add('hidden');
  });
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('navbar-scrolled');
  } else {
    navbar.classList.remove('navbar-scrolled');
  }
});

// Modal functions
function openModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.remove('hidden');
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.add('hidden');
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }
}

// Close modal on escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    document.querySelectorAll('.modal.active').forEach(modal => {
      modal.classList.add('hidden');
      modal.classList.remove('active');
    });
    document.body.style.overflow = '';
  }
});

// Toast notification
function showToast(message, duration = 3000) {
  toastMessage.textContent = message;
  toast.classList.remove('translate-y-20', 'opacity-0');
  toast.classList.add('translate-y-0', 'opacity-100');
  
  setTimeout(() => {
    toast.classList.add('translate-y-20', 'opacity-0');
    toast.classList.remove('translate-y-0', 'opacity-100');
  }, duration);
}


function handleEnroll(event) {
  event.preventDefault();
  closeModal('enrollModal');
  showToast('Account created successfully! Welcome to CyberShield Academy.');
  event.target.reset();
}

function handleLogin(event) {
  event.preventDefault();
  closeModal('loginModal');
  showToast('Login successful! Redirecting to dashboard...');
  event.target.reset();
}

function handleContact(event) {
  event.preventDefault();
  closeModal('contactModal');
  showToast('Thank you! Our sales team will contact you within 24 hours.');
  event.target.reset();
}

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      const navHeight = navbar.offsetHeight;
      const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight;
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  });
});
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('fade-in');
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

document.querySelectorAll('section > div > div').forEach(el => {
  el.style.opacity = '0';
  observer.observe(el);
});
