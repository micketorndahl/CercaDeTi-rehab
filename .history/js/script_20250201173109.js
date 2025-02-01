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

// Gallery script that changes images in a slideshow
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
  for (let i = 2; i <= 8; i++) {
    imageList.push(`/images/closeup-rehab${i}.jpg`);
  }

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

  // Function to get a new image ensuring variety
  function getNewImage() {
    let availableImages = imageList.filter((img) => !usedImages.has(img));

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

  // Function to change an image smoothly
  function changeImage(image) {
    const newImage = getNewImage();
    image.style.opacity = "0";
    setTimeout(() => {
      image.src = newImage;
      image.alt = generateAltText(newImage);
      image.style.opacity = "1";
    }, 1000);
  }

  // Set different intervals for each image (7-14 seconds)
  images.forEach((img) => {
    setInterval(
      () => changeImage(img),
      Math.floor(Math.random() * 2000) + 5000
    );
  });
});
