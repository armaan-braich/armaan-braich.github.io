const homeSection = document.getElementById('home');
const aboutSection = document.getElementById('about');
const skillsSection = document.getElementById('skills')
const fadeSection = document.getElementsByClassName('fade');
const bodySection = document.getElementsByTagName('body');
const allProjects = document.querySelectorAll('.project');

const chessBtn = document.getElementById("chessBtn");
const carBtn = document.getElementById("carBtn");
const tempestBtn = document.getElementById("tempestBtn");
const crashBtn = document.getElementById("crashBtn");
const messengerBtn = document.getElementById("messengerBtn");
const dnnBtn = document.getElementById("dnnBtn");
const recipeBtn = document.getElementById("recipeBtn");
const baccaratBtn = document.getElementById("baccaratBtn");
const osBtn = document.getElementById("osBtn");

const contactEmail = document.getElementById("email");
const contactPhone = document.getElementById("phone");

chessBtn.addEventListener("click", () => {
    window.location.href = "chess.html";
});

carBtn.addEventListener("click", () => {
    window.location.href = "car.html";
});

tempestBtn.addEventListener("click", () => {
    window.location.href = "tempest.html";
});

crashBtn.addEventListener("click", () => {
    window.location.href = "crash.html";
});

messengerBtn.addEventListener("click", () => {
    window.location.href = "messenger.html";
});

allProjects.forEach((project) => {
    project.addEventListener('click', () => expand(project));
});

dnnBtn.addEventListener("click", () => {
    window.location.href = "ha-dnn.html";
});

recipeBtn.addEventListener("click", () => {
    window.location.href = "recipe.html";
});

baccaratBtn.addEventListener("click", () => {
    window.location.href = "baccarat.html";
});

osBtn.addEventListener("click", () => {
    window.location.href = "os161.html";
});


contactEmail.addEventListener("click", () => {
    copyToClip("email");
});

contactPhone.addEventListener("click", () => {
    copyToClip("phone");
});

function copyToClip(type) {
    if (type === "email") {
        element = contactEmail;
        text = "armaanbraich@hotmail.com";
    }
    else {
        element = contactPhone;
        text = "2369994488";
    }
    navigator.clipboard.writeText(text).then(() => {
        const originalText = element.textContent;
        element.textContent = "Copied!";
        setTimeout(() => {
            element.textContent = originalText;
        }, 1500);
    });
}


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
    let originY = yPos < 0.33 ? "0%" : (yPos < 0.66) ? "50%" : "100%";

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