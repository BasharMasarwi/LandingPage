const navigation = document.getElementById('navbar__list');
const sections = document.querySelectorAll('section');

// Function to build the navigation menu dynamically
const navBuilder = () => {
    let navUI = '';
    sections.forEach(section => {
        const sectionID = section.id;
        const sectionDataNav = section.dataset.nav;
        navUI += `<li><a class="menu__link" href="#${sectionID}">${sectionDataNav}</a></li>`;
    });
    navigation.innerHTML = navUI;
};

navBuilder();

// Function to get the offset of a section
const offset = (section) => {
    return Math.floor(section.getBoundingClientRect().top);
};

// Function to remove active class from a section
const removeActive = (section) => {
    section.classList.remove('your-active-class');
};

// Function to add active class to a section
const addActive = (conditional, section) => {
    if (conditional) {
        section.classList.add('your-active-class');
    }
};

// Function to activate section based on scroll position
const sectionActivation = () => {
    sections.forEach(section => {
        const elementOffset = offset(section);
        const inViewport = () => elementOffset < 150 && elementOffset >= -150;
        removeActive(section);
        addActive(inViewport(), section);
    });
};

window.addEventListener('scroll', () => {
    sectionActivation();
    highlightNav();
});

// Function to highlight active navigation item
const highlightNav = () => {
    const links = document.querySelectorAll('.menu__link');
    sections.forEach(section => {
        const sectionID = section.id;
        const sectionOffset = offset(section);
        const inViewport = sectionOffset < 150 && sectionOffset >= -150;
        links.forEach(link => {
            if (link.getAttribute('href').substring(1) === sectionID) {
                link.classList.remove('active');
                if (inViewport) {
                    link.classList.add('active');
                }
            }
        });
    });
};

// Function to implement smooth scrolling
const sectionScroll = (link) => {
    link.preventDefault();
    const targetId = link.getAttribute('href');
    const targetSection = document.querySelector(targetId);
    targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
};

// Function to add event listeners for smooth scrolling
const scrolling = () => {
    const links = document.querySelectorAll('.menu__link');
    links.forEach(link => {
        link.addEventListener('click', (event) => {
            sectionScroll(event.target);
        });
    });
};

scrolling();
