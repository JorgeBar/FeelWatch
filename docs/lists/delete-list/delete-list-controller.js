import { deleteList } from "./delete-list-model.js";


export function deleteListController (listContainer){
    listContainer.addEventListener('click', async (e)=> {
            console.log('Click detectado en:', e.target)

      if(e.target.classList.contains("delete-btn"))  {
                console.log('Es el botón de borrar')

        const listId = e.target.dataset.listId
        try {
            await deleteList(listId)   
            const nodoListId = e.target.parentElement
            nodoListId.remove()
            
        } catch (error) {
            alert("Error de borrado")
           }
            
        }
    })
}

