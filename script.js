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
