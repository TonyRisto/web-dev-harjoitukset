const p = document.querySelector("#trigger");
const image = document.querySelector("#target");

p.addEventListener('mouseenter', () => {
    image.src = "img/picB.jpg";
})

p.addEventListener('mouseleave', () => {
    image.src = "img/picA.jpg";
})