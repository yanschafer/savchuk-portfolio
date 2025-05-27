document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS animation library
    AOS.init({
        duration: 800,
        easing: 'ease',
        once: true,
        offset: 100
    });

    // Header scroll effect
    const header = document.querySelector('.header');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Mobile menu toggle
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav');
    const overlay = document.querySelector('.overlay');
    const body = document.body;
    const contactBtnSidebar = document.getElementById('contactBtnSidebar');

    burger.addEventListener('click', function() {
        nav.classList.toggle('nav--active');
        overlay.classList.toggle('active');
        burger.classList.toggle('active');
        body.classList.toggle('no-scroll');
    });

    // Close mobile menu when clicking on the overlay
    overlay.addEventListener('click', function() {
        nav.classList.remove('nav--active');
        overlay.classList.remove('active');
        burger.classList.remove('active');
        body.classList.remove('no-scroll');
    });

    // Close mobile menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav__link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            nav.classList.remove('nav--active');
            overlay.classList.remove('active');
            burger.classList.remove('active');
            body.classList.remove('no-scroll');
        });
    });
    
    // Add contact popup functionality to the sidebar button
    if (contactBtnSidebar) {
        contactBtnSidebar.addEventListener('click', function() {
            const contactPopup = document.getElementById('contactPopup');
            if (contactPopup) {
                contactPopup.classList.add('active');
                document.body.style.overflow = 'hidden';
                nav.classList.remove('nav--active');
                overlay.classList.remove('active');
            }
        });
    }

    // Contact popup functionality
    initContactPopup();

    // Parallax effect for hero section
    const parallaxBg = document.getElementById('parallax-bg');
    if (parallaxBg) {
        window.addEventListener('scroll', function() {
            const scrollPosition = window.pageYOffset;
            parallaxBg.style.transform = 'translateY(' + scrollPosition * 0.5 + 'px)';
        });
    }

    // Generate portfolio grid from albums
    generatePortfolio();

    // Testimonials slider
    initTestimonialsSlider();

    // Contact form submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // Here you would typically send the form data to a server
            alert('Спасибо за ваше сообщение! Мы свяжемся с вами в ближайшее время.');
            contactForm.reset();
        });
    }

    // Add scroll reveal animations to elements
    addScrollRevealAnimations();
});

function initContactPopup() {
    const contactBtnHeader = document.getElementById('contactBtnHeader');
    const contactBtnHero = document.getElementById('contactBtnHero');
    const contactBtnBottom = document.getElementById('contactBtnBottom');
    const aboutContactBtn = document.getElementById('aboutContactBtn');
    const contactButtons = document.querySelectorAll('.btn--contact, .btn--contact-header, .btn--contact-large');
    const contactPopup = document.getElementById('contactPopup');
    
    if (!contactPopup) return;
    
    const closeBtn = contactPopup.querySelector('.contact-popup__close');
    
    // Function to open popup
    function openPopup() {
        contactPopup.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    // Function to close popup
    function closePopup() {
        contactPopup.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    // Add click event to specific contact buttons
    if (contactBtnHeader) contactBtnHeader.addEventListener('click', openPopup);
    if (contactBtnHero) contactBtnHero.addEventListener('click', openPopup);
    if (contactBtnBottom) contactBtnBottom.addEventListener('click', openPopup);
    if (aboutContactBtn) aboutContactBtn.addEventListener('click', openPopup);
    
    // Add click event to all buttons with contact classes
    contactButtons.forEach(button => {
        button.addEventListener('click', openPopup);
    });
    
    // Close button event
    if (closeBtn) {
        closeBtn.addEventListener('click', closePopup);
    }
    
    // Close on click outside
    contactPopup.addEventListener('click', function(e) {
        if (e.target === contactPopup) {
            closePopup();
        }
    });
    
    // Close on ESC key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && contactPopup.classList.contains('active')) {
            closePopup();
        }
    });
}

// Generate portfolio grid from albums
function generatePortfolio() {
    const portfolioGrid = document.querySelector('.portfolio__grid');
    if (!portfolioGrid) return;

    // Album data
    const albums = [
        { id: '01', title: 'Десерты', image: 'assets/albums/01 десерты/cover.jpg' },
        { id: '02', title: 'Мясо', image: 'assets/albums/02 мясо/cover.jpg' },
        { id: '03', title: 'Напитки', image: 'assets/albums/03 напитки/cover.jpg' },
        { id: '04', title: 'Завтраки', image: 'assets/albums/04 завтраки/cover.jpg' },
        { id: '05', title: 'Выпечка', image: 'assets/albums/05 выпечка/cover.jpg' },
        { id: '06', title: 'Салаты', image: 'assets/albums/06 салаты/cover.jpg' }
    ];

    // Generate portfolio items
    albums.forEach(album => {
        const portfolioItem = document.createElement('div');
        portfolioItem.className = 'portfolio__item';
        portfolioItem.setAttribute('data-aos', 'fade-up');
        
        portfolioItem.innerHTML = `
            <a href="album.html?id=${album.id}" class="portfolio__link">
                <div class="portfolio__img-wrapper">
                    <img src="${album.image}" alt="${album.title}" class="portfolio__img">
                </div>
                <h3 class="portfolio__title">${album.title}</h3>
            </a>
        `;
        
        portfolioGrid.appendChild(portfolioItem);
    });
}

