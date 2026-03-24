export const buildList = (list, checkOwner) => {
  const newList = document.createElement("div");

  newList.innerHTML = `
    <h2>${list.name}</h2>
    <h3>${list.description}</h3>
    <h3>Tags: ${list.tags.length > 0 ? list.tags.join(", ") : "Sin tags"}</h3>
    ${checkOwner ? `<button class="edit-btn" data-list-id="${list._id}">Edit</button> ` : ""}
    ${checkOwner ? `<button class="delete-btn" data-list-id="${list._id}">Delete</button> ` : ""}

  
    <ul>
        ${list.movies.map(movie => `<li>${movie.name}</li>`).join('')}
    </ul>
`;
  const elemento = newList.querySelectorAll("li");
  list.movies.forEach((movie, i) => {
    console.log("Movie:", movie);
    console.log("ImageCarousel:", movie.imageCarousel);
    if (movie.imageCarousel) {
      const addImage = buildImage(movie.imageCarousel);
      elemento[i].appendChild(addImage);
    }
    else {
    }
  });
  return newList;
};

const BASE_URL = "https://feelwatch.onrender.com";

export const buildCarousel = (list,index,checkOwner)=>{
  const fragment = document.createDocumentFragment()
  const titlelist = document.createElement("h2");
  const carousel = document.createElement("div")
  carousel.classList.add('carousel')
  carousel.style.anchorName = `--carousel-${index}`

  const style = document.createElement('style')
  style.textContent = `
    .carousel-${index}::scroll-button(right){
      position:fixed;
      position-area: right center;
      translate: -50%;
      position-anchor: --carousel-${index};
    }
    .carousel-${index}::scroll-button(left) {
      position-anchor: --carousel-${index};
      position:fixed;
      position-area:left center;
      translate:50%;
    }
    
  `
document.head.appendChild(style)
carousel.classList.add(`carousel-${index}`)


  fragment.appendChild(titlelist)
  fragment.appendChild(carousel)

  titlelist.innerHTML = `
    ${list.name}
    ${checkOwner ? `<button class="edit-btn" data-list-id="${list._id}">Edit</button> ` : ""}
    ${checkOwner ? `<button class="delete-btn" data-list-id="${list._id}">Delete</button> ` : ""}
  `
  carousel.innerHTML = `
  
  ${list.movies.map(movie=> 
    `<div class="card">
    <h3><img src="${BASE_URL}${movie.imageCarousel}"></h3>
    </div>`).join('')}
    
    `

  return fragment
}



export function buildEmptyList() {
  const noListAvailable = document.createElement("h2");
  noListAvailable.textContent = "No hay listas disponibles";

  return noListAvailable;
}


export function buildSort(sort){
  const sortElement = document.createElement('div')

  return sortElement;
}


export const buildImage = (photo) => {
  const newImage = document.createElement("img");
  newImage.src = `http://localhost:3000${photo}`;
  newImage.style.width = "200px";
  newImage.style.display = "block";
  newImage.style.margin = "2rem auto";

  return newImage;
};
