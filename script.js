// Carousel & interactions
document.addEventListener('DOMContentLoaded', () => {
    const slides = document.querySelectorAll('.carousel-slide');
    const totalSlides = slides.length;
    const prevButton = document.querySelector('.carousel-btn.prev');
    const nextButton = document.querySelector('.carousel-btn.next');
    const dotsContainer = document.querySelector('.carousel-dots');
    const carouselContainer = document.querySelector('.carousel-container');

    if (slides.length && dotsContainer && carouselContainer && prevButton && nextButton) {
        let currentIndex = 0;

        // Create navigation dots
        slides.forEach((_, index) => {
            const dot = document.createElement('button');
            dot.classList.add('dot');
            dot.setAttribute('aria-label', `Go to slide ${index + 1}`);
            if (index === 0) dot.classList.add('active');
            dotsContainer.appendChild(dot);
            dot.addEventListener('click', () => goToSlide(index));
        });

        const dots = dotsContainer.querySelectorAll('.dot');

        function updateDots() {
            dots.forEach(dot => dot.classList.remove('active'));
            if (dots[currentIndex]) {
                dots[currentIndex].classList.add('active');
            }
        }

        function goToSlide(index) {
            currentIndex = index;
            const offset = index * -100;
            carouselContainer.style.transform = `translateX(${offset}%)`;
            updateDots();
        }

        function nextSlide() {
            currentIndex = (currentIndex + 1) % totalSlides;
            goToSlide(currentIndex);
        }

        function prevSlide() {
            currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
            goToSlide(currentIndex);
        }

        prevButton.addEventListener('click', prevSlide);
        nextButton.addEventListener('click', nextSlide);

        // Auto-play functionality
        let autoPlay = setInterval(nextSlide, 5000);

        // Pause on hover
        carouselContainer.addEventListener('mouseenter', () => clearInterval(autoPlay));
        carouselContainer.addEventListener('mouseleave', () => {
            autoPlay = setInterval(nextSlide, 5000);
        });
    }

    // Smooth scroll for nav links
    const navLinks = document.querySelectorAll('.main-nav a[href^="#"], .footer-links a[href^="#"], .btn-secondary[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const targetId = link.getAttribute('href');
            if (!targetId || targetId === '#') return;
            const target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                const headerOffset = document.querySelector('.site-header')?.offsetHeight || 0;
                const rect = target.getBoundingClientRect();
                const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
                const offsetTop = rect.top + scrollTop - headerOffset - 12;

                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Configure contact details / WhatsApp links from central config
    if (window.BITES_CONTACT_CONFIG) {
        const { whatsappNumber, phoneNumberDisplay, defaultMessage, address } = window.BITES_CONTACT_CONFIG;

        // Update WhatsApp links (hero + contact section)
        const whatsappLinks = document.querySelectorAll('.js-whatsapp-link');
        if (whatsappLinks.length && whatsappNumber) {
            whatsappLinks.forEach(link => {
                const phone = link.dataset.phone || whatsappNumber;
                const msg = link.dataset.message || defaultMessage;
                const base = `https://wa.me/${encodeURIComponent(phone)}`;
                const url = msg
                    ? `${base}?text=${encodeURIComponent(msg)}`
                    : base;
                link.setAttribute('href', url);
            });
        }

        // Update contact details block
        const contactDetails = document.querySelector('.contact-details');
        if (contactDetails) {
            const phoneEl = contactDetails.querySelector('.contact-phone');
            const addressEl = contactDetails.querySelector('.contact-address');
            if (phoneEl && phoneNumberDisplay) {
                phoneEl.textContent = phoneNumberDisplay;
            }
            if (addressEl && address) {
                addressEl.textContent = address;
            }
        }
    }

    // Set footer year
    const yearSpan = document.getElementById('year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear().toString();
    }
});
