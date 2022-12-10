let landingPage = document.querySelector(".landing-page");
let settingBox = document.querySelector(".settings-box");
let gear = document.querySelector(".toggle-container");
let icon = document.querySelector(".toggle-container .fa-gear");
let colors = document.querySelectorAll(".color-list li");
let spans = document.querySelectorAll(".span-container span");
let randomMood = true;
let interval;
//search in locale storage
let eleFromLocale = localStorage.getItem("option_color");
if (eleFromLocale !== null) {
    document.documentElement.style.setProperty("--main-color--", eleFromLocale);
    colors.forEach((ele) => {
        ele.classList.remove("active");
        if (ele.dataset.color === eleFromLocale) {
            ele.classList.add("active");
        }
    });
}
let randomFromLocale = localStorage.getItem("random_option");
if (randomFromLocale !== null) {
    if (randomFromLocale === "true") {
        randomMood = true;
    } else {
        randomMood = false;
    }
    spans.forEach((ele) => {
        ele.classList.remove("active");
        if (randomFromLocale === "true") {
            document.querySelector(".yes").classList.add("active");
        } else {
            document.querySelector(".no").classList.add("active");
        }
    });
}
//search in locale storage
//change background img
let arrayOfImgs = [
    "01.jpg",
    "02.jpg",
    "03.jpg",
    "04.jpg",
    "05.jpg",
    "06.png",
    "07.jpg",
    "08.jpg",
    "09.jpg",
    "10.jpg",
];
let randomNum;
function timeOut() {
    if (randomMood === true) {
        interval = setInterval(() => {
            randomNum = Math.floor(Math.random() * arrayOfImgs.length);
            landingPage.style.background = `url("/image/${arrayOfImgs[randomNum]}")`;
        }, 1000);
    }
}
timeOut();
//change background img

//icon to open bar
gear.onclick = function () {
    settingBox.classList.toggle("open");
    icon.classList.toggle("open");
};
//icon to open bar

//change color
colors.forEach((ele) => {
    ele.addEventListener("click", (e) => {
        document.documentElement.style.setProperty(
            "--main-color--",
            e.target.dataset.color
        );
        removeActive(e);
        localStorage.setItem("option_color", e.target.dataset.color);
    });
});
//change color

//change random mode
spans.forEach((ele) => {
    ele.addEventListener("click", (e) => {
        removeActive(e);
        if (e.target.dataset.background === "yes") {
            randomMood = true;
            localStorage.setItem("random_option", "true");
            timeOut();
        } else if (e.target.dataset.background === "no") {
            randomMood = false;
            localStorage.setItem("random_option", "false");
            clearInterval(interval);
        }
    });
});
//change random mode
//full progress
let skills = document.querySelector(".skills");
window.onscroll = function () {
    let skillsOfSetTop = skills.offsetTop;
    let skillsOuterHeight = skills.offsetHeight;
    let windowHeight = this.innerHeight;
    let windowScrollTop = this.pageYOffset;
    if (windowScrollTop > skillsOfSetTop + skillsOuterHeight - windowHeight) {
        let spans = document.querySelectorAll(
            ".skills .skills-box .skill-progress span"
        );
        spans.forEach((ele) => {
            ele.style.width = ele.dataset.progress;
        });
    }
};
//full progress
//gallery
let images = document.querySelectorAll(".gallery .imgs-box img");
images.forEach((img) => {
    img.addEventListener("click", (e) => {
        let overlayDiv = document.createElement("div");
        if (img.alt !== null) {
            let headerAlt = document.createElement("h2");
            let h2Text = document.createTextNode(img.alt);
            headerAlt.className = "header-overlay";
            headerAlt.appendChild(h2Text);
            overlayDiv.appendChild(headerAlt);
        }
        overlayDiv.classList = "overlay-img";
        let image = document.createElement("img");
        image.className = "img-overlay";
        image.src = e.target.src;
        overlayDiv.appendChild(image);
        document.body.appendChild(overlayDiv);
        let button = document.createElement("span");
        button.classList = "close-overlay";
        button.appendChild(document.createTextNode("X"));
        overlayDiv.appendChild(button);
    });
});
document.addEventListener("click", (e) => {
    if (e.target.className === "close-overlay") {
        document.querySelector(".overlay-img").remove();
    }
});
//gallery
const allLinks = document.querySelectorAll(".landing-page .header-area a");
const allBullets = document.querySelectorAll(".nav-bullets .bullets");
function gotoSection(elements) {
    elements.forEach((ele) => {
        ele.addEventListener("click", (e) => {
            document.querySelector(e.target.dataset.section).scrollIntoView({
                behavior: "smooth",
            });
            e.preventDefault();
        });
    });
}
gotoSection(allBullets);
gotoSection(allLinks);

function removeActive(e) {
    e.target.parentElement.querySelectorAll(".active").forEach((e) => {
        e.classList.remove("active");
    });
    e.target.classList.add("active");
}
//show bullets
let bulletsSpans = document.querySelectorAll(".bullets-container span");
let navBullets = document.querySelector(".nav-bullets");
let bulletsLocal = localStorage.getItem("bullets_option");
if (bulletsLocal !== null) {
    bulletsSpans.forEach((span) => {
        span.classList.remove("active");
        if (bulletsLocal === "block") {
            navBullets.style.display = "block";
            document
                .querySelector(".bullets-container .yes")
                .classList.add("active");
        } else {
            navBullets.style.display = "none";
            document
                .querySelector(".bullets-container .no")
                .classList.add("active");
        }
    });
}
bulletsSpans.forEach((ele) => {
    ele.addEventListener("click", (e) => {
        if (e.target.dataset.display === "show") {
            navBullets.style.display = "block";
            localStorage.setItem("bullets_option", "block");
        } else {
            navBullets.style.display = "none";
            localStorage.setItem("bullets_option", "none");
        }
        removeActive(e);
    });
});
//show bullets
//reset button
document.querySelector(".reset-option").onclick = function () {
    localStorage.removeItem("random_option");
    localStorage.removeItem("bullets_option");
    localStorage.removeItem("option_color");
    window.location.reload();
};
//reset button
