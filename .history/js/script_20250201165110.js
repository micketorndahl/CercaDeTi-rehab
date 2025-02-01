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
  const images = document.querySelectorAll(".image-box img");

  function changeImage(image) {
    const imageList = [
      "/images/group-training2.jpg",
      "/images/individual-training17.jpg",
      "/images/individual-training8.jpg",
      "/images/hand-cordination.jpg",
      "/images/individual-training16.jpg",
      "/images/individual-training17.jpg",
      "/images/individual-training18.jpg",
      "/images/individual-training12.jpg",
    ];

    let newImage;
    do {
      newImage = imageList[Math.floor(Math.random() * imageList.length)];
    } while (newImage === image.src);

    image.style.opacity = "0";
    setTimeout(() => {
      image.src = newImage;
      image.style.opacity = "1";
    }, 3000);
  }

  images.forEach((img) => {
    setInterval(
      () => changeImage(img),
      Math.floor(Math.random() * 5000) + 3000
    ); // Changes randomly between 3-8 seconds
  });
});
