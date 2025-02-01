document
  .getElementById("scroll-button")
  .addEventListener("click", function (event) {
    event.preventDefault();
    document
      .querySelector("#content")
      .scrollIntoView({ behavior: "smooth", block: "start" });
  });
