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


// Display popular movies
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

// Display popular TV shows
async function displayPopularTVShows() {
  const { results } = await fetchAPIData("tv/popular");
  console.log(results);
  results.forEach((show) => {
    const div = document.createElement("div");
    div.classList.add("movie-card");
    const posterImage = show.poster_path ? `https://image.tmdb.org/t/p/w500${show.poster_path}` : "/images/NoImage.png";
    div.innerHTML = `
          <div class="card-poster">
            <img src="${posterImage}" alt="${show.name}" loading="lazy" />
            <div class="card-overlay">
              <a href="/tv-details.html?id=${show.id}" class="play-btn">
                <svg viewBox="0 0 24 24">
                  <polygon points="5 3 19 12 5 21 5 3" />
                </svg>
              </a>
            </div>
          </div>
          <div class="card-info">
            <div class="card-title">${show.name}</div>
            <div class="card-date">${show.first_air_date}</div>
          </div>
    `;
    document.getElementById("movieGrid").appendChild(div);
  });
}

// Display Movie Details
async function displayMovieDetails() {
  const urlParams = new URLSearchParams(window.location.search);
  const movieId = urlParams.get("id");
  const movie = await fetchAPIData(`movie/${movieId}`);
  document.getElementById("movieTitle").textContent = movie.title;
  document.getElementById("movieGenre").textContent = movie.genres.map((genre) => genre.name).join(", ");
  document.getElementById("movieRating").textContent = movie.vote_average.toFixed(1);
  document.getElementById("movieOverview").textContent = movie.overview;
  const posterImage = movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : "/images/NoImage.png";
  document.getElementById("moviePoster").src = posterImage;
  
  // Populate actors list
  const credits = await fetchAPIData(`movie/${movieId}/credits`);
  const actorsList = document.getElementById("actorsList");
  actorsList.innerHTML = credits.cast.slice(0, 5).map(actor => `<li>${actor.name}</li>`).join("");
  document.getElementById("actorsMoreLink").addEventListener("click", (e) => {
    if (e.target.textContent === "More") {
      actorsList.innerHTML = credits.cast.map(actor => `<li>${actor.name}</li>`).join("");
      e.target.textContent = "Less";
    } else {
      actorsList.innerHTML = credits.cast.slice(0, 7).map(actor => `<li>${actor.name}</li>`).join("");
      e.target.textContent = "More";
    }
  });
  // TODO: Add more details like director, runtime, etc.
  document.getElementById("directorList").innerHTML = credits.crew.filter((crew) => crew.job === "Director").map((crew) => `<li>${crew.name}</li>`).join("");
  document.getElementById("screenwriterList").innerHTML = credits.crew.filter((crew) => crew.job === "Screenplay").map((crew) => `<li>${crew.name}</li>`).join("");
  document.getElementById("producersList").innerHTML = credits.crew.filter((crew) => crew.job === "Producer").map((crew) => `<li>${crew.name}</li>`).join("");
}

// Display TV Show Details
async function displayTvDetails() {
  const urlParams = new URLSearchParams(window.location.search);
  const tvId = urlParams.get("id");
  const show = await fetchAPIData(`tv/${tvId}`);
  document.getElementById("show-title").textContent = show.name;
  document.getElementById("show-genre").textContent = show.genres.map((genre) => genre.name).join(", ");
  document.getElementById("show-rating").textContent = show.vote_average.toFixed(1);
  document.getElementById("show-overview").textContent = show.overview;
  const posterImage = show.poster_path ? `https://image.tmdb.org/t/p/w500${show.poster_path}` : "/images/NoImage.png";
  document.getElementById("show-poster").src = posterImage;
  
  // Populate actors list
  const credits = await fetchAPIData(`tv/${tvId}/credits`);
  console.log(credits);
  const actorsList = document.getElementById("actorsList");
  actorsList.innerHTML = credits.cast.slice(0, 5).map(actor => `<li>${actor.name}</li>`).join("");
  document.getElementById("actorsMoreLink").addEventListener("click", (e) => {
    if (e.target.textContent === "More") {
      actorsList.innerHTML = credits.cast.map(actor => `<li>${actor.name}</li>`).join("");
      e.target.textContent = "Less";
    } else {
      actorsList.innerHTML = credits.cast.slice(0, 7).map(actor => `<li>${actor.name}</li>`).join("");
      e.target.textContent = "More";
    }
  });
}

// Fetch data from TMDB API
async function fetchAPIData(endpoint) {
  // API key
  const API_KEY = "c2c40e0f8827f0ad88e3922f3cc17ce6";
  const API_URL = `https://api.themoviedb.org/3/`;
  showSpinner();
  const response = await fetch(
    `${API_URL}${endpoint}?api_key=${API_KEY}&language=en-US`,
  );
  const data = await response.json();
  removeSpinner();
  return data;
}

// Show and remove Spinner
function showSpinner() {
  document.querySelector('.spinner').classList.add('show');
}

function removeSpinner() {
  document.querySelector('.spinner').classList.remove('show');
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
      displayPopularTVShows();
      break;
    case "/movie-details.html":
      displayMovieDetails();
      break;
    case "/tv-details.html":
      displayTvDetails();
      break;
    case "/search.html":
      console.log("Search");
      break;
  }
  highlightActiveLink();
}

document.addEventListener("DOMContentLoaded", init);
