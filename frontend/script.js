// Mobile Navigation Toggle
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');

if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerHeight = document.querySelector('.header').offsetHeight;
            const targetPosition = target.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Header background on scroll
const header = document.querySelector('.header');
let lastScrollY = window.scrollY;

window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;
    
    if (currentScrollY > 100) {
        header.style.background = 'rgba(0, 0, 0, 0.98)';
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.background = 'rgba(0, 0, 0, 0.95)';
        header.style.boxShadow = 'none';
    }
    
    // Hide/show header on scroll
    if (currentScrollY > lastScrollY && currentScrollY > 200) {
        header.style.transform = 'translateY(-100%)';
    } else {
        header.style.transform = 'translateY(0)';
    }
    
    lastScrollY = currentScrollY;
});

// Animate elements on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
const animateElements = document.querySelectorAll('.service-card, .contact-card, .benefit');
animateElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Counter animation for stats (if any stats are added later)
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        start += increment;
        element.textContent = Math.floor(start);
        
        if (start >= target) {
            element.textContent = target;
            clearInterval(timer);
        }
    }, 16);
}

// Phone number click tracking
document.querySelectorAll('a[href^="tel:"]').forEach(link => {
    link.addEventListener('click', () => {
        // You can add analytics tracking here
        console.log('Phone call initiated');
    });
});

// Email click tracking
document.querySelectorAll('a[href^="mailto:"]').forEach(link => {
    link.addEventListener('click', () => {
        // You can add analytics tracking here
        console.log('Email initiated');
    });
});

// Service card hover effects enhancement
document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        // Add a subtle glow effect
        card.style.boxShadow = '0 20px 40px rgba(220, 38, 38, 0.15)';
    });
    
    card.addEventListener('mouseleave', () => {
        // Reset to original shadow
        card.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.08)';
    });
});

// Add loading animation
window.addEventListener('load', () => {
    // Hide any loading spinner if present
    const loader = document.querySelector('.loader');
    if (loader) {
        loader.style.opacity = '0';
        setTimeout(() => loader.remove(), 300);
    }
    
    // Animate hero elements
    const heroTitle = document.querySelector('.hero-title');
    const heroSubtitle = document.querySelector('.hero-subtitle');
    const heroButtons = document.querySelector('.hero-buttons');
    
    if (heroTitle) {
        heroTitle.style.animation = 'slideInFromLeft 1s ease-out';
    }
    if (heroSubtitle) {
        heroSubtitle.style.animation = 'slideInFromLeft 1s ease-out 0.2s both';
    }
    if (heroButtons) {
        heroButtons.style.animation = 'slideInFromLeft 1s ease-out 0.4s both';
    }
});

// Add custom animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInFromLeft {
        0% {
            opacity: 0;
            transform: translateX(-50px);
        }
        100% {
            opacity: 1;
            transform: translateX(0);
        }
    }
    
    @keyframes fadeInUp {
        0% {
            opacity: 0;
            transform: translateY(30px);
        }
        100% {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroVisual = document.querySelector('.hero-visual');
    
    if (heroVisual && scrolled < window.innerHeight) {
        const rate = scrolled * -0.5;
        heroVisual.style.transform = `translateY(${rate}px)`;
    }
});

// Add click-to-call functionality with confirmation
document.querySelectorAll('a[href^="tel:"]').forEach(link => {
    link.addEventListener('click', (e) => {
        const phoneNumber = link.getAttribute('href').replace('tel:', '');
        
        // For desktop users, show a confirmation
        if (window.innerWidth > 768 && !('ontouchstart' in window)) {
            e.preventDefault();
            const confirmed = confirm(`Voulez-vous appeler ${phoneNumber} ?`);
            if (confirmed) {
                window.location.href = link.getAttribute('href');
            }
        }
    });
});

// Add WhatsApp integration
function openWhatsApp() {
    const phoneNumber = '+33759094576';
    const message = encodeURIComponent('Bonjour, je souhaiterais obtenir des informations sur vos services de diagnostic automobile.');
    const whatsappUrl = `https://wa.me/${phoneNumber.replace(/[^0-9]/g, '')}?text=${message}`;
    window.open(whatsappUrl, '_blank');
}

