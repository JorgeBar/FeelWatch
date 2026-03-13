export const buildTemporaryMovie = (movie) =>{

    const newMovie = document.createElement('section')

    newMovie.innerHTML = `
        <h3>${movie.name}</h3>
        <h3>${movie.description}</h3>
        <h3>${movie.director}</h3>
        <h4 class="imageCarousel">${image.photoCarousel? ' Tiene carousel' : ''}</h4>
        <h4>${image.photoPoster? ' Tiene poster' : ''}</h4>



    `
    return newMovie

}



export const buildMovie =() =>{

}