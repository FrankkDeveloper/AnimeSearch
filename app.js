const ANIME_API = "https://api.jikan.moe/v4/anime?q=";

const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");
const animeContainer = document.getElementById("anime-container");
const textWarning = document.getElementById("text-warning");

const FetchAnime = async (query) => {
  try {
    const response = await fetch(`${ANIME_API}${query}`);
    const data = await response.json();
    showAnimes(data.data);
  } catch (error) {
    textWarning.textContent = "Problemas al cargar la API :(";
    console.error(error);
  }
};

function showAnimes(data) {
  animeContainer.innerHTML = "";
  data.forEach((anime) => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = `<div class="card">
          <img
            src="${anime.images.jpg.image_url}"
            alt="${anime.title}"
          />
          <div class="card__content">
            <h3 class="card__title"><a href="${anime.url}" target="_blank">${
      anime.title
    }</a></h3>
            <p><b>Episodios: </b>${anime.episodes}</p>
            <p><b>Ranked: </b>#${anime.rank}</p>
            <p><b>Puntuacion: </b>${
              anime.score
            }<i class="fa-regular fa-star"></i></p>
            <button class="${
              anime.trailer.url
                ? "search__button search__button--trailer"
                : "search__button search__button--trailer search__button--trailer-disabled"
            }"
            ${
              anime.trailer.url
                ? `onclick="window.open('${anime.trailer.url}', '_blank')"`
                : "disabled"
            }
            >
              Ver trailer
            </button>
          </div>
        </div>`;
    animeContainer.appendChild(card);
  });
}

searchButton.addEventListener("click", () => {
  const query = searchInput.value.trim();
  if (query) {
    FetchAnime(query);
    textWarning.innerHTML = "";
  } else {
    textWarning.textContent = "Anime no encontrado :(";
    animeContainer.innerHTML = "";
  }
});

FetchAnime("");
