document.addEventListener("DOMContentLoaded", function () {
  // Scroll Button Functionality
  const scrollButton = document.getElementById("scroll-button");
  if (scrollButton) {
    scrollButton.addEventListener("click", function (event) {
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
  } else {
    console.error("Scroll button not found!");
  }

  // Gallery Slideshow Functionality
  const images = document.querySelectorAll(".image-box img");
  let imageList = [];
  // Generate a full list of images (same logic as before)
  for (let i = 2; i <= 54; i++) {
    imageList.push(`/images/individual-training${i}.jpg`);
  }
  for (let i = 2; i <= 50; i++) {
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

  // Function to generate readable alt text for images
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
      usedImages.delete([...usedImages][0]); // Remove oldest used image
    }

    return newImage;
  }

  // Function to change images smoothly in gallery
  function changeImage(image, excludedImages = []) {
    const newImage = getNewImage(excludedImages);
    image.style.opacity = "0"; // Start fade-out transition
    setTimeout(() => {
      image.src = newImage;
      image.alt = generateAltText(newImage);
      image.style.opacity = "1"; // Start fade-in transition
    }, 1000); // Match the fade-out duration
  }

  // Function to handle changing images for all boxes in gallery
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

  // Image Slider Functionality for omoss.html
  const imageElement = document.getElementById("image-slider");
  if (imageElement) {
    const images = [
      "images/local.jpg",
      "images/local2.jpg",
      "images/local3.jpg",
      "images/local4.jpg",
      "images/local5.jpg",
      "images/local6.jpg",
      "images/local7.jpg",
      "images/pool.jpg",
      "images/gym4.jpg",
      "images/gym5.jpg",
      "images/gym7.jpg",
    ];

    let currentIndex = 0;
    imageElement.style.transition = "opacity 0.5s ease-in-out"; // Apply transition once

    function changeImage() {
      currentIndex = (currentIndex + 1) % images.length;

      // Set up the dissolve out effect
      imageElement.style.transition = "opacity 1.5s ease"; // Slow dissolve effect
      imageElement.style.opacity = 0; // Dissolve out the current image

      setTimeout(() => {
        imageElement.src = images[currentIndex]; // Change the image source
        imageElement.alt = generateAltText(images[currentIndex]); // Optional: update alt text

        // After the dissolve out, dissolve in the new image
        imageElement.style.opacity = 1; // Dissolve in the new image
      }, 1500); // Delay to match the dissolve out time (1.5s)
    }

    // Change image every 6 seconds for smoother transitions
    setInterval(changeImage, 5000); // Image change interval
  } else {
    console.error("Image slider element not found!");
  }
});

// Script for the banner slideshow in rehabprogram.html
document.addEventListener("DOMContentLoaded", function () {
  const slides = document.querySelectorAll(
    ".banner-rehabprogram > div:not(.banner-content-rehabprogram)"
  );
  let index = 0;

  function changeSlide() {
    slides.forEach((slide, i) => {
      slide.classList.remove("active");
      if (i === index) slide.classList.add("active");
    });

    index = (index + 1) % slides.length;
  }

  // Lazy load images
  slides.forEach((slide) => {
    const img = slide.querySelector("img");
    if (img) {
      img.setAttribute("loading", "lazy");
    }
  });

  // Initial activation
  slides[0].classList.add("active");

  // Change background every 4 seconds
  setInterval(changeSlide, 4000);
});

// Script for saving the selected period in aktuellt dates and giving it as the default value to the register-form
document.addEventListener("DOMContentLoaded", function () {
  const urlParams = new URLSearchParams(window.location.search);
  const selectedPeriod = urlParams.get("period");
  if (selectedPeriod) {
    document.getElementById("period").value = selectedPeriod;
  }
});
