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
const viewer = document.getElementById("viewer");
const viewerImage = viewer.querySelector("img");
const closeButton = viewer.querySelector(".close-viewer");

const galleryImages = document.querySelectorAll(".gallery img");

galleryImages.forEach((image) => {
    image.addEventListener("click", () => {
        const parts = image.src.split('/');
        const filename = parts[parts.length - 1]; // e.g. "norris-sm.jpeg"
        const baseName = filename.split('-')[0];  // "norris"
        const newSrc = `images/${baseName}-full.jpeg`;

        viewerImage.src = newSrc;
        viewerImage.alt = image.alt;

        viewer.showModal();
    });
});

closeButton.addEventListener("click", () => {
    viewer.close();
});

viewer.addEventListener("click", (event) => {
    if (event.target === viewer) {
        viewer.close();
    }
});
