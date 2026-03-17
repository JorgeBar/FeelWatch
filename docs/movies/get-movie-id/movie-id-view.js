const BASE_URL = "https://feelwatch.onrender.com";

export const buildMovie =(movie,checkOwner) =>{
    const newMovie = document.createElement("div");

    newMovie.innerHTML = `
    <section class="Sinopsis>
    <h1>${movie.name}</<h1>
    <p>${movie.synopsis}</p>
    <section/>
    
    <section class="trailer">${movie.url}</section>

    <section class="meaning">${movie.description}</section>
    `
    return newMovie;
}