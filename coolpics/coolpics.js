// menu toggle
const menuButton = document.getElementById("menuButton");

function toggleMenu() {
    const menu = document.querySelector(".menu");
    menu.classList.toggle("hide");
    console.log("Button clicked")// check to see if button actually clicked
    console.log(menu.classList);
}

menuButton.addEventListener("click", toggleMenu);


// resize
function handleResize() {
 const menu = document.querySelector(".menu")
 if (innerWidth > 1000) {
    menu.classList.remove("hide");
 }
 else {
    menu.classList.add("hide");
 }
}

handleResize();
window.addEventListener("resize", handleResize);

// modal functionality 
const images = document.querySelectorAll(".gallery img")