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
    const imageList = [];

    for (let i = 2; i <= 45; i++) {
      imageList.push(`/images/individual-training${i}.jpg`);
    }
    for (let i = 2; i <= 57; i++) {
      imageList.push(`/images/rehab${i}.jpg`);
    }

    imageList.forEach((src) => {
      const imgName = src.split("/").pop().split(".")[0];
      const imgElement = document.querySelector(`img[src="${src}"]`);
      if (imgElement) {
        imgElement.alt = imgName.replace(/-/g, " ");
      }
    });

    let newImage;
    do {
      newImage = imageList[Math.floor(Math.random() * imageList.length)];
    } while (newImage === image.src);

    image.style.opacity = "0";
    setTimeout(() => {
      image.src = newImage;
      image.style.opacity = "1";
    }, 1000);
  }

  images.forEach((img) => {
    setInterval(
      () => changeImage(img),
      Math.floor(Math.random() * 5000) + 3000
    ); // Changes randomly between 3-8 seconds
  });
});
