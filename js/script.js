document.addEventListener("DOMContentLoaded", function () {
  const dropdown = document.querySelector(".dropdown");
  const toggle = dropdown.querySelector(".dropdown-toggle");
  const menu = dropdown.querySelector(".dropdown-menu");
  const menuOverlay = document.querySelector(".menu-overlay");
  const hamburger = document.querySelector(".hamburger");
  const header = document.querySelector(".header");
  const body = document.querySelector("body");
  let timeout;

  // --- Regular Dropdown (Desktop) ---
  function showDropdown() {
    clearTimeout(timeout);
    positionDropdownMenu(); // Call function to center the dropdown
    menu.style.opacity = "1";
    menu.style.visibility = "visible";
    menu.style.pointerEvents = "auto";
  }

  function hideDropdown() {
    timeout = setTimeout(() => {
      menu.style.opacity = "0";
      menu.style.visibility = "hidden";
      menu.style.pointerEvents = "none";
    }, 100); // Delay to prevent flickering
  }

  dropdown.addEventListener("mouseenter", showDropdown);
  dropdown.addEventListener("mouseleave", hideDropdown);
  menu.addEventListener("mouseenter", showDropdown);
  menu.addEventListener("mouseleave", hideDropdown);

  // --- Mobile Menu Toggle ---
  if (hamburger && menuOverlay) {
    hamburger.addEventListener("click", function () {
      this.classList.toggle("active");
      menuOverlay.classList.toggle("active");
      header.classList.toggle("no-shadow-no-effect");
      body.classList.toggle("no-scroll");

      // Close dropdown when overlay menu is active
      if (menuOverlay.classList.contains("active")) {
        menu.style.opacity = "0";
        menu.style.visibility = "hidden";
        menu.style.pointerEvents = "none";
      }
    });
  }

  // --- Overlay Dropdown (Mobile) ---
  const dropdownOverlay = document.querySelector(".dropdown-overlay");
  const toggleOverlay = document.querySelector(".dropdown-toggle-overlay");

  if (dropdownOverlay && toggleOverlay) {
    toggleOverlay.addEventListener("click", function (e) {
      e.preventDefault();
      dropdownOverlay.classList.toggle("active");
    });

    dropdownOverlay.addEventListener("mouseenter", function () {
      dropdownOverlay.classList.add("active");
    });

    dropdownOverlay.addEventListener("mouseleave", function () {
      dropdownOverlay.classList.remove("active");
    });
  }

  // --- Position the dropdown menu correctly under the trigger ---
  function positionDropdownMenu() {
    if (!dropdown || !menu) return;

    const dropdownRect = dropdown.getBoundingClientRect();
    const menuWidth = menu.offsetWidth;
    const centerX = dropdownRect.left + dropdownRect.width / 2;

    // Ensure it doesn't go off-screen
    let menuLeft = centerX - menuWidth / 2;
    menuLeft = Math.max(
      10,
      Math.min(window.innerWidth - menuWidth - 10, menuLeft)
    );

    menu.style.left = `${menuLeft}px`;
  }

  // Ensure dropdown is positioned correctly on load and when resizing
  positionDropdownMenu();
  window.addEventListener("resize", positionDropdownMenu);
});

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

