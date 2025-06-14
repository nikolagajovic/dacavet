function toggleMenu() {
    const navLinks = document.getElementById("navLinks");
    const menuIcon = document.getElementById("menuIcon");

    navLinks.classList.toggle("active");

    if (menuIcon.classList.contains("fa-bars")) {
        menuIcon.classList.remove("fa-bars");
        menuIcon.classList.add("fa-times");
    } else {
        menuIcon.classList.remove("fa-times");
        menuIcon.classList.add("fa-bars");
    }
}

window.onscroll = function () {
    const btn = document.getElementById("scrollTopBtn");
    if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
        btn.style.display = "flex";
    } else {
        btn.style.display = "none";
    }

    var navbar = document.getElementById("navbar");
    if (window.pageYOffset > 50) {
        navbar.classList.add("transparent-navbar");
    } else {
        navbar.classList.remove("transparent-navbar");
    }
};

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// animations

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

