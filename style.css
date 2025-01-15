// Carousel JavaScript
const slides = document.querySelectorAll('.carousel-slide');
const totalSlides = slides.length;
const prevButton = document.querySelector('.carousel-btn.prev');
const nextButton = document.querySelector('.carousel-btn.next');
const dotsContainer = document.querySelector('.carousel-dots');

let currentIndex = 0;

// Create navigation dots
slides.forEach((_, index) => {
    const dot = document.createElement('button');
    dot.classList.add('dot');
    if (index === 0) dot.classList.add('active');
    dotsContainer.appendChild(dot);
    dot.addEventListener('click', () => goToSlide(index));
});

const dots = document.querySelectorAll('.dot');

function updateDots() {
    dots.forEach(dot => dot.classList.remove('active'));
    dots[currentIndex].classList.add('active');
}

function goToSlide(index) {
    currentIndex = index;
    const offset = index * -100;
    document.querySelector('.carousel-container').style.transform = `translateX(${offset}%)`;
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
setInterval(nextSlide, 5000);
