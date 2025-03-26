const showContent = (shape) =>
  fetch(`shapes/${shape}.html`)
    .then((response) => response.text())
    .then((data) => (document.querySelector(".content").innerHTML = data))
    .catch((error) => console.error("Error loading content:", error));

shape = document.querySelector("select");
showContent(shape.value);
shape.addEventListener("change", (event) => {
  showContent(event.target.value);
});
