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

    function closeMenu() {
        const navLinks = document.getElementById("navLinks");
        const menuIcon = document.getElementById("menuIcon");
        if (navLinks && menuIcon && navLinks.classList.contains("active")) {
            navLinks.classList.remove("active");
            menuIcon.classList.remove("rotated");
            menuIcon.classList.remove("fa-times");
            menuIcon.classList.add("fa-bars");
            const iconContainer = menuIcon.parentElement;
            if (iconContainer) {
                iconContainer.setAttribute("aria-expanded", false);
            }
        }
    }

    document.addEventListener('click', (event) => {
        const navBar = document.getElementById('navbar');
        const navLinksContainer = document.getElementById("navLinks");

        if (navBar && navBar.contains(event.target)) {
            return;
        }

        // Ako je kliknuto van nav bara, a meni je otvoren, zatvori ga.
        if (navLinksContainer && navLinksContainer.classList.contains('active')) {
            closeMenu();
        }
    });


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

    // Lightbox Galerija
    const galleryContainer = document.querySelector('.gallery');
    const allGalleryItems = galleryContainer ? galleryContainer.querySelectorAll('.gallery-item') : [];
    const prevPageBtn = document.getElementById('prevPageBtn');
    const nextPageBtn = document.getElementById('nextPageBtn');
    const pageNumbersContainer = document.getElementById('pageNumbers');

    const itemsPerPage = 6; // Broj slika po stranici
    let currentPage = 1;
    let totalPages = 0;

    // Lightbox elementi
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const closeBtn = document.querySelector('.close-btn');
    const prevImgBtn = document.getElementById('prevImgBtn');
    const nextImgBtn = document.getElementById('nextImgBtn');
    const body = document.body;

    let currentLightboxIndex = 0; // Prati indeks slike koja je trenutno u lightboxu

    // Proveri da li svi potrebni elementi postoje pre nego što se pokrene logika
    if (galleryContainer && allGalleryItems.length > 0 && prevPageBtn && nextPageBtn && pageNumbersContainer && lightbox && lightboxImg && closeBtn && prevImgBtn && nextImgBtn && body) {

        totalPages = Math.ceil(allGalleryItems.length / itemsPerPage);

        // Funkcija za prikazivanje određene stranice galerije
        function displayPage(page) {
            // Sakrij sve slike
            allGalleryItems.forEach(item => {
                item.classList.remove('visible-page');
            });

            // Odredi koje slike treba prikazati na trenutnoj stranici
            const startIndex = (page - 1) * itemsPerPage;
            const endIndex = Math.min(startIndex + itemsPerPage, allGalleryItems.length);

            for (let i = startIndex; i < endIndex; i++) {
                allGalleryItems[i].classList.add('visible-page');
            }

            // Ažuriraj stanje dugmadi za paginaciju
            prevPageBtn.disabled = page === 1;
            nextPageBtn.disabled = page === totalPages;

            // Ažuriraj brojeve stranica
            updatePageNumbers();

            document.getElementById('gallery').scrollIntoView({ behavior: 'smooth', block: 'start' });
        }

        // Funkcija za ažuriranje brojeva stranica
        function updatePageNumbers() {
            pageNumbersContainer.innerHTML = ''; // Očisti prethodne brojeve
            for (let i = 1; i <= totalPages; i++) {
                const pageSpan = document.createElement('span');
                pageSpan.textContent = i;
                pageSpan.classList.add('page-number-item');
                if (i === currentPage) {
                    pageSpan.classList.add('active-page');
                }
                pageSpan.addEventListener('click', () => {
                    currentPage = i;
                    displayPage(currentPage);
                });
                pageNumbersContainer.appendChild(pageSpan);
            }
        }

        // Event listeneri za dugmad paginacije
        prevPageBtn.addEventListener('click', () => {
            if (currentPage > 1) {
                currentPage--;
                displayPage(currentPage);
            }
        });

        nextPageBtn.addEventListener('click', () => {
            if (currentPage < totalPages) {
                currentPage++;
                displayPage(currentPage);
            }
        });

        // Inicijalni prikaz prve stranice galerije
        displayPage(currentPage);

        // --- Lightbox Funkcionalnost sa navigacijom ---

        // Event listener za otvaranje lightboxa
        allGalleryItems.forEach((item, index) => {
            const imgElement = item.querySelector('img');
            if (imgElement) {
                imgElement.addEventListener('click', () => {
                    lightbox.classList.add('active');
                    body.classList.add('lightbox-open');
                    body.style.overflow = 'hidden'; // Sprečava skrolovanje pozadine
                    currentLightboxIndex = index;
                    showLightboxImage(currentLightboxIndex);
                });
            }
        });

        // Funkcija za prikazivanje slike u lightboxu
        function showLightboxImage(index) {
            if (index < 0) {
                currentLightboxIndex = allGalleryItems.length - 1; // Vrati se na poslednju
            } else if (index >= allGalleryItems.length) {
                currentLightboxIndex = 0; // Pređi na prvu
            } else {
                currentLightboxIndex = index;
            }
            const imgElement = allGalleryItems[currentLightboxIndex].querySelector('img');
            if (imgElement) {
                lightboxImg.src = imgElement.src;

                // Prikazi broj slika
                const counter = document.getElementById('lightbox-counter');
                if (counter) {
                    counter.textContent = `${currentLightboxIndex + 1} / ${allGalleryItems.length}`;
                }
            }
        }

        // Event listeneri za dugmad u lightboxu
        prevImgBtn.addEventListener('click', () => {
            showLightboxImage(currentLightboxIndex - 1);
        });

        nextImgBtn.addEventListener('click', () => {
            showLightboxImage(currentLightboxIndex + 1);
        });

        // Funkcija za zatvaranje lightboxa
        function closeLightbox() {
            lightbox.classList.remove('active');
            body.classList.remove('lightbox-open');
            body.style.overflow = 'auto'; // Vraća skrolovanje pozadine
        }

        // Event listeneri za zatvaranje lightboxa
        closeBtn.addEventListener('click', closeLightbox);
        lightbox.addEventListener('click', (e) => {
            // Zatvori lightbox ako se klikne izvan slike ili navigacionih dugmadi
            if (e.target === lightbox || e.target === closeBtn) {
                closeLightbox();
            }
        });
        document.addEventListener('keydown', (e) => {
            // Zatvori na Escape taster
            if (lightbox.classList.contains('active') && e.key === 'Escape') {
                closeLightbox();
            }
            // Navigacija strelicama unutar lightboxa
            if (lightbox.classList.contains('active')) {
                if (e.key === 'ArrowLeft') {
                    showLightboxImage(currentLightboxIndex - 1);
                } else if (e.key === 'ArrowRight') {
                    showLightboxImage(currentLightboxIndex + 1);
                }
            }
        });

    } else {
        // Ako nema dovoljno slika za paginaciju, ili nedostaju elementi za paginaciju/lightbox,
        // sakrij dugmad paginacije i prikaži sve slike u galeriji (bez paginacije).
        if (prevPageBtn) prevPageBtn.style.display = 'none';
        if (nextPageBtn) nextPageBtn.style.display = 'none';
        if (pageNumbersContainer) pageNumbersContainer.style.display = 'none';

        // Prikaz svih slika ako paginacija nije aktivna
        allGalleryItems.forEach(item => {
            item.classList.add('visible-page'); // Prikazuje sve slike
        });

        // Ako galerija postoji, ali lightbox ili njegova dugmad ne postoje,
        // onemogući lightbox funkcionalnost na slikama.
        if (galleryContainer) {
            allGalleryItems.forEach(item => {
                const imgElement = item.querySelector('img');
                if (imgElement) {
                    imgElement.style.cursor = 'default'; // Ukloni pointer kursor
                }
            });
        }
    }


    // --- Animacije ---
    const serviceBoxes = document.querySelectorAll('.service-box');
    const map = document.querySelector('.map-container');

    // Dodavanje delay klasa svakoj kartici redom
    serviceBoxes.forEach((box, i) => {
        box.classList.add(`delay-${i + 1}`);
    });

    const allObservedElements = [...serviceBoxes];
    if (map) allObservedElements.push(map);

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

    allObservedElements.forEach(el => observer.observe(el));


});