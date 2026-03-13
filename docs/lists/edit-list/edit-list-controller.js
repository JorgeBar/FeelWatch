import { editList } from "./edit-list-model.js"
import { getListById } from "../lists-model.js"

export async function editListController(editedListForm){
    const listId = new URLSearchParams(window.location.search).get("id")
    const response = await getListById(listId)
    const list = response.list

    const nameElement = editedListForm.querySelector("#title-list")
    const descriptionElement = editedListForm.querySelector("#description-list")
    const tagsElement = editedListForm.querySelector("#list-tags")

    nameElement.value = list.name
    descriptionElement.value = list.description
    tagsElement.value = list.tags.join(', ')


    editedListForm.addEventListener("submit", async (event)=> {

        event.preventDefault();

        try {
            const name = nameElement.value;
            const description = descriptionElement.value;
            const tags = tagsElement.value;
        
            const tagsArray = tags ? tags.split(',').map(t => t.trim()) : []

            await editList(listId,name,description,tagsArray)

            window.location.href = '/docs/listas_template.html'


            
        } catch (error) {
                console.error('Error completo:', error)

            alert("Error")
        }
        
            })
}