document.addEventListener("DOMContentLoaded", function () {
  // Dropdown menu functionality
  const dropdown = document.querySelector(".dropdown");
  const toggle = dropdown.querySelector(".dropdown-toggle");
  const menu = dropdown.querySelector(".dropdown-menu");

  if (dropdown && toggle && menu) {
    // Toggle the menu on click
    toggle.addEventListener("click", function (e) {
      e.preventDefault();
      const isExpanded = toggle.getAttribute("aria-expanded") === "true";
      toggle.setAttribute("aria-expanded", !isExpanded);
      menu.classList.toggle("visible");
    });

    // Close the menu when clicking outside
    document.addEventListener("click", function (e) {
      if (!dropdown.contains(e.target)) {
        toggle.setAttribute("aria-expanded", "false");
        menu.classList.remove("visible");
      }
    });

    // Enable keyboard navigation
    toggle.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        toggle.click();
      }
    });

    // Position the dropdown menu
    function positionDropdownMenu() {
      const header = document.querySelector(".header");
      const headerHeight = header.offsetHeight;
      menu.style.top = headerHeight + "px";

      const liRect = dropdown.getBoundingClientRect();
      const liCenterX = liRect.left + liRect.width / 2;

      const menuWidth = menu.offsetWidth;
      const menuLeft = liCenterX - menuWidth / 2;

      menu.style.left = menuLeft + "px";
    }

    positionDropdownMenu();
    window.addEventListener("resize", positionDropdownMenu);
  }

  // Gallery Slideshow Functionality
  const images = document.querySelectorAll(".image-box img");
  if (images.length > 0) {
    let imageList = [];
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

    let usedImages = new Set();

    function generateAltText(src) {
      return src
        .split("/")
        .pop()
        .replace(/-/g, " ")
        .replace(/\d+/g, "")
        .replace(".jpg", "")
        .trim();
    }

    function getNewImage(excludedImages = []) {
      let availableImages = imageList.filter(
        (img) => !usedImages.has(img) && !excludedImages.includes(img)
      );

      if (availableImages.length === 0) {
        usedImages.clear();
        availableImages = [...imageList];
      }

      const newImage =
        availableImages[Math.floor(Math.random() * availableImages.length)];
      usedImages.add(newImage);

      if (usedImages.size > Math.floor(imageList.length * 0.5)) {
        usedImages.delete([...usedImages][0]);
      }

      return newImage;
    }

    function changeImage(image, excludedImages = []) {
      const newImage = getNewImage(excludedImages);
      image.style.opacity = "0";
      setTimeout(() => {
        image.src = newImage;
        image.alt = generateAltText(newImage);
        image.style.opacity = "1";
      }, 1000);
    }

    function changeImages() {
      images.forEach((img, index) => {
        const excludedImages = Array.from(images)
          .filter((otherImg, otherIndex) => otherIndex !== index)
          .map((otherImg) => otherImg.src);
        setTimeout(() => {
          changeImage(img, excludedImages);
        }, Math.random() * 9000);
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
  }

  // Image Slider Functionality
  function setupImageSlider(elementId, images) {
    const imageElement = document.getElementById(elementId);
    if (imageElement) {
      let currentIndex = 0;
      imageElement.style.transition = "opacity 0.5s ease-in-out";

      function changeImage() {
        currentIndex = (currentIndex + 1) % images.length;
        imageElement.style.transition = "opacity 1.5s ease";
        imageElement.style.opacity = 0;

        setTimeout(() => {
          imageElement.src = images[currentIndex];
          imageElement.alt = generateAltText(images[currentIndex]);
          imageElement.style.opacity = 1;
        }, 1500);
      }

      setInterval(changeImage, 5000);
    } else {
      console.error(`Image slider element ${elementId} not found!`);
    }
  }

  setupImageSlider("image-slider-bakgrund", [
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
  ]);

  setupImageSlider("image-slider-rehabteam", [
    "images/robbin-fysio.jpg",
    "images/Evelyn-rob.jpg",
    "images/rehab5.jpg",
    "images/evelyn.jpg",
    "images/individual-training15.jpg",
    "images/staff-with-client.jpg",
  ]);

  // Script for saving the selected period in aktuellt dates and giving it as the default value to the register-form
  const urlParams = new URLSearchParams(window.location.search);
  const selectedPeriod = urlParams.get("period");
  if (selectedPeriod) {
    document.getElementById("period").value = selectedPeriod;
  }

  // Lazy load iframes when they are in the viewport
  const iframes = document.querySelectorAll(".lazy-iframe");
  if (iframes.length > 0) {
    const observer = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            let iframe = entry.target;
            iframe.src = iframe.getAttribute("data-src");
            observer.unobserve(iframe);
          }
        });
      },
      { rootMargin: "200px" }
    );

    iframes.forEach((iframe) => observer.observe(iframe));
  }

  // Rotating Banner Functionality for Rehabprogram Page
  const bannerContainer = document.getElementById("banner-rehabprogram");
  if (bannerContainer) {
    const banners = bannerContainer.querySelectorAll("div");
    let currentIndex = 0;

    function rotateBanners() {
      banners[currentIndex].classList.remove("active");
      currentIndex = (currentIndex + 1) % banners.length;
      banners[currentIndex].classList.add("active");
    }

    setInterval(rotateBanners, 200);
  }
});