// Add WhatsApp button if needed
const whatsappLinks = document.querySelectorAll('a[href*="whatsapp"], .whatsapp-btn');
whatsappLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        openWhatsApp();
    });
});

// Performance optimization: Lazy load images if any are added
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// Add error handling for failed resources
window.addEventListener('error', (e) => {
    console.warn('Resource failed to load:', e.target);
}, true);

// Contact Form - Géré entièrement par Netlify
// Plus de JavaScript nécessaire pour le formulaire

function createEmailBody(data) {
    let body = `Bonjour,\n\n`;
    body += `Je vous contacte via votre site web pour une demande de service.\n\n`;
    body += `=== INFORMATIONS PERSONNELLES ===\n`;
    body += `Nom: ${data.lastName || 'Non renseigné'}\n`;
    body += `Prénom: ${data.firstName || 'Non renseigné'}\n`;
    body += `Email: ${data.email || 'Non renseigné'}\n`;
    body += `Téléphone: ${data.phone || 'Non renseigné'}\n\n`;
    
    body += `=== INFORMATIONS VÉHICULE ===\n`;
    body += `Véhicule: ${data.vehicle || 'Non renseigné'}\n`;
    body += `Service souhaité: ${getServiceLabel(data.service) || 'Non renseigné'}\n`;
    body += `Intervention urgente: ${data.urgency ? 'OUI (24h/24)' : 'Non'}\n\n`;
    
    body += `=== MESSAGE ===\n`;
    body += `${data.message || 'Aucun message spécifique'}\n\n`;
    
    body += `---\n`;
    body += `Message envoyé depuis le site web DIAG IDF\n`;
    body += `Date: ${new Date().toLocaleString('fr-FR')}\n`;
    
    return body;
}

function getServiceLabel(serviceValue) {
    const services = {
        'diagnostic': 'Diagnostic complet',
        'fap-egr': 'Solution FAP/EGR',
        'adblue': 'Ad Blue',
        'stage1': 'Stage 1',
        'ethanol': 'Reprogrammation Ethanol',
        'effacement': 'Effacement voyant',
        'boite-auto': 'Programmation boîte auto',
        'popbang': 'Pop bang',
        'autre': 'Autre'
    };
    return services[serviceValue] || serviceValue;
}

function showFormStatus(type, message) {
    formStatus.className = `form-status ${type}`;
    formStatus.textContent = message;
    formStatus.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function hideFormStatus() {
    formStatus.className = 'form-status';
    formStatus.textContent = '';
}

// Form validation enhancement
function validateForm() {
    const requiredFields = contactForm.querySelectorAll('[required]');
    let isValid = true;
    
    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            field.style.borderColor = '#dc2626';
            isValid = false;
        } else {
            field.style.borderColor = '#16a34a';
        }
    });
    
    // Email validation
    const emailField = document.getElementById('email');
    if (emailField.value && !isValidEmail(emailField.value)) {
        emailField.style.borderColor = '#dc2626';
        isValid = false;
    }
    
    // Phone validation (if provided)
    const phoneField = document.getElementById('phone');
    if (phoneField.value && !isValidPhone(phoneField.value)) {
        phoneField.style.borderColor = '#f59e0b';
    }
    
    return isValid;
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function isValidPhone(phone) {
    const phoneRegex = /^(\+33|0)[1-9](\d{8})$/;
    return phoneRegex.test(phone.replace(/\s/g, ''));
}

// Real-time validation
if (contactForm) {
    const inputs = contactForm.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
        input.addEventListener('blur', () => {
            if (input.hasAttribute('required') && !input.value.trim()) {
                input.style.borderColor = '#dc2626';
            } else if (input.type === 'email' && input.value && !isValidEmail(input.value)) {
                input.style.borderColor = '#dc2626';
            } else if (input.type === 'tel' && input.value && !isValidPhone(input.value)) {
                input.style.borderColor = '#f59e0b';
            } else {
                input.style.borderColor = input.value ? '#16a34a' : '#e2e8f0';
            }
        });
        
        input.addEventListener('input', () => {
            if (input.style.borderColor === 'rgb(220, 38, 38)') {
                input.style.borderColor = '#e2e8f0';
            }
        });
    });
}

// Initialize everything when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    console.log('DIAG IDF website loaded successfully');
    
    // Add any initialization code here
    // For example, you could load analytics, chatbots, etc.
});
