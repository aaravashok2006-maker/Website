// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    // Change icon between bars and times
    const icon = hamburger.querySelector('i');
    if (navLinks.classList.contains('active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
    } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    }
});

// Close mobile nav when a link is clicked
document.querySelectorAll('.nav-links li a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        const icon = hamburger.querySelector('i');
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    });
});

// Navbar Style on Scroll
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Experience Tabs Logic
const tabBtns = document.querySelectorAll('.tab-btn');
const jobPanels = document.querySelectorAll('.job-panel');
const tabsContainer = document.querySelector('.tabs');

// Set up initial tab indicator
function updateTabIndicator(activeBtn) {
    if (window.innerWidth > 600) {
        // Vertical layout
        const topOffset = activeBtn.offsetTop;
        const height = activeBtn.offsetHeight;
        tabsContainer.style.setProperty('--tab-indicator-offset', `${topOffset}px`);
        tabsContainer.style.setProperty('--tab-indicator-height', `${height}px`);
    } else {
        // Horizontal layout
        const leftOffset = activeBtn.offsetLeft;
        const width = activeBtn.offsetWidth;
        tabsContainer.style.setProperty('--tab-indicator-offset', `${leftOffset}px`);
        tabsContainer.style.setProperty('--tab-indicator-width', `${width}px`);
    }
}

// Initial setup
if(tabBtns.length > 0) {
    // Wait a brief moment for layout to compute
    setTimeout(() => {
        updateTabIndicator(tabBtns[0]);
    }, 100);
}

// Update on resize
window.addEventListener('resize', () => {
    const activeBtn = document.querySelector('.tab-btn.active');
    if(activeBtn) updateTabIndicator(activeBtn);
});

tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all buttons and panels
        tabBtns.forEach(b => b.classList.remove('active'));
        jobPanels.forEach(p => p.classList.remove('active'));
        
        // Add active class to clicked button
        btn.classList.add('active');
        
        // Show corresponding panel
        const targetId = btn.getAttribute('data-target');
        document.getElementById(targetId).classList.add('active');
        
        // Update indicator
        updateTabIndicator(btn);
    });
});

// Scroll Reveal Animations Using Intersection Observer
const revealElements = document.querySelectorAll('.reveal, .reveal-right');

const revealOptions = {
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px"
};

const revealOnScroll = new IntersectionObserver(function(entries, observer) {
    entries.forEach(entry => {
        if (!entry.isIntersecting) {
            return;
        } else {
            entry.target.classList.add('active');
            observer.unobserve(entry.target);
        }
    });
}, revealOptions);

revealElements.forEach(el => {
    revealOnScroll.observe(el);
});

// Add staggered delays to project cards
const projectCards = document.querySelectorAll('.projects-grid .project-card');
projectCards.forEach((card, index) => {
    const delay = (index % 3) + 1;
    card.classList.add(`delay-${delay}`);
});
