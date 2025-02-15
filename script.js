const homeSection = document.getElementById('home');
const aboutSection = document.getElementById('about');
const skillsSection = document.getElementById('skills')
const fadeSection = document.getElementsByClassName('fade');
const bodySection = document.getElementsByTagName('body');
const allProjects = document.querySelectorAll('.project');

allProjects.forEach((project) => {
    project.addEventListener('click', () => expand(project));
});

function fadeOnScroll() {
    const scrollPosition = window.scrollY;
    const transY = scrollPosition;

    if (scrollPosition > 100) {
        skillsSection.style.transform = 'translateX(25%)';
        skillsSection.style.opacity = '1';
    }
    if (scrollPosition > 0) {
        aboutSection.style.transform = `translateX(25%)`;
        aboutSection.style.opacity = '1';
        homeSection.style.transform = `translateX(-75%)`;
    }
    else {
        aboutSection.style.transform = 'translateX(200%)';
        aboutSection.style.opacity = '0';
        skillsSection.style.transform = 'translateX(200%)';
        skillsSection.style.opacity = '0';
        homeSection.style.transform = 'translateX(0)';
        homeSection.style.opacity = '1';
    }

    if (transY < 200) {
        for (let i = 0; i < fadeSection.length; i++) {
            bodySection[i].style.transform = `translateY(${transY}px)`;  // Apply the transform individually
        }
    }
}

function expand(project) {
    const allProjects = document.getElementById("all-projects");
    const rect = project.getBoundingClientRect();
    const parentRect = allProjects.getBoundingClientRect();

    // Calculate relative position
    const xPos = (rect.left - parentRect.left) / parentRect.width;
    const yPos = (rect.top - parentRect.top) / parentRect.height;

    // Determine transform-origin based on position
    let originX = xPos < 0.33 ? "0%" : xPos > 0.66 ? "100%" : "50%";
    let originY = yPos < 0.5 ? "0%" : "100%";

    // Apply transform-origin and expand
    project.style.transformOrigin = `${originX} ${originY}`;

    // Collapse any other expanded projects
    document.querySelectorAll('.project.expanded').forEach((p) => {
        if (p !== project) p.classList.remove('expanded');
    });

    // Toggle expansion
    project.classList.toggle("expanded");
}

window.addEventListener('scroll', fadeOnScroll);