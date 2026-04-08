// API key
const API_KEY = "c2c40e0f8827f0ad88e3922f3cc17ce6";

// Theme toggle
const html = document.documentElement;
const savedTheme = localStorage.getItem("theme");
if (savedTheme) {
  html.dataset.theme = savedTheme;
}
document.getElementById("themeToggle").addEventListener("click", () => {
  const newTheme = html.dataset.theme === "dark" ? "light" : "dark";
  html.dataset.theme = newTheme;
  localStorage.setItem("theme", newTheme);
});


const global = {
  currentPage: window.location.pathname,
};

// Highlight active nav link
function highlightActiveLink() {
  const links = document.querySelectorAll(".nav-links a");
  links.forEach((link) => {
    if (link.getAttribute("href") === global.currentPage) {
      link.classList.add("active");
    }
  });
}

// Initialize app
function init() {
  switch (global.currentPage) {
    case "/":
    case "/index.html":
      console.log("Home");
      break;
    case "/shows.html":
      console.log("TV Shows");
      break;
    case "/movie-details.html":
      console.log("Movie Details");
      break;
    case "/tv-details.html":
      console.log("TV Show Details");
      break;
    case "/search.html":
      console.log("Search");
      break;
  }
  highlightActiveLink();
}

document.addEventListener("DOMContentLoaded", init);