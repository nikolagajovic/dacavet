document.addEventListener('DOMContentLoaded', () => { 
    // --- Funkcije za Navigacioni Meni (Hamburger/X) ---
    function toggleMenu() {
        const navLinks = document.getElementById("navLinks");
        const menuIcon = document.getElementById("menuIcon");

        if (navLinks && menuIcon) {
            navLinks.classList.toggle("active");
            menuIcon.classList.toggle("rotated");

            if (menuIcon.classList.contains("fa-bars")) {
                menuIcon.classList.remove("fa-bars");
                menuIcon.classList.add("fa-times");
            } else {
                menuIcon.classList.remove("fa-times");
                menuIcon.classList.add("fa-bars");
            }

            const iconContainer = menuIcon.parentElement;
            if (iconContainer) {
                const isExpanded = navLinks.classList.contains("active");
                iconContainer.setAttribute("aria-expanded", isExpanded);
            }
        }
    }

    const menuToggleButton = document.querySelector('.icon'); 
    if (menuToggleButton) {
        menuToggleButton.addEventListener('click', toggleMenu);
    }
   
    // --- Funkcije za Scroll-to-Top dugme ---
    function scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }

    const scrollTopBtn = document.getElementById("scrollTopBtn");
    const navbar = document.getElementById("navbar");

    window.onscroll = function () {
        if (scrollTopBtn) {
            if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
                scrollTopBtn.style.display = "flex";
            } else {
                scrollTopBtn.style.display = "none";
            }
        }

        if (navbar) { 
            if (window.pageYOffset > 50) {
                navbar.classList.add("transparent-navbar");
            } else {
                navbar.classList.remove("transparent-navbar");
            }
        }
    };

    if (scrollTopBtn) {
        scrollTopBtn.addEventListener('click', scrollToTop);
    }

 // --- Lightbox Galerija ---
    const galleryItems = document.querySelectorAll('.gallery-item img');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const closeBtn = document.querySelector('.close-btn');
    const body = document.body;

    // Funkcija za otvaranje lightboxa
    galleryItems.forEach(item => {
        item.addEventListener('click', (e) => {
            // Dodata provera da li svi potrebni elementi postoje pre manipulacije
            if (lightbox && lightboxImg && body) {
                lightbox.classList.add('active');
                lightboxImg.src = e.target.src;
                body.classList.add('lightbox-open');
                body.style.overflow = 'hidden';
            }
        });
    });

    // Funkcija za zatvaranje lightboxa
    function closeLightbox() {
        // Dodata provera da li svi potrebni elementi postoje pre manipulacije
        if (lightbox && body) {
            lightbox.classList.remove('active');
            body.classList.remove('lightbox-open');
            body.style.overflow = 'auto';
        }
    }

    if (closeBtn) {
        closeBtn.addEventListener('click', closeLightbox);
    }

    if (lightbox) {
        lightbox.addEventListener('click', (e) => {
            // Zatvara se samo ako je kliknuto direktno na pozadinu lightboxa
            if (e.target === lightbox) {
                closeLightbox();
            }
        });
    }

    document.addEventListener('keydown', (e) => {
        if (lightbox && lightbox.classList.contains('active') && e.key === 'Escape') {
            closeLightbox();
        }
    });

    // --- Animacije ---
    const allObservedElements = [
        ...document.querySelectorAll('.service-box'),
        document.querySelector('.map-container')
    ];

    document.querySelectorAll('.service-box').forEach((box, i) => {
        box.classList.add(`delay-${i + 1}`);
    });

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            } else {
                entry.target.classList.remove('visible');
            }
        });
    }, {
        threshold: 0.2
    });

    allObservedElements.forEach(el => {
        observer.observe(el);
    });

});