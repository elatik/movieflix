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