// Initialize testimonials slider
function initTestimonialsSlider() {
    const testimonialsContainer = document.querySelector('.testimonials__container');
    const prevBtn = document.querySelector('.testimonials__prev');
    const nextBtn = document.querySelector('.testimonials__next');
    
    if (!testimonialsContainer || !prevBtn || !nextBtn) return;
    
    let currentIndex = 0;
    const testimonials = document.querySelectorAll('.testimonial');
    const totalTestimonials = testimonials.length;
    
    // Hide all testimonials except the first one
    testimonials.forEach((testimonial, index) => {
        if (index !== 0) {
            testimonial.style.display = 'none';
        }
    });
    
    // Show specific testimonial
    function showTestimonial(index) {
        testimonials.forEach(testimonial => {
            testimonial.style.display = 'none';
        });
        testimonials[index].style.display = 'block';
    }
    
    // Previous button click
    prevBtn.addEventListener('click', function() {
        currentIndex = (currentIndex - 1 + totalTestimonials) % totalTestimonials;
        showTestimonial(currentIndex);
    });
    
    // Next button click
    nextBtn.addEventListener('click', function() {
        currentIndex = (currentIndex + 1) % totalTestimonials;
        showTestimonial(currentIndex);
    });
}

// Add scroll reveal animations
function addScrollRevealAnimations() {
    // This function can be used to add custom scroll animations
    // beyond what AOS provides
}

// Function to generate portfolio grid from albums
function generatePortfolio() {
    const portfolioGrid = document.querySelector('.portfolio__grid');
    if (!portfolioGrid) return;

    // Album data - using existing photos from the album folders
    const albums = [
        {
            id: '01',
            title: 'Десерты',
            thumbnail: 'assets/albums/01 десерты/food.jpg',
            url: 'album.html?id=01'
        },
        {
            id: '02',
            title: 'Закуски',
            thumbnail: 'assets/albums/02 закуски/zakuski (1).jpg',
            url: 'album.html?id=02'
        },
        {
            id: '03',
            title: 'Морепродукты',
            thumbnail: 'assets/albums/03 морепродукты/food.jpg',
            url: 'album.html?id=03'
        },
        {
            id: '04',
            title: 'Мясо',
            thumbnail: 'assets/albums/04 Мясо/food.jpg',
            url: 'album.html?id=04'
        },
        {
            id: '05',
            title: 'Рыба',
            thumbnail: 'assets/albums/05 Рыба/food.jpg',
            url: 'album.html?id=05'
        },
        {
            id: '06',
            title: 'Супы',
            thumbnail: 'assets/albums/06 Супы/food.jpg',
            url: 'album.html?id=06'
        },
        {
            id: '07',
            title: 'Салаты',
            thumbnail: 'assets/albums/07 Салаты/food.jpg',
            url: 'album.html?id=07'
        },
        {
            id: '08',
            title: 'Пицца',
            thumbnail: 'assets/albums/08 Пицца/food.jpg',
            url: 'album.html?id=08'
        },
        {
            id: '09',
            title: 'Напитки',
            thumbnail: 'assets/albums/09 Напитки/food.jpg',
            url: 'album.html?id=09'
        }
    ];

    // Create portfolio items
    albums.forEach((album, index) => {
        const portfolioItem = document.createElement('div');
        portfolioItem.className = 'portfolio-item';
        portfolioItem.setAttribute('data-aos', 'fade-up');
        portfolioItem.setAttribute('data-aos-delay', (index * 100).toString());

        portfolioItem.innerHTML = `
            <img src="${album.thumbnail}" alt="${album.title}" class="portfolio-item__img">
            <div class="portfolio-item__content">
                <h3 class="portfolio-item__title">${album.title}</h3>
                <a href="${album.url}" class="portfolio-item__btn">Подробнее</a>
            </div>
        `;

        portfolioItem.addEventListener('click', function() {
            window.location.href = album.url;
        });

        portfolioGrid.appendChild(portfolioItem);
    });
}

// Function to initialize testimonials slider
function initTestimonialsSlider() {
    const slides = document.querySelectorAll('.testimonials__slide');
    const prevBtn = document.querySelector('.testimonials__prev');
    const nextBtn = document.querySelector('.testimonials__next');
    
    if (!slides.length || !prevBtn || !nextBtn) return;

    let currentSlide = 0;

    // Show first slide
    slides[currentSlide].classList.add('active');

    // Function to show a specific slide
    function showSlide(index) {
        // Hide all slides
        slides.forEach(slide => slide.classList.remove('active'));
        
        // Show the selected slide
        slides[index].classList.add('active');
    }

    // Previous slide button
    prevBtn.addEventListener('click', function() {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(currentSlide);
    });

    // Next slide button
    nextBtn.addEventListener('click', function() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    });

    // Auto-rotate slides every 5 seconds
    setInterval(function() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }, 5000);
}

// Function to add scroll reveal animations
function addScrollRevealAnimations() {
    // This is handled by AOS library initialized at the top
    // Additional custom animations can be added here if needed
}

// Create album detail pages dynamically (would be implemented in a real project)
function createAlbumDetailPage(albumId) {
    // In a real project, this would create or navigate to album detail pages
    console.log(`Navigate to album ${albumId} detail page`);
}
