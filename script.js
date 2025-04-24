const homeSection = document.getElementById('home');
const aboutSection = document.getElementById('about');
const skillsSection = document.getElementById('skills')
const fadeSection = document.getElementsByClassName('fade');
const bodySection = document.getElementsByTagName('body');
const allProjects = document.querySelectorAll('.project');

const chess = document.getElementById("chess");
const car = document.getElementById("car");
const tempest = document.getElementById("tempest");
const crash = document.getElementById("crash");
const messenger = document.getElementById("messenger");
const dnn = document.getElementById("dnn");
const recipe = document.getElementById("recipe");
const baccarat = document.getElementById("baccarat");
const os161 = document.getElementById("os161");

const contactEmail = document.getElementById("email");
const contactPhone = document.getElementById("phone");

chess.addEventListener("click", () => {
    window.location.href = "chess.html";
});

car.addEventListener("click", () => {
    window.location.href = "car.html";
});

tempest.addEventListener("click", () => {
    window.location.href = "tempest.html";
});

crash.addEventListener("click", () => {
    window.location.href = "crash.html";
});

messenger.addEventListener("click", () => {
    window.location.href = "messenger.html";
});

dnn.addEventListener("click", () => {
    window.location.href = "ha-dnn.html";
});

recipe.addEventListener("click", () => {
    window.location.href = "recipe.html";
});

baccarat.addEventListener("click", () => {
    window.location.href = "baccarat.html";
});

os161.addEventListener("click", () => {
    window.location.href = "os161.html";
});


contactEmail.addEventListener("click", () => {
    copyToClip("email");
});

contactPhone.addEventListener("click", () => {
    copyToClip("phone");
});

function copyToClip(type) {
    var element;
    var text;
    var originalText;
    
    if (type === "email") {
        element = contactEmail;
        text = "armaanbraich@hotmail.com";
        originalText = "Email";
    }
    else {
        element = contactPhone;
        text = "2369994488";
        originalText = "Phone";
    }

    navigator.clipboard.writeText(text).then(() => {
        element.textContent = "Copied!";
        setTimeout(() => {
            element.textContent = originalText;
        }, 1500);
    });
}
