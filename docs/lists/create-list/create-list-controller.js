import { createMovie } from "../../movies/create-movie/create-movie-model.js";
import { createList } from "./create-list-model.js";
import { buildCreatedList } from "./create-list-view.js";

export  function createListController(createListForm ,createdList, creatingMovies){

    createListForm.addEventListener("submit", async (event)=> {

        event.preventDefault();
        const nameElement = createListForm.querySelector("#title-list")
        const descriptionElement = createListForm.querySelector("#description-list")
        const tagsElement = createListForm.querySelector("#list-tags")

        const name = nameElement.value;
        const description = descriptionElement.value;
        const tags = tagsElement.value;

        const tagsArray = tags ? tags.split(',').map(t => t.trim()) : []

        const lists = await createList(name,description,tagsArray)
        const listId = lists._id

        


        for ( const movieData of creatingMovies){
            await createMovie ( 
                listId, 
                movieData.name,
                movieData.description,
                movieData.director,
                movieData.synopsis,
                movieData.date,
                movieData.imageCarousel,
                movieData.imagePoster,
                movieData.trailer
            )
        }

        drawCreatedList(createdList,lists )
           // window.location.href = "/docs/listas_template.html";

    })


}

function drawCreatedList(createdList,lists){
    const newList = buildCreatedList(lists)
    createdList.appendChild(newList)
}