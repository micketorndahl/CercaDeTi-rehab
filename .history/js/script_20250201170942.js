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

// Generate a random image slideshow for the image boxes
document.addEventListener("DOMContentLoaded", function () {
  const images = document.querySelectorAll(".image-box img");
  const recentImages = new Map(); // Stores recently used images to prevent repeats

  // Create a list of image paths
  const imageList = [];
  for (let i = 2; i <= 40; i++) {
    imageList.push(`/images/individual-training${i}.jpg`);
  }
  for (let i = 2; i <= 49; i++) {
    imageList.push(`/images/rehab${i}.jpg`);
  }

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

  // Function to change an image while avoiding recent duplicates
  function changeImage(image, index) {
    let availableImages = imageList.filter(
      (img) => !recentImages.get(index)?.includes(img)
    );

    // If all images have been used recently, reset the memory for this index
    if (availableImages.length === 0) {
      availableImages = [...imageList];
      recentImages.set(index, []);
    }

    // Pick a new image
    const newImage =
      availableImages[Math.floor(Math.random() * availableImages.length)];

    // Update recent images list (keep last 5 used to avoid quick repeats)
    if (!recentImages.has(index)) {
      recentImages.set(index, []);
    }
    recentImages.get(index).push(newImage);
    if (recentImages.get(index).length > 5) {
      recentImages.get(index).shift(); // Remove oldest entry
    }

    // Apply transition
    image.style.opacity = "0";
    setTimeout(() => {
      image.src = newImage;
      image.alt = generateAltText(newImage); // Add missing alt text
      image.style.opacity = "1";
    }, 1000);
  }

  // Set different intervals for each image (6-12 seconds)
  images.forEach((img, index) => {
    setInterval(
      () => changeImage(img, index),
      Math.floor(Math.random() * 6000) + 6000
    );
  });
});
