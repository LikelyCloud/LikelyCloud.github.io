const menu = document.querySelector(".up-menu");
const hamburger = document.querySelector(".hamburger");

const toggleMenu = function () {
    menu.classList.toggle("show-menu");
};

hamburger.style.display = "block";
hamburger.addEventListener("click", toggleMenu);
