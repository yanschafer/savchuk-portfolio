document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS animation library
    AOS.init({
        duration: 800,
        easing: 'ease',
        once: true,
        offset: 100
    });
    
    // Initialize Swiper
    let swiper;

    // Get album ID from URL
    const urlParams = new URLSearchParams(window.location.search);
    const albumId = urlParams.get('id') || '01';
    
    loadAlbum(albumId);
    
    // Mobile menu toggle (same as in script.js)
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
    function initContactPopup() {
        const contactBtn = document.getElementById('contactBtn');
        const contactBtnHeader = document.getElementById('contactBtnHeader');
        const contactBtnBottom = document.getElementById('contactBtnBottom');
        const contactPopup = document.getElementById('contactPopup');
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
        
        // Add click event to all contact buttons
        if (contactBtn) contactBtn.addEventListener('click', openPopup);
        if (contactBtnHeader) contactBtnHeader.addEventListener('click', openPopup);
        if (contactBtnBottom) contactBtnBottom.addEventListener('click', openPopup);
        
        // Close button event
        closeBtn.addEventListener('click', closePopup);
        
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
    };

    initContactPopup();

    // This section is now handled in the mobile menu toggle section above

    // Header scroll effect
    const header = document.querySelector('.header');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
});

// Function to load album content
function loadAlbum(albumId) {
    // Album data mapping
    const albumData = {
        '01': {
            title: 'Десерты',
            folder: 'assets/albums/01 десерты'
        },
        '02': {
            title: 'Закуски',
            folder: 'assets/albums/02 закуски'
        },
        '03': {
            title: 'Морепродукты',
            folder: 'assets/albums/03 морепродукты'
        },
        '04': {
            title: 'Мясо',
            folder: 'assets/albums/04 Мясо'
        },
        '05': {
            title: 'Рыба',
            folder: 'assets/albums/05 Рыба'
        },
        '06': {
            title: 'Супы',
            folder: 'assets/albums/06 Супы'
        },
        '07': {
            title: 'Салаты',
            folder: 'assets/albums/07 Салаты'
        },
        '08': {
            title: 'Пицца',
            folder: 'assets/albums/08 Пицца'
        },
        '09': {
            title: 'Напитки',
            folder: 'assets/albums/09 Напитки'
        }
    };

    // Set album title
    const albumTitle = document.getElementById('albumTitle');
    if (albumTitle && albumData[albumId]) {
        albumTitle.textContent = albumData[albumId].title;
        document.title = `${albumData[albumId].title} | Алексей Савчук - Фотограф`;
    }

    // For the purpose of this demo, we'll use a predefined list of images
    // In a real project, you would fetch this data from a server or scan the directory
    const albumGallery = document.getElementById('albumGallery');
    
    if (albumGallery) {
        // Clear loading message
        albumGallery.innerHTML = '';
        
        // Sample images for album 02 (Закуски) - we know these exist
        if (albumId === '02') {
            const images = [
                'zakuski (1).jpg',
                'zakuski (5).jpg',
                'zakuski (6).jpg',
                'zakuski (12).jpg',
                'zakuski (14).jpg',
                'zakuski (15).jpg',
                'zakuski (18).jpg',
                'zakuski (20).JPG',
                'zakuski (35).jpg',
                'zakuski (38).jpg',
                'zakuski (50).jpg',
                'zakuski (51).jpg',
                'zakuski (52).jpg',
                'zakuski (60).jpg',
                'zakuski (61).jpg',
                'zakuski (62).jpg',
                'zakuski (63).jpg',
                'zakuski (66).jpg',
                'zakuski (69).jpg',
                'zakuski (71).jpg',
                'zakuski (72).jpg',
                'zakuski (74).jpg',
                'zakuski (79).jpg',
                'zakuski (98).jpg'
            ];
            
            // Set a random image as the header background
            setRandomHeaderBackground(albumData[albumId].folder, images);
            
            // Create gallery items for Swiper
            images.forEach((image, index) => {
                const galleryItem = document.createElement('div');
                galleryItem.className = 'swiper-slide';
                
                galleryItem.innerHTML = `
                    <div class="album-gallery__item">
                        <img src="${albumData[albumId].folder}/${image}" alt="${albumData[albumId].title}" class="album-gallery__img">
                    </div>
                `;
                
                // Add click event for lightbox
                galleryItem.addEventListener('click', function() {
                    openLightbox(albumData[albumId].folder, images, index);
                });
                
                albumGallery.appendChild(galleryItem);
            });
        } else {
            // For other albums, use generic food images
            const images = [];
            // Generate more images for a fuller gallery
            for (let i = 1; i <= 24; i++) {
                const imgNum = i > 1 ? '_' + i : '';
                // Use a repeating pattern if we don't have enough images
                const imgName = `food${imgNum}.jpg`;
                images.push(imgName);
            }
            
            // Set a random image as the header background
            setRandomHeaderBackground(albumData[albumId].folder, images);
            
            // Create gallery items for Swiper
            images.forEach((image, index) => {
                const galleryItem = document.createElement('div');
                galleryItem.className = 'swiper-slide';
                
                galleryItem.innerHTML = `
                    <div class="album-gallery__item">
                        <img src="${albumData[albumId].folder}/${image}" alt="${albumData[albumId].title}" class="album-gallery__img">
                    </div>
                `;
                
                // Add click event for lightbox
                galleryItem.addEventListener('click', function() {
                    openLightbox(albumData[albumId].folder, images, index);
                });
                
                albumGallery.appendChild(galleryItem);
            });
        }
        
        // Initialize Swiper after adding all slides
        swiper = new Swiper('.album-swiper', {
            slidesPerView: 1,
            spaceBetween: 20,
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            // Enable swipe navigation
            grabCursor: true,
            keyboard: {
                enabled: true,
            },
            breakpoints: {
                // When window width is >= 640px
                640: {
                    slidesPerView: 2,
                    spaceBetween: 30
                },
                // When window width is >= 768px
                768: {
                    slidesPerView: 3,
                    spaceBetween: 30
                },
                // When window width is >= 1024px
                1024: {
                    slidesPerView: 3,
                    spaceBetween: 40
                }
            },
            on: {
                init: function() {
                    updatePhotoCounter(this);
                },
                slideChange: function() {
                    updatePhotoCounter(this);
                }
            }
        });
        
        // Function to update the photo counter
        function updatePhotoCounter(swiper) {
            const counterElement = document.querySelector('.swiper-counter');
            if (counterElement) {
                const currentIndex = swiper.activeIndex + 1;
                const totalSlides = swiper.slides.length;
                counterElement.textContent = `${currentIndex}/${totalSlides}`;
            }
        }
    }
}

