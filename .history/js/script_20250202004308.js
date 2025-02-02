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

// Gallery script that changes images in a slideshow for rehabprogram.html
document.addEventListener("DOMContentLoaded", function () {
  const images = document.querySelectorAll(".image-box img");
  let imageList = [];

  // Generate a full list of images
  for (let i = 2; i <= 40; i++) {
    imageList.push(`/images/individual-training${i}.jpg`);
  }
  for (let i = 2; i <= 49; i++) {
    imageList.push(`/images/rehab${i}.jpg`);
  }
  for (let i = 2; i <= 7; i++) {
    imageList.push(`/images/closeup-rehab${i}.jpg`);
  }
  const additionalImages = [
    "group-training.jpg",
    "group-training2.jpg",
    "rehab-sneekpeak.jpg",
    "walking-in-stairs-rehab.jpg",
    "rehabcloseup.jpg",
    "walking-rehab.jpg",
    "walking-rehab2.jpg",
    "relax.jpg",
    "pool-rehab.jpg",
    "morning-gymnastics.jpg",
    "professional-help.jpg",
    "gym-wide.jpg",
  ];

  additionalImages.forEach((image) => {
    imageList.push(`/images/${image}`);
  });

  let usedImages = new Set(); // Tracks recently used images

  // Function to generate readable alt text
  function generateAltText(src) {
    return src
      .split("/")
      .pop()
      .replace(/-/g, " ")
      .replace(/\d+/g, "")
      .replace(".jpg", "")
      .trim();
  }

  // Function to get a new image ensuring no duplicates in the same box
  function getNewImage(excludedImages = []) {
    // Filter out the excluded images (e.g., images already shown in other boxes)
    let availableImages = imageList.filter(
      (img) => !usedImages.has(img) && !excludedImages.includes(img)
    );

    if (availableImages.length === 0) {
      usedImages.clear(); // Reset when all images have been used
      availableImages = [...imageList];
    }

    const newImage =
      availableImages[Math.floor(Math.random() * availableImages.length)];
    usedImages.add(newImage); // Mark as used

    if (usedImages.size > Math.floor(imageList.length * 0.5)) {
      // Keep only the most recent 50% of images in memory
      usedImages.delete([...usedImages][0]); // Remove oldest used image
    }

    return newImage;
  }

  // Function to change images smoothly
  function changeImage(image, excludedImages = []) {
    const newImage = getNewImage(excludedImages);
    image.style.opacity = "0"; // Start fade-out transition
    setTimeout(() => {
      image.src = newImage;
      image.alt = generateAltText(newImage);
      image.style.opacity = "1"; // Start fade-in transition
    }, 1000); // Match the fade-out duration
  }

  // Function to handle changing images for all boxes
  function changeImages() {
    images.forEach((img, index) => {
      const excludedImages = Array.from(images)
        .filter((otherImg, otherIndex) => otherIndex !== index)
        .map((otherImg) => otherImg.src);
      setTimeout(() => {
        changeImage(img, excludedImages);
      }, Math.random() * 9000); // Slight randomness to the image change timing
    });
  }

  function applyZoomEffect() {
    images.forEach((img) => {
      setTimeout(() => {
        img.style.transform = "scale(1.1)";
        setTimeout(() => {
          img.style.transform = "scale(1)";
        }, 4000);
      }, Math.random() * 12000 + 5000);
    });
  }

  setInterval(changeImages, 12000);
  setInterval(applyZoomEffect, 8000);
  changeImages();
  applyZoomEffect();
});

document.addEventListener("DOMContentLoaded", function () {
  const imageElement = document.getElementById("image-slider");

  // Ensure the element exists before proceeding
  if (!imageElement) {
    console.error("Image slider element not found!");
    return;
  }

  const images = [
    "images/local.jpg",
    "images/local2.jpg",
    "images/local3.jpg",
    "images/local4.jpg",
  ];

  let currentIndex = 0;

  function changeImage() {
    currentIndex = (currentIndex + 1) % images.length;
    imageElement.style.opacity = 0;

    setTimeout(() => {
      imageElement.src = images[currentIndex];
      imageElement.style.opacity = 1;
    }, 500);
  }

  setInterval(changeImage, 3000); // Change image every 3 seconds
});
