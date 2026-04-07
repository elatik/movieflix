// Theme toggle
const html = document.documentElement;
document.getElementById("themeToggle").addEventListener("click", () => {
  html.dataset.theme = html.dataset.theme === "dark" ? "light" : "dark";
});

// Tabs
function setTab(el) {
  document
    .querySelectorAll(".tab")
    .forEach((t) => t.classList.remove("active"));
  el.classList.add("active");
}

// const movies = [
//   {
//     title: "Stellar Odyssey",
//     genre: "Sci-Fi, Adventure, Drama",
//     img: "https://images.unsplash.com/photo-1506318137071-a8e063b4bec0?w=400&q=80",
//   },
//   {
//     title: "Midnight Whispers",
//     genre: "Thriller, Mystery",
//     img: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=400&q=80",
//   },
//   {
//     title: "Velocity Drive",
//     genre: "Action, Crime",
//     img: "https://images.unsplash.com/photo-1614850523296-d8c1af93d400?w=400&q=80",
//   },
//   {
//     title: "Parisian Encounter",
//     genre: "Romance, Comedy",
//     img: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=400&q=80",
//   },
//   {
//     title: "Realm of Kings",
//     genre: "Fantasy, Action, Drama",
//     img: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=400&q=80",
//   },
//   {
//     title: "The Forgotten Estate",
//     genre: "Horror, Thriller",
//     img: "https://images.unsplash.com/photo-1509347528160-9a9e33742cdb?w=400&q=80",
//   },
//   {
//     title: "Forest Friends",
//     genre: "Animation, Family, Comedy",
//     img: "https://images.unsplash.com/photo-1448375240586-882707db888b?w=400&q=80",
//   },
//   {
//     title: "Honor & Glory",
//     genre: "War, History, Drama",
//     img: "https://images.unsplash.com/photo-1519669556878-63bdad8a1a49?w=400&q=80",
//   },
//   {
//     title: "Summer Fades",
//     genre: "Drama, Indie",
//     img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80",
//   },
//   {
//     title: "Deep Blue Secrets",
//     genre: "Documentary, Nature",
//     img: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&q=80",
//   },
// ];

// const grid = document.getElementById("movieGrid");

// movies.forEach((m) => {
//   grid.innerHTML += `
//   <div class="movie-card">
//     <div class="card-poster">
//       <img src="${m.img}" alt="${m.title}" loading="lazy"/>
//       <div class="card-overlay">
//         <div class="play-btn">
//           <svg viewBox="0 0 24 24"><polygon points="5 3 19 12 5 21 5 3"/></svg>
//         </div>
//       </div>
//     </div>
//     <div class="card-info">
//       <div class="card-title">${m.title}</div>
//       <div class="card-genre">${m.genre}</div>
//     </div>
//   </div>`;
// });