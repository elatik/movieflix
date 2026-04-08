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

// Global variables
const global = {
  currentPage: window.location.pathname,
};

async function displayPopularMovies() {
  const { results } = await fetchAPIData("movie/popular");
  results.forEach((movie) => {
    const div = document.createElement("div");
    div.classList.add("movie-card");
    const posterImage = movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : "/images/NoImage.png";
    div.innerHTML = `
          <div class="card-poster">
            <img src="${posterImage}" alt="${movie.title}" loading="lazy" />
            <div class="card-overlay">
              <a href="/movie-details.html?id=${movie.id}" class="play-btn">
                <svg viewBox="0 0 24 24">
                  <polygon points="5 3 19 12 5 21 5 3" />
                </svg>
              </a>
            </div>
          </div>
          <div class="card-info">
            <div class="card-title">${movie.title}</div>
            <div class="card-date">${movie.release_date}</div>
          </div>
    `;
    document.getElementById("movieGrid").appendChild(div);
  });
}

// Fetch data from TMDB API
async function fetchAPIData(endpoint) {
  // API key
  const API_KEY = "c2c40e0f8827f0ad88e3922f3cc17ce6";
  const API_URL = `https://api.themoviedb.org/3/`;
  const response = await fetch(
    `${API_URL}${endpoint}?api_key=${API_KEY}&language=en-US`,
  );
  const data = await response.json();
  return data;
}

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
      displayPopularMovies();
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
