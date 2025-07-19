// Mobile Navigation Toggle
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');

navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar background on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }
});

// Contact Form Handling
const consultationForm = document.getElementById('consultation-form');

consultationForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(this);
    const data = {};
    for (let [key, value] of formData.entries()) {
        data[key] = value;
    }
    
    // Create email body
    const emailBody = `
New consultation request from ${data.name}

Contact Information:
- Name: ${data.name}
- Email: ${data.email}
- Phone: ${data.phone || 'Not provided'}
- Company: ${data.company || 'Not provided'}

Service Needed: ${data.service}

Message:
${data.message || 'No additional message provided'}

Best regards,
Website Contact Form
    `.trim();
    
    // Create mailto link
    const mailtoLink = `mailto:solutions.ka@hotmail.com?subject=Consultation Request from ${data.name}&body=${encodeURIComponent(emailBody)}`;
    
    // Open email client
    window.location.href = mailtoLink;
    
    // Show success message
    showSuccessMessage();
    
    // Reset form
    this.reset();
});

// Show success message function
function showSuccessMessage() {
    const successMessage = document.createElement('div');
    successMessage.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background-color: #10b981;
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        z-index: 1001;
        font-weight: 500;
        opacity: 0;
        transform: translateY(-20px);
        transition: all 0.3s ease;
    `;
    successMessage.innerHTML = `
        <i class="fas fa-check-circle" style="margin-right: 0.5rem;"></i>
        Message sent! We'll get back to you soon.
    `;
    
    document.body.appendChild(successMessage);
    
    // Animate in
    setTimeout(() => {
        successMessage.style.opacity = '1';
        successMessage.style.transform = 'translateY(0)';
    }, 100);
    
    // Remove after 5 seconds
    setTimeout(() => {
        successMessage.style.opacity = '0';
        successMessage.style.transform = 'translateY(-20px)';
        setTimeout(() => {
            document.body.removeChild(successMessage);
        }, 300);
    }, 5000);
}

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
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.service-card, .about-content, .contact-content');
    
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Add active class to navigation links based on scroll position
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Add CSS for active nav link
const style = document.createElement('style');
style.textContent = `
    .nav-link.active {
        color: #1e40af !important;
        font-weight: 600;
    }
`;
document.head.appendChild(style);

// Preload critical resources
window.addEventListener('load', () => {
    // Preload Google Fonts
    const fontLink = document.createElement('link');
    fontLink.rel = 'preload';
    fontLink.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap';
    fontLink.as = 'style';
    document.head.appendChild(fontLink);
    
    // Preload Font Awesome
    const faLink = document.createElement('link');
    faLink.rel = 'preload';
    faLink.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css';
    faLink.as = 'style';
    document.head.appendChild(faLink);
});