// Function to open lightbox
function openLightbox(folderPath, images, currentIndex) {
    const lightbox = document.getElementById('lightbox');
    
    if (!lightbox) return;
    
    // Clear any existing content and create lightbox content
    lightbox.innerHTML = `
        <div class="lightbox__content">
            <img src="" alt="" class="lightbox__img">
            <button class="lightbox__close" aria-label="Закрыть"><i class="fas fa-times"></i></button>
            <div class="lightbox__nav">
                <button class="lightbox__prev" aria-label="Предыдущее фото"><i class="fas fa-chevron-left"></i></button>
                <button class="lightbox__next" aria-label="Следующее фото"><i class="fas fa-chevron-right"></i></button>
            </div>
            <div class="lightbox__counter">1 / 1</div>
        </div>
    `;
        
    // Close lightbox when clicking on the background
    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });
    
    // Close button event
    const closeBtn = lightbox.querySelector('.lightbox__close');
    closeBtn.addEventListener('click', closeLightbox);
    
    // Navigation buttons
    const prevBtn = lightbox.querySelector('.lightbox__prev');
    const nextBtn = lightbox.querySelector('.lightbox__next');
    
    prevBtn.addEventListener('click', function() {
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        updateLightboxImage(folderPath, images[currentIndex]);
        updateCounter(currentIndex, images.length);
    });
    
    nextBtn.addEventListener('click', function() {
        currentIndex = (currentIndex + 1) % images.length;
        updateLightboxImage(folderPath, images[currentIndex]);
        updateCounter(currentIndex, images.length);
    });
        
    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (!lightbox.classList.contains('active')) return;
        
        if (e.key === 'Escape') {
            closeLightbox();
        } else if (e.key === 'ArrowLeft') {
            currentIndex = (currentIndex - 1 + images.length) % images.length;
            updateLightboxImage(folderPath, images[currentIndex]);
            updateCounter(currentIndex, images.length);
        } else if (e.key === 'ArrowRight') {
            currentIndex = (currentIndex + 1) % images.length;
            updateLightboxImage(folderPath, images[currentIndex]);
            updateCounter(currentIndex, images.length);
        }
    });
    
    // Add touch swipe functionality for mobile
    let touchStartX = 0;
    let touchEndX = 0;
    
    const lightboxContent = lightbox.querySelector('.lightbox__content');
    
    lightboxContent.addEventListener('touchstart', function(e) {
        touchStartX = e.changedTouches[0].screenX;
    }, false);
    
    lightboxContent.addEventListener('touchend', function(e) {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, false);
    
    function handleSwipe() {
        const swipeThreshold = 50; // Minimum distance to be considered a swipe
        
        if (touchEndX < touchStartX - swipeThreshold) {
            // Swipe left - show next image
            currentIndex = (currentIndex + 1) % images.length;
            updateLightboxImage(folderPath, images[currentIndex]);
            updateCounter(currentIndex, images.length);
        }
        
        if (touchEndX > touchStartX + swipeThreshold) {
            // Swipe right - show previous image
            currentIndex = (currentIndex - 1 + images.length) % images.length;
            updateLightboxImage(folderPath, images[currentIndex]);
            updateCounter(currentIndex, images.length);
        }
    }

    
    // Update image and show lightbox
    updateLightboxImage(folderPath, images[currentIndex]);
    updateCounter(currentIndex, images.length);
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent scrolling
}

// Function to update the counter in the lightbox
function updateCounter(currentIndex, totalImages) {
    const counter = document.querySelector('.lightbox__counter');
    if (counter) {
        counter.textContent = `${currentIndex + 1} / ${totalImages}`;
    }
}

// Function to update lightbox image
function updateLightboxImage(folderPath, imageName) {
    const lightboxImg = document.querySelector('.lightbox__img');
    if (lightboxImg) {
        lightboxImg.src = `${folderPath}/${imageName}`;
    }
}

// Function to close lightbox
function closeLightbox() {
    const lightbox = document.querySelector('.lightbox');
    if (lightbox) {
        lightbox.classList.remove('active');
        document.body.style.overflow = ''; // Restore scrolling
    }
}

// Function to set a random image as the header background
function setRandomHeaderBackground(folderPath, images) {
    if (!images || images.length === 0) return;
    
    // Get a random image from the array
    const randomIndex = Math.floor(Math.random() * images.length);
    const randomImage = images[randomIndex];
    
    // Set it as the header background
    const headerBg = document.getElementById('albumHeaderBg');
    if (headerBg) {
        headerBg.src = `${folderPath}/${randomImage}`;
        headerBg.alt = 'Album background';
    }
}
