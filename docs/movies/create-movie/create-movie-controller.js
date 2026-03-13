import { createMovie } from "./create-movie-model.js";
import { buildTemporaryMovie } from "./create-movie-view.js";


export function createMovieController(createdMovie, buttonAddMovie,creatingMovies,moviesPreview,closeButtonModal) {
  buttonAddMovie.addEventListener("click", async (event) => {
    createdMovie.classList.remove("hidden");
    event.preventDefault();
  });

  closeButtonModal.addEventListener("click", async (event) => {
    createdMovie.classList.add("hidden");
    event.preventDefault();
  })


  createdMovie.addEventListener("submit", async (event) => {
    event.preventDefault();

    const nameElement = createdMovie.querySelector("#name");
    const descriptionElement = createdMovie.querySelector("#desc");
    const synopsisElement = createdMovie.querySelector("#synopsis");
    const directorElement = createdMovie.querySelector("#director");
    const dateElement = createdMovie.querySelector("#date");
    const imageCarouselElement = createdMovie.querySelector("#photoC");
    const imagePosterElement = createdMovie.querySelector("#photoP");
    const trailerElement = createdMovie.querySelector("#trailer");

    const name = nameElement.value;
    const description = descriptionElement.value;
    const synopsis = synopsisElement.value;
    const director = directorElement.value;
    const date = dateElement.value;
    const imageCarousel = imageCarouselElement.files[0];
    const imagePoster = imagePosterElement.files[0];
    const trailer = trailerElement.value;
    try {
      const movieData = {
        name,
        description,
        director,
        synopsis,
        date,
        imageCarousel,
        imagePoster,
        trailer,
      };
      creatingMovies.push(movieData);
      createdMovie.classList.add("hidden");
      MovieBuilder(moviesPreview,movieData)
    } catch (error) {
      console.error(error);
    }
  });
}


function MovieBuilder(moviesPreview,movieData){
    const newMovie = buildTemporaryMovie(movieData)
    moviesPreview.appendChild(newMovie)
}