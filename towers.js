document.getElementById("darkModeToggle").addEventListener("click", function(){
    document.body.classList.toggle("dark-mode");
})
let images = ["image1.jpg", "image2.jpg", "Fortress.jpg"];
let index = 0;
setInterval(() => {
    document.getElementById("imageContainer").style.backgroundImage = `url(${images[index]})`;
    index = (index + 1) % images.length;

}, 2000); 

document.querySelectorAll('a[href^="#]').forEach(anchor => {
    anchor.addEventListener("click", function(e) {
        document.querySelector(this.getAttribute("href")).scrollIntoView({
           behavior: "smooth" 
        });
    });
});