// Image Slider Functionality
// Image Slider for bakgrund.html
const imageElementBakgrund = document.getElementById("image-slider-bakgrund");
if (imageElementBakgrund) {
  const imagesBakgrund = [
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

  let currentIndexBakgrund = 0;
  imageElementBakgrund.style.transition = "opacity 0.5s ease-in-out"; // Apply transition once

  function changeImageBakgrund() {
    currentIndexBakgrund = (currentIndexBakgrund + 1) % imagesBakgrund.length;

    // Set up the dissolve out effect
    imageElementBakgrund.style.transition = "opacity 1.5s ease"; // Slow dissolve effect
    imageElementBakgrund.style.opacity = 0; // Dissolve out the current image

    setTimeout(() => {
      imageElementBakgrund.src = imagesBakgrund[currentIndexBakgrund]; // Change the image source
      imageElementBakgrund.alt = generateAltText(
        imagesBakgrund[currentIndexBakgrund]
      ); // Optional: update alt text

      // After the dissolve out, dissolve in the new image
      imageElementBakgrund.style.opacity = 1; // Dissolve in the new image
    }, 1500); // Delay to match the dissolve out time (1.5s)
  }

  // Change image every 6 seconds for smoother transitions
  setInterval(changeImageBakgrund, 5000); // Image change interval
} else {
  console.error("Image slider element not found!");
}

// Image Slider for rehabteam.html
const imageElementRehabteam = document.getElementById("image-slider-rehabteam");
if (imageElementRehabteam) {
  const imagesRehabteam = [
    "images/robbin-fysio.jpg",
    "images/Evelyn-rob.jpg",
    "images/rehab5.jpg",
    "images/evelyn.jpg",
    "images/individual-training15.jpg",
    "images/staff-with-client.jpg",
  ];

  let currentIndexRehabteam = 0;
  imageElementRehabteam.style.transition = "opacity 0.5s ease-in-out"; // Apply transition once

  function changeImageRehabteam() {
    currentIndexRehabteam =
      (currentIndexRehabteam + 1) % imagesRehabteam.length;

    // Set up the dissolve out effect
    imageElementRehabteam.style.transition = "opacity 1.5s ease"; // Slow dissolve effect
    imageElementRehabteam.style.opacity = 0; // Dissolve out the current image

    setTimeout(() => {
      imageElementRehabteam.src = imagesRehabteam[currentIndexRehabteam]; // Change the image source
      imageElementRehabteam.alt = generateAltText(
        imagesRehabteam[currentIndexRehabteam]
      ); // Optional: update alt text

      // After the dissolve out, dissolve in the new image
      imageElementRehabteam.style.opacity = 1; // Dissolve in the new image
    }, 1500); // Delay to match the dissolve out time (1.5s)
  }

  // Change image every 6 seconds for smoother transitions
  setInterval(changeImageRehabteam, 5000); // Image change interval
} else {
  console.error("Image slider element not found!");
}
// Script for saving the selected period in aktuellt dates and giving it as the default value to the register-form
const urlParams = new URLSearchParams(window.location.search);
const selectedPeriod = urlParams.get("period");
if (selectedPeriod) {
  document.getElementById("period").value = selectedPeriod;
}

// Lazy load iframes when they are in the viewport
const iframes = document.querySelectorAll(".lazy-iframe");

const observer = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        let iframe = entry.target;
        iframe.src = iframe.getAttribute("data-src");
        observer.unobserve(iframe); // Stop observing once loaded
      }
    });
  },
  { rootMargin: "200px" }
);

iframes.forEach((iframe) => observer.observe(iframe));

// Dropdown menu functionality
const dropdown2 = document.querySelector(".dropdown");
const toggle2 = dropdown2.querySelector(".dropdown-toggle");
const menu2 = dropdown2.querySelector(".dropdown-menu");

// Toggle the menu on click
toggle2.addEventListener("click", function (e) {
  e.preventDefault();
  const isExpanded = toggle2.getAttribute("aria-expanded") === "true";
  toggle2.setAttribute("aria-expanded", !isExpanded);
  menu2.classList.toggle("visible");
});

// Close the menu when clicking outside
document.addEventListener("click", function (e) {
  if (!dropdown2.contains(e.target)) {
    toggle2.setAttribute("aria-expanded", "false");
    menu2.classList.remove("visible");
  }
});

// Enable keyboard navigation
toggle2.addEventListener("keydown", function (e) {
  if (e.key === "Enter" || e.key === " ") {
    e.preventDefault();
    toggle2.click();
  }
});

// Rotating Banner Functionality for Rehabprogram Page
const bannerContainer = document.getElementById("banner-rehabprogram");
if (bannerContainer) {
  const banners = bannerContainer.querySelectorAll("div");
  let currentIndex = 0;

  // Function to rotate banners
  function rotateBanners() {
    // Remove active class from the current banner
    banners[currentIndex].classList.remove("active");

    // Move to the next banner (loop back to the first if necessary)
    currentIndex = (currentIndex + 1) % banners.length;

    // Add active class to the new banner
    banners[currentIndex].classList.add("active");
  }

  // Set initial active banner
  banners[currentIndex].classList.add("active");

  // Rotate banners every 5 seconds
  setInterval(rotateBanners, 5000);
} else {
  console.error("Banner container not found!");
}
