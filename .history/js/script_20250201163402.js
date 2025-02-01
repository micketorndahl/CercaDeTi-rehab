// Script that automatic scrolls down to main content when clicking the down arrow icon
document
  .getElementById("scroll-button")
  .addEventListener("click", function (event) {
    event.preventDefault();
    const headerOffset = 80; // Adjust this value based on your design
    const element = document.querySelector("#content");
    const elementPosition =
      element.getBoundingClientRect().top + window.scrollY;
    const offsetPosition = elementPosition - headerOffset;

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    });
  });

document.addEventListener("DOMContentLoaded", function () {
  const images = document.querySelectorAll(".image-container img");
  let currentIndex = 0;

  function changeImage() {
    images[currentIndex].classList.remove("active");

    // Pick a new random index different from the current one
    let newIndex;
    do {
      newIndex = Math.floor(Math.random() * images.length);
    } while (newIndex === currentIndex);

    currentIndex = newIndex;
    images[currentIndex].classList.add("active");
  }

  // Change images every 5 seconds (adjustable)
  setInterval(changeImage, 5000);
});
